const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { embedColor } = require('../config.json');

module.exports = {
    name: 'invite',
    description: 'Get helpful links and invite the bot to your own server',
    usage: 'invite',
    cooldown: '0',
    execute (message) {
        const embed = new MessageEmbed()
            .setTitle('Invite')
            .setDescription('Get helpful links and invite the bot to your own server')
            .setColor(embedColor);

            const buttons = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setURL('https://skyebot.weebly.com')
                    .setLabel('Official Website')
                    .setStyle('LINK'))
                .addComponents(new MessageButton()
                    .setURL('https://github.com/yewshanooi/skye')
                    .setLabel('Code Repository')
                    .setStyle('LINK'))
                .addComponents(new MessageButton()
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=531811937244151808&permissions=261993005047&scope=bot%20applications.commands')
                    .setLabel('OAuth2 Invite')
                    .setStyle('LINK'));

        message.channel.send({ embeds: [embed], components: [buttons] });
    }
};