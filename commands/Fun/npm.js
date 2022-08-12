const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('npm')
        .setDescription('Search the npm registry for a package information')
        .addStringOption(option => option.setName('package').setDescription('Enter a package name').setRequired(true)),
    cooldown: '5',
    category: 'Fun',
    guildOnly: false,
    async execute (interaction) {
        const packageField = interaction.options.getString('package');

        const Npm = await fetch(`https://registry.npmjs.com/${packageField}`)
            .then(res => res.ok && res.json())
            .catch(() => null);

            if (!Npm) return interaction.reply({ content: 'Error: No such package found with that name.' });

        const version = Npm.versions[Npm['dist-tags'].latest];

        let deps = version.dependencies ? Object.keys(version.dependencies) : null;
        let maintainers = Npm.maintainers.map(user => user.name);

            if (maintainers.length > 10) {
                const len = maintainers.length - 10;
                maintainers = maintainers.slice(0, 10);
                maintainers.push(`...${len} more.`);
            }

            if (deps && deps.length > 10) {
                const len = deps.length - 10;
                deps = deps.slice(0, 10);
                deps.push(`...${len} more.`);
            }

        const embed = new EmbedBuilder()
            .setTitle(`${packageField}`)
            .setDescription(`${Npm.description || 'No Description'}`)
            .addFields(
                { name: 'Version', value: `\`${Npm['dist-tags'].latest}\``, inline: true },
                { name: 'License', value: `\`${Npm.license || 'None'}\``, inline: true },
                { name: 'Author', value: `\`${Npm.author ? Npm.author.name : 'Unknown'}\``, inline: true },
                { name: 'Dependencies', value: `\`${deps && deps.length ? deps.join(', ') : 'None'}\`` }
            )
            .setFooter({ text: 'Powered by npm' })
            .setColor('#cc3534');

            const button = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setURL(`https://npmjs.com/package/${packageField}`)
                    .setLabel('View package')
                    .setStyle('Link'));

            return interaction.reply({ embeds: [embed], components: [button] });
        }
};