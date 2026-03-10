import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Entity } from "IntegratedDynamicsClasses/Entity";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_OBJECT_ENTITY_MOUNTED extends BaseOperator<
  Entity,
  iArray<Entity>
> {
  static override internalName = "integrateddynamics:entity_mounted" as const;
  static override nicknames = [
    "EntityMounted",
    "entitys_mounted",
    "entitysMounted",
  ];
  static override symbol = "mounted";
  static override interactName = "entityMounted";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Entity",
        },
        to: { type: "List", listType: { type: "Entity" } },
      }),
      function: (entity: Entity): iArray<Entity> => {
        return new iArrayEager(entity.getMountedEntities());
      },
    });
  }
}
