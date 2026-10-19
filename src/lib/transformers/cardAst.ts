import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { NumericTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { OperatorSerializationRegistry } from "lib/IntegratedDynamicsClasses/operators/Operator";
import {
  getAspectId,
  getReaderClassForPartType,
  readAspectSettings,
} from "lib/transformers/aspectNames";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { ValueHelpers } from "lib/IntegratedDynamicsClasses/ValueHelpers";
import { ValueTypeListProxyFactories } from "lib/IntegratedDynamicsClasses/ValueTypeListProxy";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { OperatortoAST } from "lib/transformers/Operator";
import "lib/IntegratedDynamicsClasses/registries/blockRegistry";
import "lib/IntegratedDynamicsClasses/registries/entityRegistry";
import "lib/IntegratedDynamicsClasses/registries/fluidRegistry";
import "lib/IntegratedDynamicsClasses/registries/itemRegistry";

export interface DecodeResult<T> {
  value?: T;
  warnings: string[];
}

export const CARD_TYPE_VALUETYPE = "integrateddynamics:valuetype";
export const CARD_TYPE_OPERATOR = "integrateddynamics:operator";
export const CARD_TYPE_ASPECT = "integrateddynamics:aspect";
export const CARD_TYPE_PROXY = "integrateddynamics:proxy";
export const CARD_TYPE_DELAY = "integrateddynamics:delay";

export const CARD_TYPES: readonly string[] = [
  CARD_TYPE_VALUETYPE,
  CARD_TYPE_OPERATOR,
  CARD_TYPE_ASPECT,
  CARD_TYPE_PROXY,
  CARD_TYPE_DELAY,
];

const VALUE_TYPE_OPERATOR = "integrateddynamics:operator";
const VALUE_TYPE_LIST = "integrateddynamics:list";
const VALUE_TYPE_BLOCK = "integrateddynamics:block";
const VALUE_TYPE_ENTITY = "integrateddynamics:entity";

const SERIALIZER_CURRY = "integrateddynamics:curry";
const SERIALIZER_PIPE = "integrateddynamics:combined.pipe";
const SERIALIZER_PIPE2 = "integrateddynamics:combined.pipe2";
const SERIALIZER_FLIP = "integrateddynamics:combined.flip";

const IDENTITY_OPERATOR = "integrateddynamics:general_identity";
const INFINITE_PROXY = "integrateddynamics:lazybuilt";

export const getStringField = (
  tag: CompoundTag,
  key: string
): string | undefined => {
  const value = tag.get(new iString(key));
  return value instanceof StringTag ? value.valueOf().valueOf() : undefined;
};

const stringField = getStringField;

const intField = (
  tag: Tag<IntegratedValue>,
  key: string
): number | undefined => {
  if (!(tag instanceof CompoundTag)) return undefined;
  const value = tag.get(new iString(key));
  return value instanceof NumericTag ? value.getAsDouble() : undefined;
};

export const getCardType = (tag: Tag<IntegratedValue>): string | undefined => {
  if (!(tag instanceof CompoundTag)) return undefined;
  const type = tag.get(new iString("_type"));
  return type instanceof StringTag ? type.valueOf().valueOf() : undefined;
};

export const getCardId = (tag: Tag<IntegratedValue>): string | undefined => {
  const id = intField(tag, "_id");
  return id === undefined ? undefined : String(id);
};

export const getCardPartId = (tag: CompoundTag): string | undefined => {
  const partId = intField(tag, "partId");
  return partId === undefined ? undefined : String(partId);
};

export const isVariableCard = (tag: Tag<IntegratedValue>): tag is CompoundTag =>
  getCardId(tag) !== undefined && CARD_TYPES.includes(getCardType(tag) ?? "");

export const getVariableIds = (tag: CompoundTag): string[] => {
  const ids = tag.get(new iString("variableIds"));
  if (!(ids instanceof IntArrayTag)) return [];
  return ids
    .valueOf()
    .valueOf()
    .map((id) => String(id.toJSNumber()));
};

export const hasApplication = (tag: CompoundTag): boolean =>
  tag.has(new iString("operatorName")) && tag.has(new iString("variableIds"));

export const hasCachedValue = (tag: CompoundTag): boolean =>
  stringField(tag, "typeName") !== undefined && tag.has(new iString("value"));

export const normaliseJavaTag = (
  tag: Tag<IntegratedValue>,
  typeName: string | undefined,
  warnings: string[] = []
): Tag<IntegratedValue> => {
  if (tag instanceof StringTag && typeName === VALUE_TYPE_OPERATOR) {
    return new CompoundTag({ operatorName: tag });
  }

  if (tag instanceof ListTag) {
    return new ListTag(
      new iArrayEager(
        tag
          .valueOf()
          .valueOf()
          .map((entry) => normaliseJavaTag(entry, undefined, warnings))
      )
    );
  }

  if (!(tag instanceof CompoundTag)) return tag;

  const serializer = stringField(tag, "serializer");
  if (serializer !== undefined) {
    return normaliseSerializedOperator(
      serializer,
      tag.get(new iString("value")),
      warnings
    );
  }

  if (tag.has(new iString("proxyName")) && tag.has(new iString("serialized"))) {
    return new CompoundTag({
      proxyName: tag.get(new iString("proxyName")),
      serialized: normaliseJavaTag(
        tag.get(new iString("serialized")),
        undefined,
        warnings
      ),
    });
  }

  const pairType = stringField(tag, "valueType");
  let data: Record<string, Tag<IntegratedValue>> | undefined;
  const override = (key: string, value: Tag<IntegratedValue>) => {
    data = { ...(data ?? tag.data), [key]: value };
  };

  if (pairType !== undefined && tag.has(new iString("value"))) {
    override(
      "value",
      normaliseJavaTag(tag.get(new iString("value")), pairType, warnings)
    );
  }

  const values =
    pairType === undefined ? undefined : tag.get(new iString("values"));
  if (pairType !== undefined && values instanceof ListTag) {
    override(
      "values",
      new ListTag(
        new iArrayEager(
          values
            .valueOf()
            .valueOf()
            .map((entry) => normaliseJavaTag(entry, pairType, warnings))
        )
      )
    );
  }

  if (tag.has(new iString("operator"))) {
    override(
      "operator",
      normaliseJavaTag(
        tag.get(new iString("operator")),
        VALUE_TYPE_OPERATOR,
        warnings
      )
    );
  }

  if (tag.has(new iString("sublist"))) {
    override(
      "sublist",
      normaliseJavaTag(tag.get(new iString("sublist")), undefined, warnings)
    );
  }

  return data === undefined ? tag : new CompoundTag(data);
};

const normaliseSerializedOperator = (
  serializer: string,
  value: Tag<IntegratedValue>,
  warnings: string[]
): Tag<IntegratedValue> => {
  if (!(value instanceof CompoundTag)) {
    warnings.push(`Operator serializer "${serializer}" has no payload`);
    return new CompoundTag({});
  }

  switch (serializer) {
    case SERIALIZER_CURRY: {
      const values = value.get(new iString("values"));
      return new CompoundTag({
        curry: new CompoundTag({
          values:
            values instanceof ListTag
              ? normaliseJavaTag(values, undefined, warnings)
              : new ListTag(new iArrayEager([])),
          baseOperator: normaliseJavaTag(
            value.get(new iString("baseOperator")),
            VALUE_TYPE_OPERATOR,
            warnings
          ),
        }),
      });
    }
    case SERIALIZER_PIPE:
    case SERIALIZER_PIPE2:
    case SERIALIZER_FLIP: {
      const operators = value.get(new iString("operators"));
      if (!(operators instanceof ListTag)) {
        warnings.push(`Operator serializer "${serializer}" has no operators`);
        return new CompoundTag({});
      }
      const inner = operators
        .valueOf()
        .valueOf()
        .map((wrapper) =>
          normaliseJavaTag(
            wrapper instanceof CompoundTag
              ? wrapper.get(new iString("v"))
              : wrapper,
            VALUE_TYPE_OPERATOR,
            warnings
          )
        );
      if (serializer === SERIALIZER_FLIP) {
        return new CompoundTag({
          flip: new CompoundTag({ op: inner[0] ?? new CompoundTag({}) }),
        });
      }
      const wrapperKey = serializer === SERIALIZER_PIPE ? "pipe" : "pipe2";
      return new CompoundTag({
        [wrapperKey]: new CompoundTag({
          op1: inner[0] ?? new CompoundTag({}),
          op2: inner[1] ?? new CompoundTag({}),
          ...(serializer === SERIALIZER_PIPE2
            ? { op3: inner[2] ?? new CompoundTag({}) }
            : {}),
        }),
      });
    }
    default:
      warnings.push(
        `Unsupported operator serializer "${serializer}", the operator is left out`
      );
      return new CompoundTag({});
  }
};

export const decodeOperatorTag = (
  tag: Tag<IntegratedValue>
): DecodeResult<TypeAST.Operator> => {
  const warnings: string[] = [];
  const normalised = normaliseJavaTag(tag, VALUE_TYPE_OPERATOR, warnings);
  try {
    const ast = OperatortoAST(
      OperatorSerializationRegistry.deserialize(normalised)
    );
    switch (ast.type) {
      case "Operator":
      case "Curry":
      case "Flip":
      case "Pipe":
      case "Pipe2":
        return { value: ast, warnings };
      default:
        return {
          warnings: [...warnings, "Operator tag did not decode to an operator"],
        };
    }
  } catch (e) {
    return {
      warnings: [
        ...warnings,
        `Could not decode operator: ${
          e instanceof Error ? e.message : String(e)
        }`,
      ],
    };
  }
};

export const decodeValueTag = (
  typeName: string,
  tag: Tag<IntegratedValue>
): DecodeResult<TypeAST.AST> => {
  const warnings: string[] = [];
  const normalised = normaliseJavaTag(tag, typeName, warnings);

  if (typeName === VALUE_TYPE_LIST && normalised instanceof CompoundTag) {
    if (stringField(normalised, "proxyName") !== undefined) {
      return decodeListProxy(normalised, warnings);
    }
  }

  if (typeName === VALUE_TYPE_BLOCK || typeName === VALUE_TYPE_ENTITY) {
    if (!(normalised instanceof CompoundTag)) {
      return { warnings: [...warnings, `${typeName} value is not a compound`] };
    }
    return {
      value:
        typeName === VALUE_TYPE_BLOCK
          ? { type: "Block", value: normalised.toJSON() }
          : { type: "Entity", value: normalised.toJSON() },
      warnings,
    };
  }

  try {
    return {
      value: OperatortoAST(ValueHelpers.deserializeRaw(typeName, normalised)),
      warnings,
    };
  } catch (e) {
    return {
      warnings: [
        ...warnings,
        `Could not decode a ${typeName} value: ${
          e instanceof Error ? e.message : String(e)
        }`,
      ],
    };
  }
};

const decodeListProxy = (
  tag: CompoundTag,
  warnings: string[]
): DecodeResult<TypeAST.AST> => {
  if (ValueTypeListProxyFactories.REGISTRY.size === 0) {
    ValueTypeListProxyFactories.load();
  }
  const proxyName = stringField(tag, "proxyName");
  if (proxyName === INFINITE_PROXY) {
    return {
      warnings: [
        ...warnings,
        "Infinite (lazy) list values cannot be rendered, the list is left out",
      ],
    };
  }

  try {
    const proxy = ValueTypeListProxyFactories.deserialize(tag);
    if (proxy.isInfinite()) {
      return {
        warnings: [
          ...warnings,
          "Infinite (lazy) list values cannot be rendered, the list is left out",
        ],
      };
    }
    return {
      value: { type: "List", value: proxy.valueOf().map(OperatortoAST) },
      warnings,
    };
  } catch (e) {
    return {
      warnings: [
        ...warnings,
        `Could not decode a list proxy: ${
          e instanceof Error ? e.message : String(e)
        }`,
      ],
    };
  }
};

export interface CardPartLookup {
  partType?: string;
  tag?: CompoundTag;
}

export interface CardDecodeOptions {
  getPart?: (partId: string) => CardPartLookup | undefined;
}

const decodeAspectCard = (
  tag: CompoundTag,
  options: CardDecodeOptions,
  warnings: string[]
): DecodeResult<TypeAST.AST> => {
  const label = `Card _id:${getCardId(tag) ?? "?"}`;
  const aspectName = stringField(tag, "aspectName");
  const partId = getCardPartId(tag);

  if (aspectName === undefined || partId === undefined) {
    warnings.push(`${label}: the aspect card has no aspect or part`);
    return { warnings };
  }

  const aspect = getAspectId(aspectName);
  if (!aspect) {
    warnings.push(`${label}: "${aspectName}" is not an aspect this tool knows`);
    return { warnings };
  }

  const part = options.getPart?.(partId);
  if (!part) {
    warnings.push(
      `${label}: reads aspect "${aspectName}" from part ${partId}, which is not in the paste`
    );
    return { warnings };
  }

  const readerClass = getReaderClassForPartType(part.partType ?? "");
  if (!readerClass) {
    warnings.push(
      `${label}: part ${partId} is a ${
        part.partType ?? "part of unknown type"
      }, which does not read aspects`
    );
    return { warnings };
  }

  if (readerClass.typeName !== aspect.readerClass.typeName) {
    warnings.push(
      `${label}: reads "${aspectName}", which is a ${aspect.readerClass.typeName} aspect, ` +
        `but part ${partId} is a ${readerClass.typeName}`
    );
    return { warnings };
  }

  const settings =
    part.tag === undefined
      ? undefined
      : readAspectSettings(part.tag, aspectName);

  return {
    value: {
      type: "Reader",
      value: {
        reader: aspect.readerClass.typeName,
        aspect: aspect.aspectKey,
        partId,
        ...(settings === undefined ? {} : { settings }),
      },
    },
    warnings,
  };
};

export const cardToAST = (
  tag: CompoundTag,
  options: CardDecodeOptions = {}
): DecodeResult<TypeAST.AST> => {
  const warnings: string[] = [];
  const type = getCardType(tag);
  const id = getCardId(tag);
  const label = id === undefined ? "A card" : `Card _id:${id}`;

  if (type === CARD_TYPE_ASPECT) {
    return decodeAspectCard(tag, options, warnings);
  }

  if (type === CARD_TYPE_PROXY || type === CARD_TYPE_DELAY) {
    warnings.push(
      `${label}: ${
        type === CARD_TYPE_PROXY ? "proxy" : "delay"
      } parts are approximated with the identity operator`
    );
    const identity = operatorRegistry.find(IDENTITY_OPERATOR);
    if (!identity) return { warnings };
    return { value: OperatortoAST(identity), warnings };
  }

  if (type === CARD_TYPE_OPERATOR) {
    if (!hasApplication(tag)) {
      warnings.push(
        `${label}: an operator card needs both operatorName and variableIds`
      );
      return { warnings };
    }
    const decoded = decodeOperatorTag(tag.get(new iString("operatorName")));
    warnings.push(...decoded.warnings.map((warning) => `${label}: ${warning}`));
    if (!decoded.value) {
      warnings.push(`${label}: the operator application could not be decoded`);
      return { warnings };
    }
    const args: TypeAST.AST[] = getVariableIds(tag).map((variableId) => ({
      type: "Variable",
      name: `@${variableId}`,
    }));
    return { value: { type: "Curry", base: decoded.value, args }, warnings };
  }

  if (type === CARD_TYPE_VALUETYPE) {
    if (!hasCachedValue(tag)) {
      warnings.push(`${label}: a valuetype card needs both typeName and value`);
      return { warnings };
    }
    const decoded = decodeValueTag(
      stringField(tag, "typeName")!,
      tag.get(new iString("value"))
    );
    return {
      value: decoded.value,
      warnings: [...warnings, ...decoded.warnings.map((w) => `${label}: ${w}`)],
    };
  }

  warnings.push(
    `${label}: has no facade this tool knows${
      type === undefined ? "" : ` (${type})`
    }`
  );
  return { warnings };
};
