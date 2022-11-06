import { InlineKeyboard } from "grammy";

import {
  generatePaymentLink,
  verifyTransactionExistance,
} from "../../services/ton.js";

export async function startPaymentProcess(conversation, ctx) {
  // Remove the loading clock
  await ctx.answerCallbackQuery();

  await ctx.replyWithPhoto(
    "https://telegra.ph/file/bad2fd69547432e16356f.jpg",
    {
      caption:
        "Send the number of portions of yummy dumplings you want buy\nP.S. Current price for 1 portion: 3 TON",
    }
  );

  // Wait until the user enters the number
  const count = await conversation.form.number();

  // Get the total cost: multiply the number of portions by the price of the 1 portion
  const amount = count * 3;
  // Generate random comment
  const comment = Math.random().toString(36).substring(2, 8) + "dumplings";
  // Save data to the session
  conversation.session.amount = amount;
  conversation.session.comment = comment;

  // Generate links for a quick transition to the wallet application. WARNING: works only on mainnet
  const tonhubPaymentLink = generatePaymentLink(
    process.env.OWNER_WALLET,
    amount,
    comment,
    "tonhub"
  );
  const tonkeeperPaymentLink = generatePaymentLink(
    process.env.OWNER_WALLET,
    amount,
    comment,
    "tonkeeper"
  );

  const menu = new InlineKeyboard()
    .url("Click to pay in TonHub", tonhubPaymentLink)
    .row()
    .url("Click to pay in TonKeeper", tonkeeperPaymentLink)
    .row()
    .text(`I sent ${amount} TON`, "check_transaction");

  await ctx.reply(
    `
Fine, all you have to do is transfer ${amount} TON to the wallet <code>${process.env.OWNER_WALLET}</code> with the comment <code>${comment}</code>.

<i>WARNING: I am currently working on ${process.env.NETWORK}</i>

P.S. You can conveniently make a transfer by clicking on the appropriate button below and confirm the transaction in the offer`,
    { reply_markup: menu, parse_mode: "HTML" }
  );
}

export async function checkTransaction(ctx) {
  await ctx.answerCallbackQuery({
    text: "Wait a bit, I need to check the availability of your transaction",
  });

  if (
    await verifyTransactionExistance(
      process.env.OWNER_WALLET,
      ctx.session.amount,
      ctx.session.comment
    )
  ) {
    const menu = new InlineKeyboard().text("Buy more dumplings🥟", "buy");

    await ctx.reply("Thank you so much. Enjoy your meal!", {
      reply_markup: menu,
    });

    // Reset the session data
    ctx.session.amount = 0;
    ctx.session.comment = "";
  } else {
    await ctx.reply("I didn't receive your transaction, wait a bit");
  }
}
