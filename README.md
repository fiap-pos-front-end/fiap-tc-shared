# @fiap-pos-front-end/shared

> Biblioteca Angular para comunicação reativa entre Shell e Microfrontends.

## Descrição

O `@fiap-pos-front-end/shared` fornece um serviço singleton (`SharedService`) baseado em RxJS para compartilhar o estado do **saldo** (balance) e outros eventos de forma reativa entre diferentes aplicações Angular (Shell e MFEs) usando Module Federation.

---

## Instalação

Instale o pacote do GitHub Packages:

```bash
npm install @fiap-pos-front-end/shared
```

> **Observação:** configure seu `.npmrc` para apontar ao registry do GitHub Packages da sua organização:
>
> ```ini
> @fiap-pos-front-end:registry=https://npm.pkg.github.com
> //npm.pkg.github.com/:_authToken=SEU_TOKEN
> ```

---

## Uso

### 1. Configurar Module Federation

Em `webpack.config.js` do Shell e do Remote, compartilhe a lib como singleton:

```js
shared: {
  '@fiap-pos-front-end/shared': {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    eager: true
  },
  '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  'rxjs': { singleton: true, strictVersion: true, requiredVersion: 'auto' }
}
```

### 2. Injetar e usar o `SharedService`

Em qualquer componente ou serviço Angular (Shell ou Remote):

```ts
import { Component, OnInit, inject } from "@angular/core";
import { SharedService } from "@fiap-pos-front-end/shared";

@Component({ selector: "app-home", templateUrl: "./home.component.html" })
export class HomeComponent implements OnInit {
  balance = 0;
  private shared = inject(SharedService);

  ngOnInit() {
    this.shared.balance$.subscribe((value) => {
      this.balance = value;
    });
  }
}
```

Para publicar um novo valor de **balance**:

```ts
import { SharedService } from '@fiap-pos-front-end/shared';

constructor(private shared: SharedService) {}

onTransactionComplete(newBalance: number) {
  this.shared.setBalance(newBalance);
}
```

---

## API

### `balance$: Observable<number>`

Fluxo reativo que emite o valor atual do saldo sempre que `setBalance()` é chamado.

### `setBalance(balance: number): void`

Atualiza o valor do saldo emitido pelo `balance$`.

### `getBalance(): number`

Retorna o valor atual do saldo de maneira síncrona.

### `getHello(): string`

Método de teste que retorna uma saudação: `"Olá do SharedService".`

---

## Licença

MIT © fiap-pos-front-end
