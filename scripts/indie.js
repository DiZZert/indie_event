( function( $ ) {

    var genresArray =
     '[{"name": "долгие","pic": "long", "games": ["Subnautica", "Outer Wilds", "Kingdom Come", "My Summer Car", "Pathologic 2", "Hollow Knight"]},'+
     '{"name": "глубокие","pic": "deep",  "games": ["Finding Paradise", "Sally Face", "The Forgotten City", "What Remains of Edith Finch", "The Hex", "Brothers - A Tale of Two Sons", "Detention"]},'+
     '{"name": "хоррор","pic": "horror"},'+
     '{"name": "интерактив","pic": "interactive"},'+
     '{"name": "культовые","pic": "kult"},'+
     '{"name": "метроидвания","pic": "metro"},'+
     '{"name": "платформер","pic": "long"},'+
     '{"name": "паззл","pic": "long"},'+
     '{"name": "роглайк","pic": "long"},'+
     '{"name": "шутер","pic": "long"},'+
     '{"name": "сложные","pic": "long"},'+
     '{"name": "интеграция","pic": "long"},'+
     '{"name": "юмор","pic": "long"},'+
     '{"name": "мемы","pic": "long"},'+
     '{"name": "АА инди","pic": "long"},'+
     '{"name": "саундтрек","pic": "long"},'+
     '{"name": "random","pic": "long"}]';

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
         .html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `_active.png" width="66" height="76"> </span>` ).appendTo( $genreIconsClass )
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
                $( '.icon' + i ).html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `_inactive.png" width="66" height="76"> </span>` )
              break;
              case 3:
                document.oncontextmenu = function() {return false;};
                console.log("right on " + jsonGenres[i].name);
                $( '.icon' + i ).html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `_active.png" width="66" height="76"> </span>` )
              break;
            }
            return true;
});
       }
     }

     doGenreList(jsonGenres);

} )( jQuery );
