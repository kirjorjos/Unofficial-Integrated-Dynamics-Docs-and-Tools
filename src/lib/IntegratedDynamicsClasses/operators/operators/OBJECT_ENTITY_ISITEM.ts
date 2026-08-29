import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Entity } from "lib/IntegratedDynamicsClasses/Entity";

export class OPERATOR_OBJECT_ENTITY_ISITEM extends BaseOperator<
  Entity,
  iBoolean
> {
  static override internalName = "integrateddynamics:entity_isitem" as const;
  static override numericID = 26;
  static override nicknames = [
    "entityIsitem",
    "entityIsItem",
    "EntityIsitem",
    "isitem",
    "isItem",
    "entity_is_item",
    "entity_isitem",
    "is_item",
  ];
  static override symbol = "is_item";
  static override interactName = "entityIsItem";
  static override operatorName = "isitem" as const;
  static override displayName = "Is Item" as const;
  static override fullDisplayName = "Entity Is Item" as const;
  static override stringDisplayNames = [
    "is item",
    "is Item",
    "Is item",
    "Is Item",
    "is itemstack",
    "is Itemstack",
    "is itemStack",
    "is ItemStack",
    "Is itemstack",
    "Is Itemstack",
    "Is itemStack",
    "Is ItemStack",
    "entity is item",
    "entity is Item",
    "entity Is item",
    "entity Is Item",
    "Entity is item",
    "Entity is Item",
    "Entity Is item",
    "Entity Is Item",
    "entity is itemstack",
    "entity is Itemstack",
    "entity is itemStack",
    "entity is ItemStack",
    "entity Is itemstack",
    "entity Is Itemstack",
    "entity Is itemStack",
    "entity Is ItemStack",
    "Entity is itemstack",
    "Entity is Itemstack",
    "Entity is itemStack",
    "Entity is ItemStack",
    "Entity Is itemstack",
    "Entity Is Itemstack",
    "Entity Is itemStack",
    "Entity Is ItemStack",
  ];
  static override tooltipInfo = "If the entity is an item" as const;

  static override kind = "entity" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Entity",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (entity: Entity): iBoolean => {
        return entity.isItem();
      },
    });
  }
}
