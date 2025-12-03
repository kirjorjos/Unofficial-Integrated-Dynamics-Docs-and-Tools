import { operatorRegistry } from "./IntegratedDynamicsClasses/operators/operatorRegistry";
// import { ASTtoNBT } from "./ASTTransformers/ASTtoNBT";
// import { NBTtoAST } from "./ASTTransformers/NBTtoAST";

(window as any).operatorRegistry = operatorRegistry;

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
