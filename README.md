# ViteClout

Viteclout is a social network based on the vite ecosystem, content creators are called Vuilders and they can mint their own coin on the vite blockchain to sell them on the website. Creators can subsequently provide certain services to their fans that hold their token.

This project has been done during the 'Hackathon: Grants Round 12 Hackathon' of Gitcoin.

## Demo

https://viteclout.ekazuki.fr

## Optimizations

-   Verification of signature made by the vite_signMessage method of [ViteConnect](https://github.com/vitelabs/vite-connect-client) is not working properly
-   the formula provided have an unexpected behavior when there is only 1 token in circulation: 0.003 \* (1-1)^2 = 0

## Features

All the features requested for [Tier 3](https://gitcoin.co/issue/vitelabs/bounties/15/100027203) are implemented.

## Authors

-   [@Ekazukii](https://www.github.com/Ekazukii)
-   [@ObstinateM](https://www.github.com/ObstinateM)

## Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```bash
  npm i
  yarn start
```
