require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

let myActivity = [];

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence && newPresence.userId === process.env.USER_ID) {
      // Récupérer les activités avec les assets (images)
      myActivity = newPresence.activities.map(activity => ({
        name: activity.name,
        type: activity.type,
        state: activity.state || null,
        details: activity.details || null,
        assets: activity.assets || null,
        application_id: activity.applicationId || null
      }));
      console.log('Nouvelle activité :', myActivity.map(a => `${a.type}: ${a.name}`).join(', '));
    }
  });
  

client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = { client, myActivity };
