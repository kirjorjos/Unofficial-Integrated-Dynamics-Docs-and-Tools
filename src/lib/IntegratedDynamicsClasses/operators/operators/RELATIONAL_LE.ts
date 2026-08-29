import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_RELATIONAL_LE extends BaseOperator<
  TypeNumber,
  Operator<TypeNumber, iBoolean>
> {
  static override internalName = "integrateddynamics:relational_le" as const;
  static override numericID = 75;
  static override nicknames = [
    "anyLessThanOrEquals",
    "le",
    "relationalLe",
    "lessThanOrEquals",
    "any_less_than_or_equals",
    "relational_le",
    "less_than_or_equals",
    "<=",
  ];
  static override symbol = "<=";
  static override interactName = "anyLessThanOrEquals";
  static override operatorName = "le" as const;
  static override displayName = "Less Than or Equal" as const;
  static override fullDisplayName = "Relational Less Than or Equal" as const;
  static override stringDisplayNames = [
    "less than or equal",
    "less than or Equal",
    "less than Or equal",
    "less than Or Equal",
    "less Than or equal",
    "less Than or Equal",
    "less Than Or equal",
    "less Than Or Equal",
    "Less than or equal",
    "Less than or Equal",
    "Less than Or equal",
    "Less than Or Equal",
    "Less Than or equal",
    "Less Than or Equal",
    "Less Than Or equal",
    "Less Than Or Equal",
    "relational less than or equal",
    "relational less than or Equal",
    "relational less than Or equal",
    "relational less than Or Equal",
    "relational less Than or equal",
    "relational less Than or Equal",
    "relational less Than Or equal",
    "relational less Than Or Equal",
    "relational Less than or equal",
    "relational Less than or Equal",
    "relational Less than Or equal",
    "relational Less than Or Equal",
    "relational Less Than or equal",
    "relational Less Than or Equal",
    "relational Less Than Or equal",
    "relational Less Than Or Equal",
    "Relational less than or equal",
    "Relational less than or Equal",
    "Relational less than Or equal",
    "Relational less than Or Equal",
    "Relational less Than or equal",
    "Relational less Than or Equal",
    "Relational less Than Or equal",
    "Relational less Than Or Equal",
    "Relational Less than or equal",
    "Relational Less than or Equal",
    "Relational Less than Or equal",
    "Relational Less than Or Equal",
    "Relational Less Than or equal",
    "Relational Less Than or Equal",
    "Relational Less Than Or equal",
    "Relational Less Than Or Equal",
  ];
  static override kind = "relational" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Number",
          },
          to: {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (num1: TypeNumber): TypeLambda<TypeNumber, iBoolean> => {
        return (num2: TypeNumber): iBoolean => {
          return new iBoolean(num1.lte(num2));
        };
      },
      flipTarget: "RELATIONAL_GE",
    });
  }
}
