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
  static override stringDisplayNames = [
    "lazy list builder",
    "lazy list Builder",
    "lazy List builder",
    "lazy List Builder",
    "Lazy list builder",
    "Lazy list Builder",
    "Lazy List builder",
    "Lazy List Builder",
    "list lazy list builder",
    "list lazy list Builder",
    "list lazy List builder",
    "list lazy List Builder",
    "list Lazy list builder",
    "list Lazy list Builder",
    "list Lazy List builder",
    "list Lazy List Builder",
    "List lazy list builder",
    "List lazy list Builder",
    "List lazy List builder",
    "List lazy List Builder",
    "List Lazy list builder",
    "List Lazy list Builder",
    "List Lazy List builder",
    "List Lazy List Builder",
  ];
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
