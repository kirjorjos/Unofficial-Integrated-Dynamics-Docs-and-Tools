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
  constructor() {
    super({
      nicknames: ["BlockByName", "block_by_name", "blockByName"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Block",
        },
      }),
      symbol: "block_by_name",
      interactName: "stringBlockByName",
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
