var rp = require('request-promise');
var edgecatsService = {
	uri: 'http://edgecats.net/random'
};
var randomMessage = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};
var buildResponse = function(res, userName, payload) {
	// avoid infinite loop
	if (userName !== 'slackbot') {
		return res.status(200).json(payload);
	} else {
		return res.status(200).end();
	}
};

module.exports = function (req, res, next) {
	var userName = req.body.user_name;
	var iconEmojis = [':smile_cat:',':joy_cat:',':smiley_cat:',':cat:'];
	var greetings = ['','O hai, ', 'Hai, ','O hai ' + userName + ', ', 'Hai ' + userName + ', '];
	var messages = ['check out dis kitteh.','ur gif r ready.','you can haz.','moar kittehz?'];
	var goodbyes = ['', ' Kthxbai.',' Bai.'];
	var catPromise = rp(edgecatsService);

	catPromise.then(function (htmlString) {
		// Process html...
		var botPayload = {
			"username" : "catbot",
			"channel" : req.body.channel_id,
			"icon_emoji" : randomMessage(iconEmojis),
			"text" : randomMessage(greetings) + randomMessage(messages) + randomMessage(goodbyes),
			"attachments": [
				{
					"fallback": "Kitteh",
					"image_url": htmlString
				}
			]
		};
		buildResponse(res, userName, botPayload);
	})
	.catch(function (err) {
		// Crawling failed...
		return res.status(200).send(err);
	});
}
