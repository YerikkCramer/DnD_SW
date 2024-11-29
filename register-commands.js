require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'roll',
        description: 'Rolls dice.',
        options: [
            {
                name: 'dice',
                description: 'The number of dice.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'sides',
                description: 'The number of sides.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'private',
                description: 'Do a private roll.',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            }
        ]
    },
    {
        name: 'save',
        description: 'Make a saving throw.',
        options: [
            {
                name: 'save_type',
                description: 'Type of Saving throw.',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'Strength',
                        value: 'Strength',
                    },
                    {
                        name: 'Dexterity',
                        value: 'Dexterity',
                    },
                    {
                        name: 'Constitution',
                        value: 'Constitution',
                    },
                    {
                        name: 'Intelegence',
                        value: 'Intelegence',
                    },
                    {
                        name: 'Wisdom',
                        value: 'Wisdom',
                    },
                    {
                        name: 'Charisma',
                        value: 'Charisma',
                    },
                    {
                        name: 'Death Saving Throw',
                        value: 'Death Saving Throw',
                    },
                ],
                required: true,
            },
            {
                name: 'modifier',
                description: 'Your saving throw modifier.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'advantage',
                description: 'Roll twice and take the higher value.',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
            {
                name: 'disadvantage',
                description: 'Roll twice and take the lower value.',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
            {
                name: 'private',
                description: 'Do a private roll.',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            }
        ]
    },
    {
        name: 'ability_check',
        description: 'Make an ability check.',
        options: [
            {
                name: 'ability_type',
                description: 'Type of Saving throw.',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'Athletics',
                        value: 'Athletics',
                    },
                    {
                        name: 'Acrobatics',
                        value: 'Acrobatics',
                    },
                    {
                        name: 'Sleight of Hand',
                        value: 'Sleight of Hand',
                    },
                    {
                        name: 'Stealth',
                        value: 'Stealth',
                    },
                    {
                        name: 'Arcana',
                        value: 'Arcana',
                    },
                    {
                        name: 'History',
                        value: 'History',
                    },
                    {
                        name: 'Investigation',
                        value: 'Investigation',
                    },
                    {
                        name: 'Nature',
                        value: 'Nature',
                    },
                    {
                        name: 'Religion',
                        value: 'Religion',
                    },
                    {
                        name: 'Animal Handling',
                        value: 'Animal Handling',
                    },
                    {
                        name: 'Insight',
                        value: 'Insight',
                    },
                    {
                        name: 'Medicine',
                        value: 'Medicine',
                    },
                    {
                        name: 'Perception',
                        value: 'Perception',
                    },
                    {
                        name: 'Survival',
                        value: 'Survival',
                    },
                    {
                        name: 'Deception',
                        value: 'Deception',
                    },
                    {
                        name: 'Intimidation',
                        value: 'Intimidation',
                    },
                    {
                        name: 'Performance',
                        value: 'Performance',
                    },
                    {
                        name: 'Persuasion',
                        value: 'Persuasion',
                    },
                ],
                required: true,
            },
            {
                name: 'modifier',
                description: 'Your ability modifier.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'proficiency',
                description: 'Your proficiency bonus.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'advantage',
                description: 'Roll twice and take the higher value.',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
            {
                name: 'disadvantage',
                description: 'Roll twice and take the lower value.',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
            {
                name: 'private',
                description: 'Do a private roll.',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            }
        ]
    },
];


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering Slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Slash commands were registered successfully!');

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();