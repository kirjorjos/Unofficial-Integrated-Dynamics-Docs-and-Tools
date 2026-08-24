import { WorldAspectBase } from "lib/IntegratedDynamicsClasses/readers/WorldReader/WorldAspectBase";

export class WORLD_STRING_NAME extends WorldAspectBase {
  static displayName = "worldName";
  static fullDisplayName = "World Name";
  static nicknames = ["worldName", "world_name", "name"];
  static settings = {};
  static icon = "string/world/worldname";
  static outputType = "String";
}
