const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const vm = require("vm");
const notifier = require("node-notifier");

const sourceDir = "docs/ASTTransformers";
const testDir = "tests";
const sandbox = vm.createContext({
  console,
});

const filesToWatch = {
  "ASTtoNBT.js": { func: "ASTtoNBT", input: "AST", expected: "NBT" },
  "NBTtoAST.js": { func: "NBTtoAST", input: "NBT", expected: "AST" },
};

const jsFiles = fs
  .readdirSync(sourceDir)
  .filter((file) => file.endsWith(".js"))
  .map((file) => path.join(sourceDir, file));

loadScriptInSandbox(path.join(__dirname, "..", "docs", "helpers.js"));
loadScriptInSandbox(path.join(__dirname, "..", "docs", "operatorRegistry.js"));

const onChange = (filePath) => {
  const baseName = path.basename(filePath);

  if (filesToWatch[baseName]) {
    console.log(`\n🔁 File changed: ${filePath}`);
    loadScriptInSandbox(filePath);
    runTests(baseName);
  } else {
    console.warn(`⚠️  File changed but no matching test config: ${baseName}`);
  }
};

const runTests = (file) => {
  const funcName = filesToWatch[file].func;
  const inputs = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", testDir, `${filesToWatch[file].input}.json`),
      "utf-8"
    )
  );
  const expectedOutputs = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        "..",
        testDir,
        `${filesToWatch[file].expected}.json`
      ),
      "utf-8"
    )
  );
  for (let i = 0; i < inputs.length; i++) {
    try {
      if (!expectedOutputs[i]) continue;
      const inputStr = JSON.stringify(inputs[i]);
      const result = sandbox[funcName](JSON.parse(inputStr));
      const pass =
        JSON.stringify(result) === JSON.stringify(expectedOutputs[i]);
      if (pass) {
        console.log(`  ✅ Test #${i + 1} passed.`);
      } else {
        console.error(`  ❌ Test #${i + 1} failed.`);
        console.error(`     Input:     ${JSON.stringify(`${inputStr}`)}`);
        console.error(`     Expected:  ${JSON.stringify(expectedOutputs[i])}`);
        console.error(`     Got:       ${JSON.stringify(result)}`);
        notifier.notify({
          title: "Test failed!",
          message: "Check command prompt output",
          sound: true,
          wait: false,
        });
      }
    } catch (err) {
      console.error(`  ❌ Test #${i + 1} threw an error:`, err);
    }
  }
};

function loadScriptInSandbox(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  vm.runInContext(code, sandbox);
}

jsFiles.forEach((file) => {
  chokidar.watch(file).on("change", onChange);
  console.log(`👀 Watching: ${file}`);
});
