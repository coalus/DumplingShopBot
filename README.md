# [@DumplingsTonBot](https://t.me/DumplingsTonBot) code

A bot created for an example of accepting payments on TON, in the form of a dumpling shop🥟
Article with a full explanation of the bot's work: tonspace.co/develop/dapps/payment-processing/accept-payments-in-a-telegram-bot-js/

# Installation and local launch
1. Clone this repo: `git clone https://github.com/coalus/DumplingShopBot`
2. Go to the folder: `cd DumplingShopBot`
3. Create `.env` with the environment variables listed below
4. Run `npm install`
5. Run `npm run app`

# Environment variables
- `BOT_TOKEN` — Telegram bot token, which you can get from [@BotFather](https://t.me/BotFather)
- `TONCENTER_TOKEN` — Token for (testnet.)toncenter.com, which you can get from [@tonapibot](https://t.me/tonapibot)/[@tontestnetapibot](https://t.me/tontestnetapibot) for the mainnet and testnet, respectively
- `NETWORK` — `mainnet` or `testnet`
- `OWNER_WALLET` — Wallet for accepting payments

# License

MIT — use for any purpose. Would be great if you could leave a note about the original developers. Thanks!

