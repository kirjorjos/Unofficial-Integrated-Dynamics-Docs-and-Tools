import { Operator, OperatorSerializationRegistry } from "./Operator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class FlipOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  public readonly op: Operator<IntegratedValue, IntegratedValue>;

  constructor(op: Operator<IntegratedValue, IntegratedValue>) {
    const signature = op.getSignatureNode().flip();

    const fn = (arg1: IntegratedValue) => {
      return (arg2: IntegratedValue) => {
        return (
          op.apply(arg2) as Operator<IntegratedValue, IntegratedValue>
        ).apply(arg1);
      };
    };

    super({
      parsedSignature: signature,
      function: fn,
      interactName: "flip",
      baseDisplayName: "Virtual Fliped Operator",
    });

    this.op = op;
  }

  override getUniqueName(): iString {
    return new iString("integrateddynamics:combined.flip");
  }

  serializeNBT(): CompoundTag {
    return new CompoundTag({
      flip: new CompoundTag({
        op: OperatorSerializationRegistry.serialize(this.op),
      }),
    });
  }

  static deserializeNBT(
    tag: Tag<IntegratedValue>
  ): FlipOperator<IntegratedValue, IntegratedValue> {
    if (!(tag instanceof CompoundTag)) {
      throw new Error("Could not deserialize flip operator: not a CompoundTag");
    }
    const compound = tag as CompoundTag;
    const flipNode = compound.get(new iString("flip"));
    if (!(flipNode instanceof CompoundTag)) {
      throw new Error("Flip node missing or not a CompoundTag");
    }

    const opNode = flipNode.get(new iString("op"));

    const op = OperatorSerializationRegistry.deserialize(opNode);

    return new FlipOperator(op);
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof FlipOperator)) return new iBoolean(false);
    return this.op.equals(other.op);
  }

  public static load() {
    OperatorSerializationRegistry.flip = (op) => new FlipOperator(op);
    OperatorSerializationRegistry.DESERIALIZERS["flip"] = (tag) =>
      FlipOperator.deserializeNBT(tag);
  }
}

FlipOperator.load();
