require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const bobBotID = process.env.BOT_ID;

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent   
    ]
});
  
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.mentions.users.get(bobBotID) != undefined) {
        if (message.content.toLowerCase() === (`<@${bobBotID}> hello`)) {
            message.reply("You talkin' to me?");
        }
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
            
        case 'roll':
            command_roll(interaction);
            break;
            
        case 'save':
            command_saving(interaction);
            break;
        
        case 'ability_check':
            command_ability(interaction);
            break;

        default:
            break;
    }
});

function command_roll(interaction) {
    const dice = interaction.options.get('dice').value;
    const sides = interaction.options.get('sides').value;
    const private = interaction.options.get('private')?.value;
    const values = [];
    let sum = 0;

    for (let die = 0; die < dice; die++) {
        const value = Math.floor(Math.random() * sides) + 1;
        values.push(value);
        sum += value;
    }

    interaction.reply({
        content: `You rolled a total of... ${sum}! \n${dice} Dice: ${values.join(', ')}`,
        ephemeral: private,
    });
}

function command_saving(interaction) {
    const modifier = interaction.options.get('modifier').value;
    const save_type = interaction.options.get('save_type').value;
    const private = interaction.options.get('private')?.value;

    // roll 2 dice
    let roll1 = Math.floor(Math.random() * 20) + 1;
    let roll2 = Math.floor(Math.random() * 20) + 1;

    const userName = interaction.user.username;

    function rollDice(interaction) {
        // check for type of interaction
        const advantage = interaction.options.get('advantage')?.value;
        const disadv = interaction.options.get('disadvantage')?.value;
    
        if (advantage === true) {
            // Advantage: Take the higher roll
            return Math.max(roll1, roll2);
        } else if (disadv === true) {
            // Disadvantage: Take the lower roll
            return Math.min(roll1, roll2);
        } else {
            // Normal roll: Just return one roll
            return roll1;
        }
    };
    
    let rollResult = rollDice(interaction);

    const total = rollResult + modifier;
    const diceInfo = `Dice: ${rollResult} (${roll1}, ${roll2}) + ${modifier} (modifier)`;
    let resultType = '';

    if (rollResult === 20) {
        resultType = 'a Natural 20!';
    } else if (rollResult === 1) {
        resultType = 'a Critical Fail!';
    }

    interaction.reply({
        content: `${userName}'s ${save_type} saving throw is... ${total}${resultType ? ' ' + resultType : ''}. \n${diceInfo}`,
        ephemeral: private,
    });
}

function command_ability(interaction) {
    const modifier = interaction.options.get('modifier').value;
    const proficiency = interaction.options.get('proficiency').value;
    const ability_type = interaction.options.get('ability_type').value;
    const private = interaction.options.get('private')?.value;

    // roll 2 dice
    let roll1 = Math.floor(Math.random() * 20) + 1;
    let roll2 = Math.floor(Math.random() * 20) + 1;

    const userName = interaction.user.username;

    function rollDice(interaction) {
        // check for type of interaction
        const advantage = interaction.options.get('advantage')?.value;
        const disadv = interaction.options.get('disadvantage')?.value;
    
        if (advantage === true) {
            // Advantage: Take the higher roll
            return Math.max(roll1, roll2);
        } else if (disadv === true) {
            // Disadvantage: Take the lower roll
            return Math.min(roll1, roll2);
        } else {
            // Normal roll: Just return one roll
            return roll1;
        }
    };

    let rollResult = rollDice(interaction);

    const total = rollResult + modifier + proficiency;
    const diceInfo = `Dice: ${rollResult} (${roll1}, ${roll2}) + ${modifier} (modifier) + ${proficiency} (proficiency)`;
    let resultType = '';

    if (rollResult === 20) {
        resultType = 'a Natural 20!';
    } else if (rollResult === 1) {
        resultType = 'a Critical Fail!';
    }

    interaction.reply({
        content: `${userName}'s ${ability_type} ability check is... ${total}${resultType ? ' ' + resultType : ''}. \n${diceInfo}`,
        ephemeral: private,
    });
}

client.login(process.env.TOKEN);