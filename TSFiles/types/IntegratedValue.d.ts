import type { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import type { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import type { Operator } from "IntegratedDynamicsClasses/Operator";

export type IntegratedValue = Operator | iBoolean | iString;
