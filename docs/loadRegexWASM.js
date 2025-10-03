async function initRE2() {
  const response = await fetch("re2.wasm");
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes, {});
  window.RE2 = instance.exports;
  console.log("RE2 ready:", window.RE2);
}

initRE2();
