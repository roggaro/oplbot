module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have permission to do this!");

		let rolez = message.content;
		if(!rolez) return message.channel.send("you did not specify a ID!");

		let role = message.guild.roles.find(r => r.name === rolez);
}

module.exports.help = {
	name: "addrole"
}