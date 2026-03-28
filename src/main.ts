import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import {
  blockRegistry,
  entityRegistry,
  fluidRegistry,
  itemRegistry,
  operatorRegistry,
} from "lib";

const registryDebugTarget = window as typeof window & {
  blockRegistry?: typeof blockRegistry;
  entityRegistry?: typeof entityRegistry;
  fluidRegistry?: typeof fluidRegistry;
  itemRegistry?: typeof itemRegistry;
  operatorRegistry?: typeof operatorRegistry;
};

registryDebugTarget.operatorRegistry = operatorRegistry;
registryDebugTarget.itemRegistry = itemRegistry;
registryDebugTarget.fluidRegistry = fluidRegistry;
registryDebugTarget.blockRegistry = blockRegistry;
registryDebugTarget.entityRegistry = entityRegistry;

createApp(App).mount("#app");
