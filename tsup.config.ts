import { defineConfig } from "tsup";

export const tsup = defineConfig({
  entry: {
    index: "src/index.ts",
    "inputs/index": "src/components/Inputs/index.ts",
    "velocimeter/index": "src/components/Velocimeter/index.ts",
  },
  dts: true, // Gerar arquivos de definição de tipo (.d.ts)
  clean: true,
  sourcemap: true,
  format: ["cjs", "esm"],
  outDir: "dist",
  splitting: true, // Dividir em chunks para otimizar o carregamento do código
});
