require('dotenv').config();
if (!process.env.BOT_TOKEN) {
	console.log('Error: Specify token in environment');
	process.exit(1);
}

// Variables
var Botkit = require('botkit');
var os = require('os');
var rp = require('request-promise');
var edgecatsService = {
	uri: 'http://edgecats.net/random'
};
var catfactsService = {
	uri: 'http://catfacts-api.appspot.com/api/facts'
};
var iconEmojis = [':smile_cat:',':joy_cat:',':smiley_cat:',':cat:'];
var controller = Botkit.slackbot({
	debug: true,
});
var bot = controller.spawn({
	token: process.env.BOT_TOKEN
}).startRTM();

// Helpers
var randomElement = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {
	bot.api.reactions.add({
		timestamp: message.ts,
		channel: message.channel,
		name: 'cat',
	}, function(err, res) {
		if (err) {
			bot.botkit.log('Failed to add emoji reaction :(', err);
		}
	});

	if (message.user && message.user.name) {
		bot.reply(message, 'hai ' + user.name + '.');
	} else {
		bot.reply(message, 'o hai.');
	}
});

controller.hears(['gif','gifs','image','picture','gifme'], 'direct_message,direct_mention,mention', function(bot, message) {
	var userName = message.user.name;
	var catPromise = rp(edgecatsService);
	var messages = ['check out dis kitteh.','ur gif r ready.','you can haz.','moar kittehz?'];
	var goodbyes = ['', ' kthxbai.',' bai.'];
	var botPayload = {
		"username" : "catbot",
		"response_type": "in_channel",
		"icon_emoji" : randomElement(iconEmojis)
	};

	catPromise.then(function (catGif) {
		// Process html...
		botPayload.text = randomElement(messages) + randomElement(goodbyes);
		botPayload.attachments = [{
			"fallback": "Kitteh",
			"image_url": catGif
		}];
		bot.reply(message, botPayload);
	})
	.catch(function (err) {
		// Crawling failed...
		bot.reply(message, "Couldn't get a cat gif right meow :(");
	});
});

controller.hears(['fact','facts','factme'], 'direct_message,direct_mention,mention', function(bot, message) {
	var factPromise = rp(catfactsService);
	var botPayload = {
		"username" : "catbot",
		"response_type": "in_channel",
		"icon_emoji" : ":information_source:"
	};

	factPromise.then(function (catFact) {
		var factObject = JSON.parse(catFact);
		botPayload.text = factObject.facts[0];
		bot.reply(message, botPayload);
	}).catch(function (err) {
		// Crawling failed...
		bot.reply(message, "Couldn't get a cat fact right meow :(");
	});
});
