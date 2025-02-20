const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giphy')
        .setDescription('Search Giphy for a GIF')
        .addStringOption(option => option.setName('query').setDescription('Enter a query').setRequired(true)),
    cooldown: '5',
    category: 'Fun',
    guildOnly: false,
    async execute (interaction) {
        if (!process.env.GIPHY_API_KEY) return interaction.reply({ embeds: [global.errors[1]] });

        const queryField = interaction.options.getString('query');

        const randomGif = Math.floor(Math.random() * 19);

        const Gif = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${encodeURIComponent(queryField)}&limit=1&offset=${randomGif}`)
            .then(res => res.json())
            .then(body => body.data[0]);

            if (!Gif) return interaction.reply({ content: 'Error: No results found.' });

            const embed = new EmbedBuilder()
                .setTitle(`${Gif.title}`)
                .setImage(`${Gif.images.original.url}`)
                .setFooter({ text: 'Powered by Giphy' })
                .setColor('#000000');

            return interaction.reply({ embeds: [embed] });
        }
};