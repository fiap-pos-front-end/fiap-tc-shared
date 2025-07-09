# event-bus

> 🚀 Biblioteca leve e agnóstica para troca de eventos entre Micro-Frontends Angular 19 e React.

---

## Sumário

- [Funcionalidades](#funcionalidades)

- [Pré-requisitos](#pré-requisitos)

- [Instalação](#instalação)

- [Estrutura do Projeto](#estrutura-do-projeto)

- [Configuração](#configuração)

- [Uso](#uso)

  - [Angular 19](#angular-19)
  - [React](#react)

- [Publicação](#publicação)

  - [npm Registry](#npm-registry)
  - [GitHub Packages](#github-packages)

- [Contribuição](#contribuição)

- [Licença](#licença)

---

## Funcionalidades

- **Leve**: usa `mitt` (2KB) como peer-dependency.
- **TypeScript**: tipagem forte em todo o core.
- **Angular 19**: wrapper como `EventBusService` integrado ao DI.
- **React**: hooks `useEventBus` e `useEmit` para consumo e emissão.
- **Agnóstico**: funciona em qualquer framework JS.

---

## Pré-requisitos

- Node.js >= 14
- npm (ou yarn) instalado globalmente
- Projetos Angular 19 e React configurados

---

## Instalação

```bash
# Clone o repositório e entre nele
git clone https://github.com/fiap-pos-front-end/event-bus.git
cd event-bus

# Instale peer- e dev-dependencies
npm install --save-peer mitt @angular/core @angular/common
npm install --save-dev typescript rollup rollup-plugin-typescript2 @types/mitt
```

---

## Estrutura do Projeto

```
event-bus/
├─ src/
│  ├─ bus.ts               # Core usando mitt
│  ├─ angular/
│  │  ├─ event-bus.service.ts
│  │  └─ event-bus.module.ts
│  ├─ react/
│  │  ├─ useEventBus.ts
│  │  └─ useEmit.ts
│  └─ index.ts             # Barrel exports
├─ dist/                   # Saída do build
├─ package.json
├─ tsconfig.json
└─ rollup.config.js
```

---

## Configuração

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "ESNext",
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### rollup.config.js

```js
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true },
    { file: pkg.browser, format: "umd", name: "EventBus", sourcemap: true },
  ],
  external: ["mitt"],
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
```

---

## Uso

### Angular 19

1. Instale no seu Angular:

   ```bash
   npm install @fiap-pos-front-end/event-bus mitt
   ```

2. Injete e use no seu `SharedService` ou componente:

   ```ts
   constructor(private bus: EventBusService) {}

   this.bus.emit('balanceChanged', 123);
   this.bus.on('balanceChanged', (val) => console.log(val));
   ```

### React

1. Instale no seu React:

   ```bash
   npm install @fiap-pos-front-end/event-bus mitt
   ```

2. Use os hooks:

   ```tsx
   import { useEventBus, useEmit } from "@fiap-pos-front-end/event-bus";

   function MyComponent() {
     const emit = useEmit<number>();
     const [val, setVal] = useState(0);

     useEventBus<number>("balanceChanged", setVal);

     return (
       <>
         <button onClick={() => emit("balanceChanged", val + 1)}>++</button>
         <div>Balance: {val}</div>
       </>
     );
   }
   ```

---

## Publicação

### npm Registry

1. Atualize versão no `package.json`.

2. Faça login:

   ```bash
   npm login
   ```

3. Publique:

   ```bash
   npm publish --access public
   ```

### GitHub Packages

#### Publicação manual

1. Crie ou atualize o arquivo `.npmrc` na raiz do repo:

   ```ini
   @fiap-pos-front-end:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

2. No `package.json`, confirme ou adicione:

   ```json
   "publishConfig": {
     "registry": "https://npm.pkg.github.com/"
   }
   ```

3. Faça login via CLI (opcional, pois o CI já usa token):

   ```bash
   npm login --registry=https://npm.pkg.github.com --scope=@fiap-pos-front-end
   ```

4. Publique:

   ```bash
   npm publish
   ```

#### CI com GitHub Actions

Para um pacote **privado** no GitHub Packages, ajuste seu workflow assim:

```yaml
name: Publish Shared Lib
on:
  push:
    tags:
      - "v*.*.*"
jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          registry-url: "https://npm.pkg.github.com"
          scope: "@fiap-pos-front-end"
      - name: Install and build
        run: |
          npm ci
          npm run build
      - name: Configure npm for GitHub Packages
        run: |
          echo "@fiap-pos-front-end:registry=https://npm.pkg.github.com" >> ~/.npmrc
      - name: Publish to GitHub Packages
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          npm publish
```

- **scope** em `setup-node`: garante que o pacote é publicado no registry correto.
- **npm publish** sem `--access` publica como privado no GitHub Packages por padrão.
- O `GITHUB_TOKEN` já possui permissão para publicar no registro privado do GitHub Packages.
