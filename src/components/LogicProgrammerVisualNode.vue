<script setup lang="ts">
import { computed } from "vue";
import { operatorRegistry } from "lib";

defineOptions({ name: "LogicProgrammerVisualNode" });

const props = defineProps<{
  ast: TypeAST.AST;
}>();

const getOperatorDisplay = (opName: TypeOperatorKey) => {
  const operatorClass = operatorRegistry[
    opName as keyof typeof operatorRegistry
  ] as {
    interactName?: string;
    symbol?: string;
  };

  return {
    title: operatorClass?.interactName ?? opName,
    symbol: operatorClass?.symbol ?? opName,
  };
};

const operatorMeta = computed(() => {
  if (props.ast.type !== "Operator") return null;
  return getOperatorDisplay(props.ast.opName);
});

const children = computed<TypeAST.AST[]>(() => {
  switch (props.ast.type) {
    case "Curry":
      return [props.ast.base, ...props.ast.args];
    case "Pipe":
      return [props.ast.op1, props.ast.op2];
    case "Pipe2":
      return [props.ast.op1, props.ast.op2, props.ast.op3];
    case "Flip":
      return [props.ast.arg];
    case "List":
      return props.ast.value;
    default:
      return [];
  }
});

const title = computed(() => {
  switch (props.ast.type) {
    case "Operator":
      return operatorMeta.value?.title ?? props.ast.opName;
    case "Curry":
      return props.ast.base.type === "Operator"
        ? getOperatorDisplay(props.ast.base.opName).title
        : "Apply";
    case "Pipe":
      return "Pipe";
    case "Pipe2":
      return "Pipe2";
    case "Flip":
      return "Flip";
    case "List":
      return "List";
    case "Variable":
      return "Variable";
    default:
      return props.ast.type;
  }
});

const symbol = computed(() => {
  switch (props.ast.type) {
    case "Operator":
      return operatorMeta.value?.symbol ?? "?";
    case "Curry":
      return "ƒ";
    case "Pipe":
      return "→";
    case "Pipe2":
      return "⇉";
    case "Flip":
      return "⇄";
    case "List":
      return "[]";
    case "Variable":
      return "$";
    case "Boolean":
      return props.ast.value ? "T" : "F";
    case "String":
      return "S";
    case "Integer":
    case "Long":
    case "Double":
      return "#";
    case "Null":
      return "∅";
    case "NBT":
      return "{}";
    default:
      return props.ast.type.slice(0, 1);
  }
});

const valueLabel = computed(() => {
  switch (props.ast.type) {
    case "Operator":
      return props.ast.opName;
    case "Variable":
      return props.ast.name;
    case "String":
      return props.ast.value;
    case "Boolean":
      return String(props.ast.value);
    case "Integer":
    case "Long":
    case "Double":
      return props.ast.value;
    case "Null":
      return "null";
    case "NBT":
      return JSON.stringify(props.ast.value);
    default:
      return null;
  }
});

const nodeClass = computed(() => `logic-node-${props.ast.type.toLowerCase()}`);
</script>

<template>
  <article class="logic-node" :class="nodeClass">
    <header class="logic-node-header">
      <span class="logic-node-symbol">{{ symbol }}</span>
      <div class="logic-node-heading">
        <h3 class="logic-node-title">{{ title }}</h3>
        <p v-if="valueLabel" class="logic-node-subtitle">{{ valueLabel }}</p>
      </div>
    </header>

    <div v-if="children.length" class="logic-node-inputs">
      <LogicProgrammerVisualNode
        v-for="(child, index) in children"
        :key="index"
        :ast="child"
      />
    </div>
  </article>
</template>
