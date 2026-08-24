import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_INTEGER_LIGHTLEVEL extends WorldAspectBase {
  static displayName = "lightLevel";
  static fullDisplayName = "Light Level";
  static nicknames = ["lightLevel", "light_level", "skyLight", "sky_light"];
  static settings = {};
  static icon = "integer/world/lightlevel";
  static outputType = "Integer";
  static tooltipInfo = "The light level at the target";
}
