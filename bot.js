// Include the dependencies
var request = require('request');
var Discord = require('discord.io');

// Initalize the discord client 
var bot = new Discord.Client({
    token: "<YOUR BOT APP USER TOKEN>",
    autorun: true
});

// Notify the server/host when the client is ready for incoming messages
bot.on('ready', function() {
    console.log("It's alive....");
    console.log(bot.username + " - (" + bot.id + ")");
});

// Listen to the 'message' event on the channel and determine if we should pull a gif
bot.on('message', function(user, userID, channelID, message, event) {

	// convert the message to lower case so we can accept 'gif, GIF, Gif, etc..'
	message = message.toLowerCase()
	
	if (message.startsWith("gif"))
	{	
		// strip off 'gif' from the message and that'll be the search term
		var term = message.substring(3);
		term = encodeURI(term)

		// make a request to giphy with the search term
		// we can also set the raiting 
		request('http://api.giphy.com/v1/gifs/search?q=' + term + '&rating=r&api_key=dc6zaTOxFJmzC', function (error, response, body) {
		  if (!error && response.statusCode == 200) {

		  	content =  JSON.parse(body)

		  	// giphy returns several results so we can grab a random result by generating a random index
		  	// random number between 0 and 10
		  	item = Math.floor(Math.random() * 10)

		  	// reply to the channel by sending a message (image url)
		    bot.sendMessage({
	            to: channelID,
	            message: content.data[item].images.fixed_height.url
	        });
		  }
		})
    }
});