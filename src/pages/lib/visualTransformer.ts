import { operatorRegistry } from "lib";
import {
  evaluateFullyAppliedCurry,
  flattenAnonymousBaseOperatorApplication,
} from "lib/transformers/helpers";
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
  altColorCode?: string;
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

export type ValueTypeColor = {
  primary: string;
  alt?: string;
};

export const LOGIC_PROGRAMMER_TYPE_COLORS: Record<string, ValueTypeColor> = {
  Any: { primary: "#000000", alt: "#ffffff" },
  Number: { primary: "#ffaa00" },
  Named: { primary: "#ff5555" },
  UniquelyNamed: { primary: "#ff5555" },
  Nullable: { primary: "#ff55ff" }, // Bright to signify error
  Boolean: { primary: "#2b2fe7" },
  Integer: { primary: "#f39604" },
  Double: { primary: "#ebea17" },
  Long: { primary: "#d7fe17" },
  String: { primary: "#fa0a0d" },
  List: { primary: "#af0301" },
  Operator: { primary: "#2be72f" },
  NBT: { primary: "#00aaaa" },
  Block: { primary: "#f3f3f3" },
  Item: { primary: "#f3f3f3" },
  Entity: { primary: "#f3f3f3" },
  Fluid: { primary: "#f3f3f3" },
  Ingredients: { primary: "#f3f3f3" },
  Recipe: { primary: "#f3f3f3" },
  Null: { primary: "#f0f0f0" },
};

export const VALUE_TYPE_TOOLTIP_META: Record<string, ValueTypeTooltipMeta> = {
  Any: {
    label: "Any",
    colorCode: "§0",
    altColorCode: "§f",
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
  return LOGIC_PROGRAMMER_TYPE_COLORS[typeName]?.primary ?? "#f0f0f0";
}

export function getTypeAltColor(typeName: string): string {
  return LOGIC_PROGRAMMER_TYPE_COLORS[typeName]?.alt ?? getTypeColor(typeName);
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
      color: getTypeColor(typeName),
    };
  });
}

export function getStepActualOutputType(step: {
  sourceType: string;
  detail?: string;
  tooltipOperatorKey?: string;
  node?: TypeAST.AST;
}): string {
  if (step.sourceType === "Curry" && step.node) {
    const evaluated = evaluateFullyAppliedCurry(step.node);
    if (evaluated != null && typeof evaluated.getSignatureNode === "function") {
      const rootType = evaluated.getSignatureNode().getRootType();
      if (rootType !== "Any") return rootType;
    }
    const flattened = flattenAnonymousBaseOperatorApplication(step.node);
    if (flattened?.fullyApplied && flattened.operator.type === "Operator") {
      const operatorClass = getOperatorClass(flattened.operator.opName);
      if (operatorClass) {
        const outputType = getOperatorOutputType(operatorClass);
        if (outputType !== "Any") return outputType;
      }
    }
  }
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
  node?: TypeAST.AST;
}): string {
  if (step.sourceType === "Operator" || step.forceOperatorTabActive) {
    return getTypeColor("Operator");
  }
  if (step.sourceType === "Curry" && step.node) {
    const flattened = flattenAnonymousBaseOperatorApplication(step.node);
    if (flattened?.fullyApplied) {
      const outputType = getStepActualOutputType(step);
      if (outputType !== "Operator" && outputType !== "Any") {
        return getTypeColor(outputType);
      }
    }
    return getTypeColor("Operator");
  }
  if (step.tooltipOperatorKey) {
    return getTypeColor("Operator");
  }
  const outputType = getStepActualOutputType(step);
  return getTypeColor(outputType);
}
