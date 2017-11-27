const GoogleURL = require( 'google-url' );
googleUrl = new GoogleURL( { key: 'AIzaSyDbNqAiqdRZT-n5EeTC79O4nQUZLpt1ggc' });

function shortUrl(alamat) {
  googleUrl.shorten( alamat, function( err, Url ) {
   if(!err){
     return Url
   } else {
     console.log(err);
   }
  } );
}


module.exports = shortUrl;
