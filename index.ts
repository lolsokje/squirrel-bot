import { Client, Intents, Message, MessageAttachment } from 'discord.js';
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('messageCreate', (message: Message) => {
	const attachments = message.attachments;

	if (attachments.size === 0) {
		return;
	}

	attachments.forEach((attachment: MessageAttachment) => {
		if (!attachment?.contentType?.startsWith('image/')) {
			const author = message.author;
			const channel = message.channel;
			message.delete();
			channel.send(`<@${author.id}> Your message was removed since it contains non-image attachments`);
		}
	});
});

client.login(token)
	.then(() => console.log('connected'));
