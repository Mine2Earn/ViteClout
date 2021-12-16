# ViteClout

Viteclout is a social network based on the vite ecosystem, content creators are called Vuilders and they can mint their own coin on the vite blockchain to sell them on the website. Creators can subsequently provide certain services to their fans that hold their token.

This project has been done during the 'Hackathon: Grants Round 12 Hackathon' of Gitcoin.

Backend Repo : https://github.com/Mine2Earn/ViteClout-backend

Contract Repo : https://github.com/Mine2Earn/ViteClout-contract

## Demo

**Caution** the demo https://viteclout.ekazuki.fr is in **testnet** so you'll have to change the node in your ViteConnect app. Check end of this file and follow instructions to change it

## Optimizations

-   Verification of signature made by the vite_signMessage method of [ViteConnect](https://github.com/vitelabs/vite-connect-client) is not working properly
-   the formula provided have an unexpected behavior when there is only 1 token in circulation: 0.003 \* (1-1)^2 = 0
-   Sometimes on Account page the number of followers/following is to 0. This is a limitation of Twitter API (15 requests/15 minutes)

## Features

All the features requested for [Tier 3](https://gitcoin.co/issue/vitelabs/bounties/15/100027203) are implemented.

## Authors

-   [@Ekazukii](https://www.github.com/Ekazukii) - Discord : Ekazuki#0196
-   [@ObstinateM](https://www.github.com/ObstinateM) - Discord : Obstinate#2161

## Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```bash
  npm i
  yarn start
```

### How to change your ViteConnect node
1. Open the Vite Wallet app on your phone
2. Open yout account settings in the top left of the app
3. Open the settings tab
4. Open Node Settings then click on VITE
5. Click add Custom Node and add `https://buidl.vite.net/gvite`
