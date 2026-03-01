import { Operator, OperatorSerializationRegistry } from "./Operator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { CompoundTag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class PipeOperator<
  I extends IntegratedValue,
  O extends IntegratedValue,
> extends Operator<I, O> {
  public readonly op1: Operator<IntegratedValue, IntegratedValue>;
  public readonly op2: Operator<IntegratedValue, IntegratedValue>;

  constructor(
    op1: Operator<IntegratedValue, IntegratedValue>,
    op2: Operator<IntegratedValue, IntegratedValue>
  ) {
    const signature = op1.getSignatureNode().pipe(op2.getSignatureNode());

    const fn = (arg: IntegratedValue) => {
      return op2.apply(op1.apply(arg));
    };

    super({
      parsedSignature: signature,
      function: fn,
      interactName: "pipe",
      baseDisplayName: "Virtual Piped Operator",
    });

    this.op1 = op1;
    this.op2 = op2;
  }

  override getUniqueName(): iString {
    return new iString("integrateddynamics:combined.pipe");
  }

  serializeNBT(): CompoundTag {
    return new CompoundTag({
      pipe: new CompoundTag({
        op1: OperatorSerializationRegistry.serialize(this.op1),
        op2: OperatorSerializationRegistry.serialize(this.op2),
      }),
    });
  }

  static deserializeNBT(tag: Tag<IntegratedValue>): PipeOperator<any, any> {
    if (!(tag instanceof CompoundTag)) {
      throw new Error("Could not deserialize pipe operator: not a CompoundTag");
    }
    const compound = tag as CompoundTag;
    const pipeNode = compound.get(new iString("pipe"));
    if (!(pipeNode instanceof CompoundTag)) {
      throw new Error("Pipe node missing or not a CompoundTag");
    }

    const op1Node = pipeNode.get(new iString("op1"));
    const op2Node = pipeNode.get(new iString("op2"));

    const op1 = OperatorSerializationRegistry.deserialize(op1Node);
    const op2 = OperatorSerializationRegistry.deserialize(op2Node);

    return new PipeOperator(op1, op2);
  }

  override equals(other: IntegratedValue): iBoolean {
    if (!(other instanceof PipeOperator)) return new iBoolean(false);
    return new iBoolean(
      this.op1.equals(other.op1).valueOf() &&
        this.op2.equals(other.op2).valueOf()
    );
  }

  public static load() {
    OperatorSerializationRegistry.pipe = (op1, op2) =>
      new PipeOperator(op1, op2);
    OperatorSerializationRegistry.DESERIALIZERS["pipe"] = (tag) =>
      PipeOperator.deserializeNBT(tag);
  }
}

PipeOperator.load();
