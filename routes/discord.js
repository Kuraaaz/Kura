const express = require('express');
const router = express.Router();
const { client } = require('../discordBot'); // Vérifie que l'import est correct

const USER_ID = "1046834138583412856"; // ID de l'utilisateur cible

router.get('/discord-data', async (req, res) => {
    try {
        const user = await client.users.fetch(USER_ID);
        if (!user) return res.status(500).json({ error: 'Utilisateur non disponible' });

        const guild = client.guilds.cache.find(g => g.members.cache.has(USER_ID));
        const presence = guild ? guild.presences.resolve(USER_ID) : null;

        if (!presence) return res.status(500).json({ error: 'Présence non disponible' });

        const data = {
            id: user.id,
            username: '!" Kura',
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
            status: presence.status,
            activities: presence.activities.map(activity => ({
                name: activity.name,
                type: activity.type,
                details: activity.details || null,
                state: activity.state || null,
                assets: activity.assets || null,
                application_id: activity.applicationId || null,
                start_timestamp: activity.timestamps?.start || null
            }))
        };

        res.json(data);
    } catch (error) {
        console.error('Erreur API Discord:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des informations Discord' });
    }
});

module.exports = router;
