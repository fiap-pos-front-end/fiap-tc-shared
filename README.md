# Shared Event Bus

> 🚀 Agnóstico, zero-dependency, leve e tipado em TypeScript para comunicação entre micro-frontends.

## Sumário

- Funcionalidades
- Pré-requisitos
- Instalação
- Estrutura do Projeto
- Build
- Publicação
- Uso
  - Angular
  - React
- Contribuição
- Licença

---

## Funcionalidades

- **Framework-agnóstico:** não importa se é Angular, React, Vue ou Vanilla.
- **Zero-dependency:** só precisa de `mitt` (2 KB).
- **TypeScript:** tipagem forte para maior segurança.
- **Micro-frontends:** compartilhe eventos entre apps isolados.

---

## Pré-requisitos

- Node.js ≥ 14
- npm ou yarn

---

## Instalação

Clone o repositório separado:

```bash
git clone git@github.com:fiap-pos-front-end/fiap-tc-shared.git
cd fiap-tc-shared
```

Instale as dependências:

```bash
npm install mitt
npm install --save-dev typescript rollup rollup-plugin-typescript2 @types/mitt
```

---

## Estrutura do Projeto

```
fiap-tc-shared/
├── src/
│   └── index.ts         # Core: emitEvent, onEvent, offEvent
├── dist/                # Saída do build
├── package.json
├── tsconfig.json
└── rollup.config.cjs
```

---

## Build

```bash
npm run build
# gera:
# dist/index.cjs.js
# dist/index.esm.js
# dist/index.d.ts
```

---

## Publicação

Pacote privado no GitHub Packages ou npm Registry

1. Configure acesso privado (no CI ou local via `.npmrc`).
2. Bump de versão:
   ```bash
   npm version patch
   ```
3. Publique:
   ```bash
   npm publish --access restricted
   ```

---

## Uso

### Angular

1. Instale no seu MFE Angular 19:
   ```bash
   npm install @fiap-pos-front-end/fiap-tc-shared mitt
   ```
2. Crie um service:

   ```ts
   import { Injectable } from "@angular/core";
   import {
     emitEvent,
     onEvent,
     offEvent,
   } from "@fiap-pos-front-end/fiap-tc-shared";

   @Injectable({ providedIn: "root" })
   export class EventBusService {
     emit = emitEvent;
     on = onEvent;
     off = offEvent;
   }
   ```

3. Use onde precisar:
   ```ts
   this.eventBus.emit("balanceChanged", 123);
   this.eventBus.on("balanceChanged", (val) => console.log(val));
   ```

### React

1. Instale no seu MFE React:
   ```bash
   npm install @fiap-pos-front-end/fiap-tc-shared mitt
   ```
2. Crie hooks (no próprio projeto React):

   ```ts
   // useEventBus.ts
   import { useEffect } from "react";
   import { onEvent, offEvent } from "@fiap-pos-front-end/fiap-tc-shared";

   export function useEventBus<T>(
     event: string,
     handler: (payload: T) => void
   ) {
     useEffect(() => {
       onEvent(event, handler);
       return () => offEvent(event, handler);
     }, [event, handler]);
   }
   ```

   ```ts
   // useEmit.ts
   import { emitEvent } from "@fiap-pos-front-end/fiap-tc-shared";
   export const useEmit = () => emitEvent;
   ```

3. No componente React:

   ```tsx
   import { useState } from "react";
   import { useEventBus, useEmit } from "./hooks";

   function BalanceComponent() {
     const [balance, setBalance] = useState(0);
     const emit = useEmit<number>();

     useEventBus<number>("balanceChanged", setBalance);

     return (
       <button onClick={() => emit("balanceChanged", balance + 1)}>
         Incrementar balance ({balance})
       </button>
     );
   }
   ```

---

## Contribuição

1. Fork neste repo
2. Crie uma branch: `git checkout -b feature/minha-ideia`
3. Commit, PR e code review
4. Mantenha simples, organizado e sem floreios

---

## Licença

MIT @ fiap-pos-front-end
