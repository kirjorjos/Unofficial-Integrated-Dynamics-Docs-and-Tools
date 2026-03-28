import {
  Operator,
  OperatorSerializationRegistry,
} from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class Pipe2Operator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  public readonly op1: Operator<IntegratedValue, IntegratedValue>;
  public readonly op2: Operator<IntegratedValue, IntegratedValue>;
  public readonly op3: Operator<IntegratedValue, IntegratedValue>;

  constructor(
    op1: Operator<IntegratedValue, IntegratedValue>,
    op2: Operator<IntegratedValue, IntegratedValue>,
    op3: Operator<IntegratedValue, IntegratedValue>
  ) {
    const signature = op1
      .getSignatureNode()
      .pipe2(op2.getSignatureNode(), op3.getSignatureNode());

    const fn = (arg: IntegratedValue) => {
      return (
        op3.apply(op1.apply(arg), false) as Operator<
          IntegratedValue,
          IntegratedValue
        >
      ).apply(op2.apply(arg), false);
    };

    super({
      parsedSignature: signature,
      function: fn,
      interactName: "pipe2",
      baseDisplayName: "Virtual Piped 2 Operator",
    });

    this.op1 = op1;
    this.op2 = op2;
    this.op3 = op3;
  }

  override getUniqueName(): iString {
    return new iString("integrateddynamics:combined.pipe2");
  }

  serializeNBT(): CompoundTag {
    return new CompoundTag({
      pipe2: new CompoundTag({
        op1: OperatorSerializationRegistry.serialize(this.op1),
        op2: OperatorSerializationRegistry.serialize(this.op2),
        op3: OperatorSerializationRegistry.serialize(this.op3),
      }),
    });
  }

  static deserializeNBT(
    tag: Tag<IntegratedValue>
  ): Pipe2Operator<IntegratedValue, IntegratedValue> {
    if (!(tag instanceof CompoundTag)) {
      throw new Error(
        "Could not deserialize pipe2 operator: not a CompoundTag"
      );
    }
    const compound = tag as CompoundTag;
    const pipe2Node = compound.get(new iString("pipe2"));
    if (!(pipe2Node instanceof CompoundTag)) {
      throw new Error("Pipe2 node missing or not a CompoundTag");
    }

    const op1Node = pipe2Node.get(new iString("op1"));
    const op2Node = pipe2Node.get(new iString("op2"));
    const op3Node = pipe2Node.get(new iString("op3"));

    const op1 = OperatorSerializationRegistry.deserialize(op1Node);
    const op2 = OperatorSerializationRegistry.deserialize(op2Node);
    const op3 = OperatorSerializationRegistry.deserialize(op3Node);

    return new Pipe2Operator(op1, op2, op3);
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof Pipe2Operator)) return new iBoolean(false);
    return new iBoolean(
      this.op1.equals(other.op1).valueOf() &&
        this.op2.equals(other.op2).valueOf() &&
        this.op3.equals(other.op3).valueOf()
    );
  }

  public static load() {
    OperatorSerializationRegistry.pipe2 = (op1, op2, op3) =>
      new Pipe2Operator(op1, op2, op3);
    OperatorSerializationRegistry.DESERIALIZERS["pipe2"] = (tag) =>
      Pipe2Operator.deserializeNBT(tag);
  }
}

Pipe2Operator.load();
