import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "./Operator";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { RegistryHub } from "IntegratedDynamicsClasses/registries/registryHub";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class BaseOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  nicknames: string[];
  symbol: string;
  serializer?: string;

  constructor({
    nicknames,
    parsedSignature,
    symbol,
    interactName,
    function: fn,
    serializer,
  }: {
    nicknames: string[];
    symbol: string;
    interactName: string;
    parsedSignature: ParsedSignature;
    function: TypeLambda<any, any>;
    serializer?: string;
  }) {
    super({ parsedSignature, function: fn, interactName });
    this.nicknames = nicknames;
    this.symbol = symbol;
    this.serializer = serializer;
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
}
