# Shared Event Bus

> 🌐 Agnóstico, singleton global e tipado em TypeScript para comunicação entre micro-frontends.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Build](#build)
- [Publicação](#publicação)
- [Uso](#uso)
  - [API](#api)
  - [Angular](#angular)
  - [React](#react)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Funcionalidades

- **Framework-agnóstico**: funciona em qualquer app JS (Angular, React, Vue, Vanilla…)
- **Singleton global**: única instância em `globalThis`, compartilhada por todos os MFEs na mesma página
- **Replay automático**: quem se inscreve recebe o último valor emitido
- **TypeScript**: interface forte e segura
- **Leve**: depende só de `mitt` (2 KB)

---

## Pré-requisitos

- Node.js ≥ 14
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
│   ├── EventBus.ts      # interface + implementação SOLID
│   └── index.ts         # singleton global + re-exports
├── dist/                # Saída do build
├── package.json
├── tsconfig.json
└── rollup.config.cjs
```

---

## Build

```bash
npm run build
```

---

## Publicação

Pacote privado no GitHub Packages ou npm Registry

1. Configure acesso privado (no CI ou local via `.npmrc`).
2. Bump de versão:
   ```bash
   npm version patch
   ```
3. Build:
   ```bash
   npm run build
   ```
4. Publique Manual

   ```bash
   npm publish
   ```

   ou

   Publique pelo GitHub Actions

   ```bash
   git push --tags
   ```

---

## Uso

### API

Importe as funções principais:

```ts
import {
  emitEvent,
  onEvent,
  offEvent,
  getLastEvent,
} from "@fiap-pos-front-end/fiap-tc-shared";
```

| Função                                 | Descrição                                                                  |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `emitEvent(event, payload)`            | Emite event com payload e armazena como último valor.                      |
| `onEvent(event, handler, replayLast?)` | Inscreve handler; se replayLast=true, recebe imediatamente último payload. |
| `offEvent(event, handler)`             | Remove assinatura de handler em event.                                     |
| `getLastEvent(event)`                  | Retorna o último payload de event, ou undefined.                           |

### Angular

1. Instale no seu MFE Angular 19:
   ```bash
   npm install @fiap-pos-front-end/fiap-tc-shared mitt
   ```
2. Use onde precisar:

   ```ts
   import { Component, OnInit } from "@angular/core";
   import {
     emitEvent,
     onEvent,
     getLastEvent,
   } from "@minhaorg/shared-event-bus";
   @Component({})
   export class HomeComponent implements OnInit {
     balance = 0;

     ngOnInit(): void {
       this.balance = getLastEvent("balanceChange") ?? 0;

       onEvent<number>("balanceChange", (v) => (this.balance = v));
     }

     increment(): void {
       emitEvent("balanceChange", this.balance + 1);
     }
   }
   ```

### React

1. Instale no seu MFE React:

```bash
npm install @fiap-pos-front-end/fiap-tc-shared mitt
```

2. No componente React:

   ```tsx
   import { useState } from "react";
   import {
     emitEvent,
     onEvent,
     getLastEvent,
     offEvent,
   } from "@minhaorg/shared-event-bus";

   export function BalanceComponent() {
     const [balance, setBalance] = useState<number>(
       () => getLastEvent<number>("balanceChange") ?? 0
     );

     useEffect(() => {
       const handler = (v: number) => setBalance(v);
       onEvent<number>("balanceChange", handler);
       return () => offEvent("balanceChange", handler);
     }, []);

     return (
       <button onClick={() => emitEvent("balanceChange", balance + 1)}>
         Balance: {balance}
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
