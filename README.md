# penta-swap

PENTAのトークンと他トークンのスワップを自動的に行なうDEX

### Environment

|Section|Tech|Description|
|-|-|-|
|contract|Solidity v8.4<br>Hardhat|uniswap v2フォークをほぼそのまま採用|
|interface|Node v14^<br>Yarn1.22^<br>TypeScript<br>Vite, React, Recoil, Tailwind css, daisyui|まだコントラクト接続がArthSwap, ネイティブトークンが$ASTRに紐付いたまま(とりあえず流動性周りのテストしてる)|
|sdk|Node v14^<br>Yarn1.22^<br>Typescript|uniswap v2 sdk/pancakeswap sdkをミックスし、ethereum系由来の固有部分を少し変更してる|

<br>

### Spec

--TODO--

<br>

### Get Started

```
$ git clone git@github.com:wall-of-death/penta-swap.git
$ cd penta-swap
$ yarn
$ yarn dev
```
