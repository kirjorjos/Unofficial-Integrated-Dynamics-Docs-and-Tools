import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArrayLazy } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayLazy";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { OPERATOR_GENERAL_IDENTITY } from "lib/IntegratedDynamicsClasses/operators/operators/GENERAL_IDENTITY";

export class OPERATOR_LIST_LAZYBUILT extends BaseOperator<
  IntegratedValue,
  Operator<
    Operator<IntegratedValue, IntegratedValue>,
    iArrayLazy<IntegratedValue>
  >
> {
  static override internalName = "integrateddynamics:list_lazybuilt" as const;
  static override numericID = 118;
  static override nicknames = [
    "anyLazyBuilt",
    "lazybuilt",
    "listLazybuilt",
    "any_lazy_built",
    "list_lazybuilt",
  ];
  static override symbol = "lazybuilt";
  static override interactName = "anyLazyBuilt";
  static override operatorName = "lazybuilt" as const;
  static override displayName = "Lazy List Builder" as const;
  static override fullDisplayName = "List Lazy List Builder" as const;
  static override tooltipInfo =
    "Build a list lazily using a start value and an operator that is applied to the previous element to get a next element." as const;

  static override kind = "list" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 1 },
              },
            },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        normalizeSignature
      ),
      function: (
        initial: IntegratedValue
      ): TypeLambda<
        Operator<IntegratedValue, IntegratedValue>,
        iArrayLazy<IntegratedValue>
      > => {
        return (
          builder: Operator<IntegratedValue, IntegratedValue>
        ): iArrayLazy<IntegratedValue> => {
          return new iArrayLazy(
            initial,
            builder,
            new OPERATOR_GENERAL_IDENTITY()
          );
        };
      },
    });
  }
}
