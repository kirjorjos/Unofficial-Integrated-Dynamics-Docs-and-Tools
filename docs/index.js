// const mojangson = require('mojangson');
let operatorRegistry = fetch("operatorRegistry.json").then((res) => res.json());

//  AST to NBT
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ast-btn").addEventListener("click", async () => {
    operatorRegistry = await operatorRegistry;
    const AST = JSON.parse(document.getElementById("ast").value);
    const result = ASTtoNBT(AST);
    document.getElementById("nbt").value = JSON.stringify(result);
  });
});

//  NBT to AST
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nbt-btn").addEventListener("click", async () => {
    operatorRegistry = await operatorRegistry;
    const NBT = JSON.parse(
      document
        .getElementById("nbt")
        .value.replace(/([{,]\s*)([A-Za-z_]+)(\s*:)/g, '$1"$2"$3') // Quote keys
        .replace(
          /(:\s*)([A-Za-z0-9_]*[A-Za-z][A-Za-z0-9_]*)(?=\s*[,}])/g,
          '$1"$2"'
        ) // Quote unquoted alphanumeric values
    );
    const result = NBTtoAST(NBT);
    document.getElementById("ast").value = JSON.stringify(result);
  });
});
