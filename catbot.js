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
	var greetings = ['','O hai ' + userName + ', ',userName + ', '];
	var messages = ['ur gif r ready.','i liek dis gif.','you can haz kitteh.','srsly kyoot kittehz.','dis iz so funneh.','moar kittehz.'];
	var goodbyes = ['', ' kthxbai.'];
	var catPromise = rp(edgecatsService);

	catPromise.then(function (htmlString) {
		// Process html...
		var botPayload = {
			"username" : "catbot",
			"channel" : req.body.channel_id,
			"icon_emoji" : ":smile_cat:",
			//text : randomMessage(greetings) + randomMessage(messages) + randomMessage(goodbyes),
			"attachments": [
				{
					"fallback": "Kitteh",
					"pretext": randomMessage(greetings) + randomMessage(messages) + randomMessage(goodbyes),
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
