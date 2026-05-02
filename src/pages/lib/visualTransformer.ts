import { operatorRegistry } from "lib";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import {
  BaseOperator,
  type LogicProgrammerRenderPatternKey,
} from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
/// <reference types="./types/operatorTypes.d.ts" />
/// <reference types="./types/ast.d.ts" />

type OperatorClassLike = {
  new (normalizeSignature?: boolean): BaseOperator<any, any>;
  internalName?: string;
  operatorName?: string;
  interactName?: string;
  displayName?: string;
  fullDisplayName?: string;
  tooltipInfo?: string;
  symbol?: string;
  renderPattern?: LogicProgrammerRenderPatternKey;
};

export type ValueTypeTooltipMeta = {
  label: string;
  colorCode: string;
  infoKey?: string;
};

export type OperatorSignatureLine = {
  prefix: string;
  label: string;
  color: string;
};

export const LOGIC_PROGRAMMER_DATA_TYPE_TABS = [
  "Boolean",
  "Integer",
  "Double",
  "Long",
  "String",
  "List",
  "Operator",
  "NBT",
  "Block",
  "Item",
  "Entity",
  "Fluid",
  "Ingredients",
  "Recipe",
] as const;

export const LOGIC_PROGRAMMER_TYPE_COLORS: Record<string, string> = {
  Any: "#f0f0f0",
  Boolean: "#2b2fe7",
  Integer: "#f39604",
  Double: "#ebea17",
  Long: "#d7fe17",
  String: "#fa0a0d",
  List: "#af0301",
  Operator: "#2be72f",
  NBT: "#00aaaa",
  Block: "#f3f3f3",
  Item: "#f3f3f3",
  Entity: "#f3f3f3",
  Fluid: "#f3f3f3",
  Ingredients: "#f3f3f3",
  Recipe: "#f3f3f3",
  Null: "#f0f0f0",
};

export const VALUE_TYPE_TOOLTIP_META: Record<string, ValueTypeTooltipMeta> = {
  Any: {
    label: "Any",
    colorCode: "§r",
    infoKey: "valuetype.integrateddynamics.any.info",
  },
  Number: {
    label: "Number",
    colorCode: "§6",
    infoKey: "valuetype.integrateddynamics.number.info",
  },
  Named: {
    label: "Named",
    colorCode: "§c",
    infoKey: "valuetype.integrateddynamics.named.info",
  },
  UniquelyNamed: {
    label: "Uniquely Named",
    colorCode: "§c",
    infoKey: "valuetype.integrateddynamics.uniquely_named.info",
  },
  Nullable: {
    label: "Nullable",
    colorCode: "§8",
  },
  Boolean: {
    label: "Boolean",
    colorCode: "§1",
  },
  Integer: {
    label: "Integer",
    colorCode: "§6",
  },
  Double: {
    label: "Double",
    colorCode: "§e",
  },
  Long: {
    label: "Long",
    colorCode: "§e",
  },
  String: {
    label: "String",
    colorCode: "§c",
  },
  Operator: {
    label: "Operator",
    colorCode: "§2",
    infoKey: "valuetype.integrateddynamics.operator.info",
  },
  NBT: {
    label: "NBT",
    colorCode: "§3",
  },
  List: {
    label: "List",
    colorCode: "§4",
  },
  Block: {
    label: "Block",
    colorCode: "§7",
  },
  Item: {
    label: "Item",
    colorCode: "§7",
  },
  Entity: {
    label: "Entity",
    colorCode: "§7",
  },
  Fluid: {
    label: "Fluid",
    colorCode: "§7",
  },
  Ingredients: {
    label: "Ingredients",
    colorCode: "§7",
  },
  Recipe: {
    label: "Recipe",
    colorCode: "§7",
  },
};

export function getValueTypeMeta(typeName: string): ValueTypeTooltipMeta {
  return (
    VALUE_TYPE_TOOLTIP_META[typeName] ?? {
      label: typeName,
      colorCode: "§f",
    }
  );
}

export function getValueTypeMetaForAst(
  type: TypeAST.AST["type"]
): ValueTypeTooltipMeta {
  if (type === "Null") return getValueTypeMeta("Any");
  return getValueTypeMeta(type);
}

export function getTypeColor(typeName: string): string {
  return LOGIC_PROGRAMMER_TYPE_COLORS[typeName] ?? "#f0f0f0";
}

export function getOperatorClass(
  opName: TypeOperatorKey
): OperatorClassLike | undefined {
  return operatorRegistry[
    opName as keyof typeof operatorRegistry
  ] as unknown as OperatorClassLike | undefined;
}

export function getOperatorOutputType(
  operatorClass: OperatorClassLike
): string {
  return new operatorClass(false)
    .getParsedSignature()
    .getOutput(-1)
    .getRootType();
}

export function getOperatorValueSignatureTypes(
  opName: TypeOperatorKey
): string[] {
  const operatorClass = getOperatorClass(opName);
  if (!operatorClass) return [];

  const operator = new operatorClass(false);
  const signature = new ParsedSignature(
    operator.getParsedSignature().getAst(),
    false
  );
  const flatSignature = signature.toFlatSignature();

  return flatSignature;
}

export function getOperatorValueSignatureLines(
  opName: TypeOperatorKey
): OperatorSignatureLine[] {
  const flatSignature = getOperatorValueSignatureTypes(opName);
  if (flatSignature.length === 0) return [];

  return flatSignature.map((typeName, index) => {
    const typeMeta = getValueTypeMeta(typeName);
    return {
      prefix: index === 0 ? "" : "  -> ",
      label: typeMeta.label,
      color: typeName === "Any" ? "#000000" : getTypeColor(typeName),
    };
  });
}

export function getStepActualOutputType(step: {
  sourceType: string;
  detail?: string;
  tooltipOperatorKey?: string;
}): string {
  const opKey = step.detail ?? step.tooltipOperatorKey;
  if (opKey) {
    const operatorClass = getOperatorClass(opKey as TypeOperatorKey);
    if (operatorClass) {
      return new ParsedSignature(
        new operatorClass(false).getParsedSignature().getAst(),
        false
      )
        .getOutput(-1)
        .getRootType();
    }
  }
  return step.sourceType;
}

export function getDisplayPanelColor(step: {
  sourceType: string;
  detail?: string;
  tooltipOperatorKey?: string;
  forceOperatorTabActive?: boolean;
}): string {
  if (
    step.sourceType === "Operator" ||
    step.forceOperatorTabActive ||
    step.tooltipOperatorKey
  ) {
    return getTypeColor("Operator");
  }
  const outputType = getStepActualOutputType(step);
  return getTypeColor(outputType);
}
