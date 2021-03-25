const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../config.json');

module.exports = {
    name: 'uptime',
    description: 'Shows current uptime of Bot',
    cooldown: '5',
    execute (message) {
        let totalSeconds = message.client.uptime / 1000;
        const days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const embed = new MessageEmbed()
           .setTitle('Bot Uptime')
           .setDescription(`Days : \`${days}\`\n Hours : \`${hours}\`\n Minutes : \`${minutes}\`\n Seconds : \`${seconds}\``)
           .setColor(embedColor);
       message.channel.send(embed);
    }
};