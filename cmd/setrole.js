module.exports.run = async (bot, message, args) => {


/*const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
}; */

// On message
client.on('message', (msg) => {
    // Is the sender a bot? If it is, cancel
    if(msg.author.bot) return;

    // Check if information command was called
    if(msg.content === 'reaction-bot') {
        msg.channel.send({
            embed: {
                color: 0x37dbd0,
                author: {
                    name: client.user.name,
                    icon_url: client.user.avatarURL
                },
                title: 'Reaction bot by Moquo',
                url: 'https://github.com/Moquo/discord-reaction-bot',
                description: 'Reaction bot adds reactions to messages'
            }
        });
        return;
    }

    // React to the message
    if(config.rankCheck.enabled && !(msg.member.roles.some(role => config.rankCheck.roles.includes(role.name)))) return;
    msg.react(config.react_emoji);
});
 









}
module.exports.help = {
	name: "role"
}