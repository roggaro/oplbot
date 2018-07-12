const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to do this!");

		let msgID = message.content;
		if(!msgID) return message.channel.send("you did not specify a channel!");

		fs.writeFile("./setchannel.json", JSON.stringify(message.content, null, 4), err=> {
		if(err) throw err;
		message.channel.send("channel saved!");
	});
}


module.exports.help = {
	name: "setchannel"
}