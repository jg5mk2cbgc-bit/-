const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

let stickyMessage = null;

client.once('ready', () => {
  console.log(`${client.user.tag} 실행 완료`);
});

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.channel.id !== CHANNEL_ID) return;

  try {

    if (stickyMessage) {
      await stickyMessage.delete().catch(() => {});
    }

    const embed = new EmbedBuilder()
  .setColor('#5865F2')
  .setTitle('닉네임 양식')
  .setDescription(`
닉네임#테그 전시즌-현시즌 최고티어 주라인/부라인

ex) 또 우냥#kr2 D TOP/AD
  `);
    stickyMessage = await message.channel.send({
      embeds: [embed]
    });

  } catch (err) {
    console.log(err);
  }

});

client.login(TOKEN);
