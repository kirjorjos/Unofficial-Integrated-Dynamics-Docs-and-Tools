import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";

export class OPERATOR_OBJECT_BLOCK_BY_NAME extends BaseOperator<
  iString,
  Block
> {
  static override internalName =
    "integrateddynamics:block_blockbyname" as const;
  static override numericID = 142;
  static override nicknames = [
    "stringBlockByName",
    "BlockByName",
    "block_by_name",
    "blockByName",
    "blockbyname",
    "blockBlockbyname",
  ];
  static override symbol = "block_by_name";
  static override interactName = "stringBlockByName";
  static override operatorName = "blockbyname" as const;
  static override displayName = "Block By Name" as const;
  static override fullDisplayName = "Block Block By Name" as const;
  static override kind = "block" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Block",
          },
        },
        normalizeSignature
      ),
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
