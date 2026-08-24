import {
  ReaderBase,
  type ReaderAspects,
} from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { FLUID_BOOLEAN_FULL } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/BOOLEAN_FULL";
import { FLUID_BOOLEAN_EMPTY } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/BOOLEAN_EMPTY";
import { FLUID_BOOLEAN_NONEMPTY } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/BOOLEAN_NONEMPTY";
import { FLUID_BOOLEAN_APPLICABLE } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/BOOLEAN_APPLICABLE";
import { FLUID_INTEGER_AMOUNT } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/INTEGER_AMOUNT";
import { FLUID_INTEGER_AMOUNTTOTAL } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/INTEGER_AMOUNTTOTAL";
import { FLUID_INTEGER_CAPACITY } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/INTEGER_CAPACITY";
import { FLUID_INTEGER_CAPACITYTOTAL } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/INTEGER_CAPACITYTOTAL";
import { FLUID_INTEGER_TANKS } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/INTEGER_TANKS";
import { FLUID_DOUBLE_FILLRATIO } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/DOUBLE_FILLRATIO";
import { FLUID_LIST_TANKFLUIDS } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/LIST_TANKFLUIDS";
import { FLUID_LIST_TANKCAPACITIES } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/LIST_TANKCAPACITIES";
import { FLUID_FLUIDSTACK } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/FLUIDSTACK";
import { FLUID_BLOCK } from "lib/IntegratedDynamicsClasses/readers/FluidReader/Aspects/BLOCK";

export class FluidReader extends ReaderBase {
  static typeName = "FluidReader";
  static shortName = "fluid";
  static numericID = 5;

  static aspects: ReaderAspects = {
    BOOLEAN_FULL: FLUID_BOOLEAN_FULL,
    BOOLEAN_EMPTY: FLUID_BOOLEAN_EMPTY,
    BOOLEAN_NONEMPTY: FLUID_BOOLEAN_NONEMPTY,
    BOOLEAN_APPLICABLE: FLUID_BOOLEAN_APPLICABLE,
    INTEGER_AMOUNT: FLUID_INTEGER_AMOUNT,
    INTEGER_AMOUNTTOTAL: FLUID_INTEGER_AMOUNTTOTAL,
    INTEGER_CAPACITY: FLUID_INTEGER_CAPACITY,
    INTEGER_CAPACITYTOTAL: FLUID_INTEGER_CAPACITYTOTAL,
    INTEGER_TANKS: FLUID_INTEGER_TANKS,
    DOUBLE_FILLRATIO: FLUID_DOUBLE_FILLRATIO,
    LIST_TANKFLUIDS: FLUID_LIST_TANKFLUIDS,
    LIST_TANKCAPACITIES: FLUID_LIST_TANKCAPACITIES,
    FLUIDSTACK: FLUID_FLUIDSTACK,
    BLOCK: FLUID_BLOCK,
  };
}
