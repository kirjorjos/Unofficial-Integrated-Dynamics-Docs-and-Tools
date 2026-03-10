import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "IntegratedDynamicsClasses/Block";
import { RegistryHub } from "IntegratedDynamicsClasses/registries/registryHub";
import { Properties } from "IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_BLOCK_BY_NAME extends BaseOperator<
  iString,
  Block
> {
  static override internalName =
    "integrateddynamics:block_blockbyname" as const;
  static override nicknames = [
    "stringBlockByName",
    "BlockByName",
    "block_by_name",
    "blockByName",
  ];
  static override symbol = "block_by_name";
  static override interactName = "stringBlockByName";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Block",
        },
      }),
      function: (name: iString): Block => {
        const blockRegistry = RegistryHub.blockRegistry;
        const key = name.valueOf().toLowerCase();
        const BlockConstructor =
          blockRegistry.items[key as keyof typeof blockRegistry.items];
        if (!BlockConstructor) return new Block(new Properties({}));
        return new BlockConstructor();
      },
    });
  }
}
