module.exports = {
	name: 'message',
	description: 'Sends a private message to the user specified',
	execute (message, args) {
        let msg = '';
        args.forEach(element => {
            msg += ` ${element}`;
        });
        message.mentions.users.first().send(msg);
        message.delete();
	}
};