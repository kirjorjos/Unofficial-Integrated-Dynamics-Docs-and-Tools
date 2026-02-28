import { blockRegistry } from "IntegratedDynamicsClasses/registries/blockRegistry";
import { fluidRegistry } from "IntegratedDynamicsClasses/registries/fluidRegistry";
import { itemRegistry } from "IntegratedDynamicsClasses/registries/itemRegistry";
import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
// import { ASTtoNBT } from "./ASTTransformers/ASTtoNBT";
// import { NBTtoAST } from "./ASTTransformers/NBTtoAST";

(window as any).operatorRegistry = operatorRegistry;
(window as any).itemRegistry = itemRegistry;
(window as any).fluidRegistry = fluidRegistry;
(window as any).blockRegistry = blockRegistry;
// (window as any).entityRegistry = entityRegistry;

//  AST to NBT
window.addEventListener("DOMContentLoaded", () => {
  const astBtn = document.getElementById("ast-btn");
  const nbtBtn = document.getElementById("nbt-btn");
  const astTextArea = document.getElementById("ast") as HTMLTextAreaElement;
  const nbtTextArea = document.getElementById("nbt") as HTMLTextAreaElement;

  if (astBtn) {
    astBtn.addEventListener("click", () => {
      // const AST = JSON.parse(astTextArea.value);
      // const result = ASTtoNBT(AST);
      // nbtTextArea.value = JSON.stringify(result, null, 2); // Added pretty print
      nbtTextArea.value = "AST parsing is temporarily disabled.";
    });
  }

  if (nbtBtn) {
    nbtBtn.addEventListener("click", () => {
      // const nbtString = nbtTextArea.value
      //   .replace(/([{,]\s*)([A-Za-z_]+)(\s*:)/g, '$1"$2"$3') // Quote keys
      //   .replace(
      //     /(:\s*)([A-Za-z0-9_]*[A-Za-z][A-Za-z0-9_]*)(?=\s*[,}])/g,
      //     '$1"$2"'
      //   ); // Quote unquoted alphanumeric values

      // const NBT = JSON.parse(nbtString);
      // const result = NBTtoAST(NBT);
      // astTextArea.value = JSON.stringify(result, null, 2); // Added pretty print
      astTextArea.value = "NBT parsing is temporarily disabled.";
    });
  }
});
