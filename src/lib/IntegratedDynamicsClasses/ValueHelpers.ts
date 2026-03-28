import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Double } from "lib/JavaNumberClasses/Double";
import { Long } from "lib/JavaNumberClasses/Long";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { ByteTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { DoubleTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag";
import { LongTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag";
import { StringTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Recipe } from "lib/IntegratedDynamicsClasses/Recipe";
import {
  Operator,
  OperatorSerializationRegistry,
} from "lib/IntegratedDynamicsClasses/operators/Operator";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";

export class ValueHelpers {
  public static serializeRaw(value: IntegratedValue): Tag<any> {
    if (value instanceof iBoolean)
      return new ByteTag(new Integer(value.valueOf() ? 1 : 0));
    if (value instanceof Integer) return new IntTag(value);
    if (value instanceof Double) return new DoubleTag(value);
    if (value instanceof Long) return new LongTag(value);
    if (value instanceof iString) return new StringTag(value);
    if (value instanceof Item) return value.serializeNBT();
    if (value instanceof Fluid) return value.serializeNBT();
    if (value instanceof Ingredients) return value.serializeNBT();
    if (value instanceof Recipe) return value.serializeNBT();
    if (value instanceof Operator)
      return OperatorSerializationRegistry.serialize(value);
    if (value instanceof Tag) return value;
    if (value instanceof iArrayEager) {
      return new ListTag(
        new iArrayEager(
          (value as iArrayEager<IntegratedValue>).valueOf().map((v) => {
            const tag = new CompoundTag({
              valueType: new StringTag(new iString(this.getTypeName(v))),
              value: this.serializeRaw(v),
            });
            return tag;
          })
        )
      );
    }
    throw new Error(`Cannot serialize value of type ${value.constructor.name}`);
  }

  public static deserializeRaw(
    typeName: string,
    tag: Tag<any>
  ): IntegratedValue {
    switch (typeName) {
      case "integrateddynamics:boolean":
        return new iBoolean((tag as ByteTag).valueOf().toJSNumber() === 1);
      case "integrateddynamics:integer":
        return (tag as IntTag).valueOf();
      case "integrateddynamics:double":
        return (tag as DoubleTag).valueOf();
      case "integrateddynamics:long":
        return (tag as LongTag).valueOf();
      case "integrateddynamics:string":
        return (tag as StringTag).valueOf();
      case "integrateddynamics:itemstack":
        return Item.deserializeNBT(tag);
      case "integrateddynamics:fluidstack":
        return Fluid.deserializeNBT(tag);
      case "integrateddynamics:ingredients":
        return Ingredients.deserializeNBT(tag);
      case "integrateddynamics:recipe":
        return Recipe.deserializeNBT(tag);
      case "integrateddynamics:operator":
        return OperatorSerializationRegistry.deserialize(tag);
      case "integrateddynamics:nbt":
        return tag;
      case "integrateddynamics:list":
        if (tag instanceof ListTag) {
          const values = tag
            .valueOf()
            .valueOf()
            .map((t) => {
              if (t instanceof CompoundTag) {
                const typeNode = t.get(new iString("valueType"));
                const valNode = t.get(new iString("value"));
                if (typeNode instanceof StringTag) {
                  return this.deserializeRaw(
                    typeNode.valueOf().valueOf(),
                    valNode
                  );
                }
              }
              return t;
            });
          return new iArrayEager(values);
        }
        return new iArrayEager([]);
      default:
        throw new Error(`Cannot deserialize value of type ${typeName}`);
    }
  }

  public static getTypeName(value: IntegratedValue): string {
    if (value instanceof iBoolean) return "integrateddynamics:boolean";
    if (value instanceof Integer) return "integrateddynamics:integer";
    if (value instanceof Double) return "integrateddynamics:double";
    if (value instanceof Long) return "integrateddynamics:long";
    if (value instanceof iString) return "integrateddynamics:string";
    if (value instanceof Item) return "integrateddynamics:itemstack";
    if (value instanceof Fluid) return "integrateddynamics:fluidstack";
    if (value instanceof Ingredients) return "integrateddynamics:ingredients";
    if (value instanceof Recipe) return "integrateddynamics:recipe";
    if (value instanceof Operator) return "integrateddynamics:operator";
    if (value instanceof iArrayEager) return "integrateddynamics:list";
    if (value instanceof Tag) return "integrateddynamics:nbt";
    throw new Error(
      `Cannot get type name for value of type ${value.constructor.name}`
    );
  }
}
