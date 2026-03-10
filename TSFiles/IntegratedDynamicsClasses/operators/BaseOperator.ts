import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator, OperatorSerializationRegistry } from "./Operator";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { RegistryHub } from "IntegratedDynamicsClasses/registries/registryHub";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class BaseOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  static nicknames: string[] = [];
  static symbol: string = "";
  static interactName: string = "";
  serializer?: string;
  static readonly nicknameRegex = /^[A-Za-z0-9\\._]+$/;

  constructor({
    parsedSignature,
    function: fn,
    serializer,
  }: {
    parsedSignature: ParsedSignature;
    function: TypeLambda<any, any>;
    serializer?: string;
  }) {
    const staticThis = new.target as typeof BaseOperator;
    super({
      parsedSignature,
      function: fn,
      interactName: staticThis.interactName,
    });
    this.serializer = serializer;
  }

  get nicknames(): string[] {
    return (this.constructor as typeof BaseOperator).nicknames;
  }

  get symbol(): string {
    return (this.constructor as typeof BaseOperator).symbol;
  }

  serializeNBT(): CompoundTag {
    return new CompoundTag({
      operatorName: new StringTag(this.getUniqueName()),
    });
  }

  static deserializeNBT(
    tag: Tag<IntegratedValue>
  ): BaseOperator<IntegratedValue, IntegratedValue> {
    if (!(tag instanceof CompoundTag)) {
      throw new Error("Could not deserialize operator: not a CompoundTag");
    }
    const compound = tag as CompoundTag;
    const nameNode = compound.get(new iString("operatorName"));
    if (!(nameNode instanceof StringTag))
      throw new Error("operatorName missing or not a string");
    const name = nameNode.valueOf().valueOf();
    const op = RegistryHub.operatorRegistry.find(name);
    if (!op) throw new Error(`Operator ${name} not found`);
    return op;
  }

  public static load() {
    OperatorSerializationRegistry.serialize = (op) => {
      if ("serializeNBT" in op && typeof op.serializeNBT === "function") {
        return op.serializeNBT();
      }
      throw new Error(
        `Operator ${op.constructor.name} does not implement serializeNBT`
      );
    };

    OperatorSerializationRegistry.deserialize = (tag) => {
      if (!(tag instanceof CompoundTag)) {
        throw new Error("Could not deserialize operator: not a CompoundTag");
      }
      const compound = tag as CompoundTag;

      if (compound.get(new iString("operatorName")) instanceof StringTag) {
        return BaseOperator.deserializeNBT(tag);
      }

      if (compound.get(new iString("curry")) instanceof CompoundTag) {
        const deserializer =
          OperatorSerializationRegistry.DESERIALIZERS["curry"];
        if (deserializer) return deserializer(tag);
      }

      if (compound.get(new iString("pipe")) instanceof CompoundTag) {
        const deserializer =
          OperatorSerializationRegistry.DESERIALIZERS["pipe"];
        if (deserializer) return deserializer(tag);
      }

      if (compound.get(new iString("pipe2")) instanceof CompoundTag) {
        const deserializer =
          OperatorSerializationRegistry.DESERIALIZERS["pipe2"];
        if (deserializer) return deserializer(tag);
      }

      if (compound.get(new iString("flip")) instanceof CompoundTag) {
        const deserializer =
          OperatorSerializationRegistry.DESERIALIZERS["flip"];
        if (deserializer) return deserializer(tag);
      }

      throw new Error("Could not determine operator type from NBT");
    };
  }
}

BaseOperator.load();
