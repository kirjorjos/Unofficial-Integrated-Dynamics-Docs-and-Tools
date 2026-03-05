import { Operator, OperatorSerializationRegistry } from "./Operator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { ListTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { ValueHelpers } from "IntegratedDynamicsClasses/ValueHelpers";
import { StringTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class CurriedOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  public readonly baseOperator: Operator<IntegratedValue, IntegratedValue>;
  public readonly appliedArgs: IntegratedValue[];

  constructor(
    baseOperator: Operator<IntegratedValue, IntegratedValue>,
    appliedArgs: IntegratedValue[]
  ) {
    let signature = baseOperator.getSignatureNode();
    for (const arg of appliedArgs) {
      if (signature.getRootType() === "Function") {
        signature = signature.apply(arg.getSignatureNode());
      }
    }

    const finalFn = (arg: IntegratedValue) => {
      const allArgs = [...appliedArgs, arg];
      const arity = baseOperator.getParsedSignature().getArity();

      if (allArgs.length >= arity) {
        let current: Function | IntegratedValue = baseOperator.getFn();
        for (const a of allArgs) {
          if (typeof current === "function") {
            current = current(a);
          } else if (current instanceof Operator) {
            current = current.apply(a);
          } else {
            throw new Error(
              `Unexpected type during curried evaluation: ${typeof current}`
            );
          }
        }

        while (typeof current === "function" && current.length === 0) {
          current = current();
        }

        return current;
      }
      return new CurriedOperator(baseOperator, allArgs);
    };

    super({
      parsedSignature: signature,
      function: finalFn,
      interactName: "curried_operator",
      baseDisplayName: baseOperator.getName().valueOf(),
    });

    this.baseOperator = baseOperator;
    this.appliedArgs = appliedArgs;
  }

  override getFn(): Function {
    return (arg: IntegratedValue) => {
      const allArgs = [...this.appliedArgs, arg];
      const arity = this.baseOperator.getParsedSignature().getArity();

      let current: any = this.baseOperator.getFn();
      for (const a of allArgs) {
        if (typeof current === "function") {
          current = current(a);
        } else if (current instanceof Operator) {
          current = current.apply(a);
        } else {
          return current;
        }
      }

      if (allArgs.length >= arity) {
        while (typeof current === "function" && current.length === 0) {
          current = current();
        }
        return current;
      }

      return new CurriedOperator(this.baseOperator, allArgs);
    };
  }

  override getUniqueName(): iString {
    return new iString("curried_operator");
  }

  override getName(): iString {
    const argTypes = this.appliedArgs.map((arg) =>
      arg.getSignatureNode().getRootType()
    );
    return new iString(
      `Applied ${this.baseOperator.getName().valueOf()} [${argTypes.join("; ")}]`
    );
  }

  serializeNBT(): CompoundTag {
    const values = this.appliedArgs.map((arg) => {
      return new CompoundTag({
        valueType: new StringTag(new iString(ValueHelpers.getTypeName(arg))),
        value: ValueHelpers.serializeRaw(arg),
      });
    });

    const baseSerialized = OperatorSerializationRegistry.serialize(
      this.baseOperator
    );

    return new CompoundTag({
      curry: new CompoundTag({
        values: new ListTag(new iArrayEager(values)),
        baseOperator: baseSerialized,
      }),
    });
  }

  static deserializeNBT(
    tag: Tag<IntegratedValue>
  ): CurriedOperator<IntegratedValue, IntegratedValue> {
    if (!(tag instanceof CompoundTag)) {
      throw new Error(
        "Could not deserialize curried operator: not a CompoundTag"
      );
    }
    const compound = tag as CompoundTag;
    const curryNode = compound.get(new iString("curry"));
    if (!(curryNode instanceof CompoundTag)) {
      throw new Error("Curry node missing or not a CompoundTag");
    }

    const valuesNode = curryNode.get(new iString("values"));
    const baseOperatorNode = curryNode.get(new iString("baseOperator"));

    if (!(valuesNode instanceof ListTag)) {
      throw new Error("Curried operator values missing or not a list");
    }

    const appliedArgs = valuesNode
      .valueOf()
      .valueOf()
      .map((v) => {
        const vComp = v as CompoundTag;
        const typeNameNode = vComp.get(new iString("valueType"));
        const typeName = (typeNameNode as StringTag).valueOf().valueOf();
        const val = vComp.get(new iString("value"));
        return ValueHelpers.deserializeRaw(typeName, val);
      });

    const baseOperator =
      OperatorSerializationRegistry.deserialize(baseOperatorNode);

    return new CurriedOperator(baseOperator, appliedArgs);
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof CurriedOperator)) return new iBoolean(false);
    if (!this.baseOperator.equals(other.baseOperator).valueOf())
      return new iBoolean(false);
    if (this.appliedArgs.length !== other.appliedArgs.length)
      return new iBoolean(false);
    return new iBoolean(
      this.appliedArgs.every((arg, i) => {
        const otherArg = other.appliedArgs[i];
        return otherArg ? arg.equals(otherArg).valueOf() : false;
      })
    );
  }

  public static load() {
    OperatorSerializationRegistry.curry = (base, args) =>
      new CurriedOperator(base, args);
    OperatorSerializationRegistry.DESERIALIZERS["curry"] = (tag) =>
      CurriedOperator.deserializeNBT(tag);
  }
}

CurriedOperator.load();
