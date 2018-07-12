const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require("fs");
const mysql = require("mysql");

const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir("./cmd/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("no commands to load!");
			return;
	}
	console.log(`Loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {
		let props = require(`./cmd/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});


//mysql connection NOT WORKING AT THE MOMENT!
// var con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "ravenous86",
// 	database: "sadb"
// });

// con.connect(err => {
// 	if(err) throw err;
//	console.log("connected to database!");
// });
//end of mysql connection

bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);

	bot.setInterval(() => {
		for(let i in bot.mutes) {
			let time = bot.mutes[i].time;
			let guildId = bot.mutes[i].guild;
			let guild = bot.guilds.get(guildId);
			let member = guild.members.get(i);
			let mutedRole = guild.roles.find(r => r.name === "SADB Muted");
			if(!mutedRole) continue;

			if(Date.now() > time) {
				console.log(`${i} is now able to be unmuted!`);

				member.removeRole(mutedRole);
				delete bot.mutes[i];

				fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
					if(err) throw err;
					console.log(`i have unmuted ${member.user.tag}.`);
				});
			}
		}
	}, 5000)


	try{
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e) {
		console.log(e.stack);
	}
	});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(!command.startsWith(prefix)) return;

	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, message, args);

	});


bot.login(botSettings.token);