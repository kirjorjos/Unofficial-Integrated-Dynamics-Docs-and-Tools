function extractKeyByInternalName(fullId) {
  for (const [key, entry] of Object.entries(operatorRegistry.baseOperators)) {
    if (entry.internalName === fullId) {
      return key;
    }
  }

  throw new Error(
    `No matching internalName found for: ${JSON.stringify(fullId)}`
  );
}

function extractSerializer(fullId) {
  for (const [key, entry] of Object.entries(operatorRegistry.baseOperators)) {
    if (entry.serializer === fullId) {
      return key;
    }
  }

  throw new Error(
    `No matching serializer found for: ${JSON.stringify(fullId)}`
  );
}

function capitalizeFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function unwrapLazy(val) {
  if (
    val?.value?.proxyName === "integrateddynamics:lazybuilt" &&
    val?.value?.serialized?.operator
  ) {
    return val.value.serialized.operator;
  }
  return val;
}
