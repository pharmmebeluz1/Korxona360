import ts from 'typescript';
import {build} from 'vite';
import fs from 'node:fs';
for(const name of ['action','data']){const source=fs.readFileSync(`server/${name}.ts`,'utf8');fs.writeFileSync(`server/${name}.mjs`,ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText)}
await build();
