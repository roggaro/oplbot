const agree = "✅";
const disagree = "❎"

module.exports.run = async (bot, message, args) => {

	let msg = await message.channel.send("STEM NÅ!");
		await msg.react(agree);
		await msg.react(disagree);

	const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 15000});
	message.channel.send(`Avstemning komplett! \nResultatet er som følger: \n${agree}: ${reactions.get(agree).count-1}\n${disagree}: ${reactions.get(disagree).count-1}`);

}

module.exports.help = {
	name: "vote"
}