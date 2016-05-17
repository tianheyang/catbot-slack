var rp = require('request-promise');
var edgecatsService = {
	uri: 'http://edgecats.net/random'
};
var catfactsService = {
	uri: 'http://catfacts-api.appspot.com/api/facts'
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
	var botPayload = {
		"username" : "catbot",
		"channel" : req.body.channel_id,
		"icon_emoji" : randomMessage(iconEmojis)
	};

	switch(req.url) {
		case '/getcat':
			var catPromise = rp(edgecatsService);
			var greetings = ['','o hai, ', 'hai, ','o hai ' + userName + ', ', 'hai ' + userName + ', '];
			var messages = ['check out dis kitteh.','ur gif r ready.','you can haz.','moar kittehz?'];
			var goodbyes = ['', ' kthxbai.',' bai.'];

			catPromise.then(function (catGif) {
				// Process html...
				botPayload.text = randomMessage(greetings) + randomMessage(messages) + randomMessage(goodbyes);
				botPayload.attachments = [{
					"fallback": "Kitteh",
					"image_url": catGif
				}];
				buildResponse(res, userName, botPayload);
			})
			.catch(function (err) {
				// Crawling failed...
				return res.status(200).send(err);
			});
			break;
		case '/getfact':
			var factPromise = rp(catfactsService);
			factPromise.then(function (catFact) {
				var factObject = JSON.parse(catFact);
				botPayload.text = factObject.facts[0];
				buildResponse(res, userName, botPayload);
			})
			.catch(function (err) {
				return res.status(200).send(err);
			});
			break;
	}
}
