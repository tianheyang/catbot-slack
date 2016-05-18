# Catbot for Slack
![demo](http://i.imgur.com/rj2yux8.gif)

[It has been demonstrated](http://www.livescience.com/23515-cute-animal-images-boost-work-performance.html) that viewing images of cats can improve productivity in the workplace. Catbot brings to your Slack team the finest artisanal cat gifs curated by [edgecats.net](https://github.com/flores/moarcats) and up-to-date cat facts from [catfacts-api](http://catfacts-api.appspot.com/), helping you achieve zen-like focus on the tasks at hand.

## Installation and usage
1. Deploy the app using the Heroku deploy button below, or via your host of choice
2. [Add a new bot integration](https://my.slack.com/services/new/bot) to your Slack team
3. If using the Heroku deploy button, simply copypasta the bot token generated from step 2 into the `BOT_TOKEN` environment variable field, and set the `DEBUG` environment variable to `false`. You should now be able to request a `gif` or a `cat fact` from Catbot.
4. Executing the app locally or on an alternative host requires [Node.js](https://nodejs.org). Once Node.js has been installed, download Catbot's helper packages by running `npm install` in the project root directory, create a `.env` file with your `BOT_TOKEN` and a `DEBUG` variable, and start the app with `npm start`.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
