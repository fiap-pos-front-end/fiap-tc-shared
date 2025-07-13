# Fiap Tech Challeng Shared

**Biblioteca compartilhada** de utilitários e componentes para os Microfrontends do FIAP Tech Challenge.

---

## Objetivo

Compartilhar dados entre React, Angular e outros projetos.

## Tecnologias

- **TypeScript** 5.x
- **Rollup** para empacotamento
- **mitt** para Event Bus
- **ESLint** e **Prettier**

## Estrutura de Pastas

```
fiap-tc-shared/
├─ src/
│  └─ EventBus.ts      # Event Bus com mitt
│  └─ index.ts         # Exportações principais
├─ rollup.config.js    # Configuração de build
├─ package.json
```

## Scripts

```bash
npm run build   # Gera build em dist/
```

## Instalação

No projeto consumidor:

```bash
npm install @fiap-pos-front-end/fiap-tc-shared
```

## Uso Básico

```ts
// Event Bus
import {
  onEvent,
  emitEvent,
  getLast,
} from "@fiap-pos-front-end/fiap-tc-shared";

// Emitir evento
emitEvent("user:login", { id: 123, name: "Fiap" });

// Ouvir evento
onEvent("user:login", (payload) => console.log("Entrou:", payload.name));

// Obter último valor do evento
getLast("user:login", (payload) => console.log("Entrou:", payload.name));
```

## Publicar pacote

1. Commitar alterações pro GitHub

2. Atualizar de versão do projeto e criar tag no GitHub:

   ```bash
   npm version patch
   ```

3. Publique pelo GitHub Actions

   ```bash
   git push --tags
   ```

4. Enviar alterações pro GitHub
