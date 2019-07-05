const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');


// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');



const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:
const clientId = '6d07cfac048840f49487239e6c0a5a1a',
  clientSecret = '9d659c2bfb544741a5bf48382e01e62f';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })

app.use(bodyParser.urlencoded({ extended: true }));




// the routes go here:
app.get('/', (req, res, next) => {
  res.render('home')
})



app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
