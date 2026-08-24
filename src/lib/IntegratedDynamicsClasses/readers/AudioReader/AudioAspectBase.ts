import { AspectBase } from "lib/IntegratedDynamicsClasses/readers/AspectBase";

export abstract class AudioAspectBase extends AspectBase {
  static settings = { range: 64 };
  static outputType = "Integer";
}
