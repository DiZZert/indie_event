( function( $ ) {

    var genresArray =
     '[{"name": "долгие","pic": "dolgie", "games": ["Subnautica", "Outer Wilds", "Kingdom Come", "My Summer Car", "Pathologic 2"]},'+
     '{"name": "глубокие","pic": "glubokie",  "games": ["Finding Paradise", "Sally Face", "The Forgotten City", "What Remains of Edith Finch", "The Hex"]},'+
     '{"name": "хоррор","pic": "horror"},'+
     '{"name": "интерактив","pic": "interaktiv"},'+
     '{"name": "культовые","pic": "kultovie"},'+
     '{"name": "метроидвания","pic": "metroidv"},'+
     '{"name": "платформер","pic": "platform"},'+
     '{"name": "паззл","pic": "puzzle"},'+
     '{"name": "роглайк","pic": "roguelike"},'+
     '{"name": "шутер","pic": "shooter"},'+
     '{"name": "сложные","pic": "slognie"},'+
     '{"name": "интеграция","pic": "integration"},'+
     '{"name": "юмор","pic": "jumor"},'+
     '{"name": "мемы","pic": "meme"},'+
     '{"name": "АА инди","pic": "aaindi"},'+
     '{"name": "саундтрек","pic": "soundtrack"},'+
     '{"name": "random","pic": "random"}]';

     var jsonGenres = jQuery.parseJSON(genresArray);

     function doGamesList(data) {
       $('.gamesList').empty();

      for ( let i = 0; i < jsonGenres[data].games.length; i++ ) {
         $( '<div>', {class: 'games' + i} )
         .html( `<span>` + jsonGenres[data].games[i] + `</span>` ).appendTo( $( '.gamesList' ) )
       }
     }

     function getRandom() {
       return  Math.floor(Math.random() * (jsonGenres.length - 1 - 0) + 0);
     }

     function doGenreList(data) {
       const $genreIconsClass = $( '.genre_icons' );

       for ( let i = 0; i < jsonGenres.length; i++ ) {
         $( '<div>', {class: 'icon' + i} )
         .html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Aktiv.png" width="66" height="76"> </span>` ).appendTo( $genreIconsClass )
          .mousedown(function(e){
            switch(e.which) {
              case 1:
                if (jsonGenres[i].name == "random") {
                  let randomGenre = getRandom();
                  $("#genreName").text(jsonGenres[randomGenre].name);
                  doGamesList(randomGenre);
                } else {
                  $("#genreName").text(jsonGenres[i].name);
                  doGamesList(i);
                }
              break;
              case 2:
                $( '.icon' + i ).html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Neaktiv.png" width="66" height="76"> </span>` )
              break;
              case 3:
                document.oncontextmenu = function() {return false;};
                console.log("right on " + jsonGenres[i].name);
                $( '.icon' + i ).html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Aktiv.png" width="66" height="76"> </span>` )
              break;
            }
            return true;
});
       }
     }

     doGenreList(jsonGenres);

} )( jQuery );
