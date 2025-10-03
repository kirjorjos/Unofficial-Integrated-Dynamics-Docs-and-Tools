function NBTtoAST(nbt) {
  if ((typeof nbt !== "object" && typeof nbt !== "string") || nbt === null) {
    console.log(nbt);
    throw new Error("Invalid NBT node");
  }

  if (typeof nbt === "string" && nbt.startsWith("integrateddynamics:")) {
    return {
      operator:
        typeof nbt === "string" ? extractKeyByInternalName(nbt) : NBTtoAST(nbt),
      args: [],
    };
  }

  // ✅ Unwrap full ValueType wrapper
  if (
    nbt._type === "integrateddynamics:valuetype" &&
    nbt.typeName === "integrateddynamics:operator"
  ) {
    return NBTtoAST(nbt.value); // Recurse into actual operator content
  }

  // ✅ Handle constant values
  if ("value" in nbt && "valueType" in nbt && !("serializer" in nbt)) {
    return {
      type: capitalizeFirstChar(
        nbt.valueType.replace("integrateddynamics:", "")
      ),
      value: nbt.value,
    };
  }

  // ❌ Error if missing serializer
  if (!("serializer" in nbt)) {
    throw new Error("Not a valid operator NBT " + JSON.stringify(nbt));
  }

  const { serializer, value } = nbt;

  switch (serializer) {
    case "integrateddynamics:combined.pipe":
      return {
        serializer: "pipe",
        args: value.operators.map((op) => NBTtoAST(unwrapLazy(op.v))),
      };

    case "integrateddynamics:combined.flip":
      return {
        serializer: "flip",
        args: value.operators.map((op) => NBTtoAST(unwrapLazy(op.v))),
      };

    case "integrateddynamics:curry":
      return {
        serializer: "apply",
        args: [
          {
            operator: (() => {
              if (value.baseOperator)
                return typeof value.baseOperator === "string"
                  ? extractKeyByInternalName(value.baseOperator)
                  : NBTtoAST(unwrapLazy(value.baseOperator));
              return value.proxyName;
            })(),
            args: (value.values ?? []).map((val) => {
              val = unwrapLazy(val);
              if (
                val.type === "Operator" ||
                val.valueType === "integrateddynamics:operator"
              ) {
                return NBTtoAST({
                  _type: "integrateddynamics:valuetype",
                  typeName: "integrateddynamics:operator",
                  _id: -1,
                  value: val.value,
                });
              }

              // Otherwise treat as a literal constant
              return {
                type:
                  val.valueType?.replace("integrateddynamics:", "") ??
                  "Unknown",
                value: val.value,
              };
            }),
          },
        ],
      };

    default:
      throw new Error(`Unknown serializer: ${serializer}`);
  }
}
