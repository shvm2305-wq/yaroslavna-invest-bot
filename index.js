const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_PATH = '/webhook';

const bot = new TelegramBot(TOKEN, { webHook: false });
bot.setWebHook(`${process.env.RENDER_EXTERNAL_HOSTNAME}${WEBHOOK_PATH}`);

app.post(WEBHOOK_PATH, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '✅ Спасибо! Гайд уже в работе. Скоро вышлю PDF.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
