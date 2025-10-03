function ASTtoNBT(node, id = -1) {
  const serialized = serializeOperatorNode(node);
  return {
    _type: "integrateddynamics:valuetype",
    typeName: "integrateddynamics:operator",
    _id: id,
    value: serialized,
  };
}

function serializeOperatorNode(node) {
  if (node.serializer) {
    node.serializer =
      operatorRegistry.baseOperators[node.serializer].serializer;
  }
  if (node.serializer === "integrateddynamics:curry") {
    let firstArg = node.args.shift();
    let serializer =
      operatorRegistry.baseOperators[firstArg.operator.serializer]?.serializer;
    if (serializer) {
      node.value = {
        baseOperator: {
          serializer: serializer,
          value: {
            operators: firstArg.operator.args.map((arg) => ({
              v: serializeOperatorNode(arg),
            })),
          },
        },
        values: [],
      };
    } else {
      node.value = {
        baseOperator:
          operatorRegistry.baseOperators[firstArg.operator]?.internalName,
        values: firstArg.args.map(serializeOperatorNode),
      };
    }
    for (const arg of firstArg.args) {
      node.value.values.push({
        value: serializeOperatorNode(arg),
        valueType: "integrateddynamics:operator",
      });
    }
    delete node.args;
  }
  if (node.args && node.args.length > 0) {
    node.value = {
      operators: [],
    };
    for (const arg of node.args) {
      node.value.operators.push({
        v: serializeOperatorNode(arg),
      });
    }
    delete node.args;
  }
  if (node.type in operatorRegistry.typeSerializers) {
    node.valueType = operatorRegistry.typeSerializers[node.type].valueType;
    delete node.type;
  }
  if (node.operator && Array.isArray(node.args) && node.args?.length === 0)
    node = operatorRegistry.baseOperators[node.operator].internalName;
  return node;
}
