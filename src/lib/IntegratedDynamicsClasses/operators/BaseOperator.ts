import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import {
  Operator,
  OperatorSerializationRegistry,
} from "lib/IntegratedDynamicsClasses/operators/Operator";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import {
  capitalize,
  humanizeIdentifier,
  lowerCaseFirst,
} from "lib/HelperClasses/UtilityFunctions";

export type LogicProgrammerRenderPatternKey =
  | "NONE"
  | "NONE_CANVAS_WIDE"
  | "NONE_CANVAS"
  | "GENERAL_CHOICE"
  | "SINGLE_SLOT"
  | "RECIPE"
  | "INFIX"
  | "INFIX_LONG"
  | "INFIX_VERYLONG"
  | "PREFIX_1"
  | "PREFIX_1_LONG"
  | "INFIX_2"
  | "INFIX_2_LONG"
  | "INFIX_2_VERYLONG"
  | "INFIX_2_LATE"
  | "PREFIX_2"
  | "PREFIX_2_LONG"
  | "INFIX_3"
  | "PREFIX_3"
  | "PREFIX_3_LONG"
  | "SUFFIX_1"
  | "SUFFIX_1_LONG";
export class BaseOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  static nicknames: string[] = [];
  static symbol: string = "";
  static operatorName: string = "";
  static interactName: string = "";
  static displayName: string = "";
  static fullDisplayName: string = "";
  static tooltipInfo?: string;
  static kind: string = "";
  static numericID: number = -1;
  static renderPattern: LogicProgrammerRenderPatternKey = "NONE";
  serializer?: string;
  static readonly nicknameRegexAllowedChars = "A-Za-z0-9._&|{}";

  constructor({
    parsedSignature,
    function: fn,
    serializer,
  }: {
    parsedSignature: ParsedSignature;
    function: TypeLambda<any, any>;
    serializer?: string;
  }) {
    const staticThis = new.target as typeof BaseOperator;
    super({
      parsedSignature,
      function: fn,
      interactName: staticThis.interactName,
    });
    this.serializer = serializer;
  }

  get nicknames(): string[] {
    return (this.constructor as typeof BaseOperator).nicknames;
  }

  get symbol(): string {
    return (this.constructor as typeof BaseOperator).symbol;
  }

  get operatorName(): string {
    return (this.constructor as typeof BaseOperator).operatorName;
  }

  get displayName(): string {
    return (this.constructor as typeof BaseOperator).displayName;
  }

  get fullDisplayName(): string {
    return (this.constructor as typeof BaseOperator).fullDisplayName;
  }

  get tooltipInfo(): string | undefined {
    return (this.constructor as typeof BaseOperator).tooltipInfo;
  }

  get kind(): string {
    return (this.constructor as typeof BaseOperator).kind;
  }

  getCategoryTranslationKey(): string {
    return `operator.integrateddynamics.${this.kind}`;
  }

  getCategoryBasenameTranslationKey(): string {
    return `${this.getCategoryTranslationKey()}.basename`;
  }

  getOperatorTranslationKey(): string {
    return `${this.getCategoryTranslationKey()}.${this.operatorName}`;
  }

  getCategoryName(): string {
    return humanizeIdentifier(this.kind);
  }

  getDisplayOperatorName(): string {
    return this.displayName || humanizeIdentifier(this.operatorName);
  }

  getFullDisplayName(): string {
    return (
      this.fullDisplayName ||
      `${this.getCategoryName()} ${this.getDisplayOperatorName()}`.trim()
    );
  }

  getTooltipName(): string {
    return `${this.getDisplayOperatorName()} (${this.symbol})`;
  }

  getGlobalName(): string {
    const parsedSignature = this.getParsedSignature();
    const inputType =
      parsedSignature.getArity() > 0
        ? lowerCaseFirst(parsedSignature.getInput().getRootType())
        : "operator";
    return `${inputType}${capitalize(this.interactName)}`;
  }

  serializeNBT(): CompoundTag {
    return new CompoundTag({
      operatorName: new StringTag(this.getUniqueName()),
    });
  }

  static deserializeNBT(
    tag: Tag<IntegratedValue>
  ): BaseOperator<IntegratedValue, IntegratedValue> {
    if (!(tag instanceof CompoundTag)) {
      throw new Error("Could not deserialize operator: not a CompoundTag");
    }
    const compound = tag as CompoundTag;
    const nameNode = compound.get(new iString("operatorName"));
    if (!(nameNode instanceof StringTag))
      throw new Error("operatorName missing or not a string");
    const name = nameNode.valueOf().valueOf();
    const op = RegistryHub.operatorRegistry.find(name);
    if (!op) throw new Error(`Operator ${name} not found`);
    return op;
  }

  public static load() {
    OperatorSerializationRegistry.serialize = (op) => {
      if ("serializeNBT" in op && typeof op.serializeNBT === "function") {
        return op.serializeNBT();
      }
      throw new Error(
        `Operator ${op.constructor.name} does not implement serializeNBT`
      );
    };

    OperatorSerializationRegistry.deserialize = (tag) => {
      if (!(tag instanceof CompoundTag)) {
        throw new Error("Could not deserialize operator: not a CompoundTag");
      }
      const compound = tag as CompoundTag;

      if (compound.get(new iString("operatorName")) instanceof StringTag) {
        return BaseOperator.deserializeNBT(tag);
      }

      if (compound.get(new iString("curry")) instanceof CompoundTag) {
        const deserializer =
          OperatorSerializationRegistry.DESERIALIZERS["curry"];
        if (deserializer) return deserializer(tag);
      }

      if (compound.get(new iString("pipe")) instanceof CompoundTag) {
        const deserializer =
          OperatorSerializationRegistry.DESERIALIZERS["pipe"];
        if (deserializer) return deserializer(tag);
      }

      if (compound.get(new iString("pipe2")) instanceof CompoundTag) {
        const deserializer =
          OperatorSerializationRegistry.DESERIALIZERS["pipe2"];
        if (deserializer) return deserializer(tag);
      }

      if (compound.get(new iString("flip")) instanceof CompoundTag) {
        const deserializer =
          OperatorSerializationRegistry.DESERIALIZERS["flip"];
        if (deserializer) return deserializer(tag);
      }

      throw new Error("Could not determine operator type from NBT");
    };
  }
}

BaseOperator.load();
