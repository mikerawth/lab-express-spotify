const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');


// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');



const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

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

app.get('/artists', (req, res, next) => {
  spotifyApi.searchArtists(req.query.artistSearch)
    .then(data => {
      console.log("The received data from the API: ", data.body.artists.items[0].images[0].url);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      res.render('artists', { artistObject: data.body.artists.items })
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
})

app.get('/albums', (req, res, next) => {
  spotifyApi.getArtistAlbums(req.query.artistID)
    .then(data => {
      // res.send(data.body.items[0].images);
      res.render('albums', { albumObject: data.body.items })
    })
    .catch(err => {
      console.log("The error while searching albums occurred: ", err);
    })
})




app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
