( function( $ ) {

    var genresArray =
     '[{"name": "долгие","pic": "dolgie", "games": ["Subnautica", "Desperados III", "Disco Elysium", "Pathologic 2", "Hollow Knight"]},'+
     '{"name": "глубокие","pic": "glubokie",  "games": ["The Vanishing of Ethan Carter", "What Remains of Edith Finch", "The Red Strings Club", "The Beginner’s Guide", "OneShot"]},'+
     '{"name": "хоррор","pic": "horror", "games": ["Summer of 58", "Yuppie Psycho", "Among the Sleep", "Detention", "Happy Game"]},'+
     '{"name": "экшн игры","pic": "random", "games": ["Death’s door", "Elderborn", "Alien Shooter", "Ape Out", "Chernobylite"]},'+ //нет иконок
     '{"name": "культовые","pic": "kultovie", "games": ["Papers, Please", "Undertale", "The Stanley Parable", "Brothers - A Tale of Two Sons", "Braid"]},'+
     '{"name": "метроидвания","pic": "metroidv", "games": ["Ori and the Will of the Wisps", "Ender Lilies: Quietus of the Knights", "Fearmonium", "F.I.S.T.: Forged In Shadow Torch", "Valfaris"]},'+
     '{"name": "платформер","pic": "platform", "games": ["Child of Light", "Little Nightmares 2", "Pumpkin Jack", "Psychonauts", "A Story About My Uncle"]},'+
     '{"name": "приключения","pic": "random", "games": ["Tails of Iron", "Grimm’s Hollow", "Sally Face", "The Banner Saga", "LISA: The Painfull"]},'+ //нет иконок
     '{"name": "роглайк","pic": "roguelike", "games": ["Dead Cells", "Inscryption", "Hades", "BPM: Bullets Per Minute", "Ziggurat 2"]},'+
     '{"name": "шутер","pic": "shooter", "games": ["Bright Memory: Infinite", "SUPERHOT", "Shadow Warrior 2", "Serious Sam: The First Encounter", "Black Mesa"]},'+
     '{"name": "интерактивные истории","pic": "random", "games": ["Her Story", "Death and Taxes", "Road 96", "Not For Broadcast", "Late Shift"]},'+ //нет иконок
     '{"name": "Хайден Гемы","pic": "random", "games": ["In Sound Mind", "Inertial Drift", "A Juggler’s Tale", "Bright Lights of Svetlov", "Sludge Life"]},'+ //нет иконок
     '{"name": "юмор","pic": "jumor", "games": ["Protocol", "Untitled Goose Game", "Pony Island", "Breathedge", "There Is No Game: Wrong Dimension"]},'+
     '{"name": "мемы","pic": "meme", "games": ["Mercury Man", "Montaro", "Adventures of pepeL", "I Hate this Game", "Helltaker"]},'+
     '{"name": "АА инди","pic": "aaindi", "games": ["Life is Strange", "KENA: Bridge of Spirits", "Outlast", "Hellblade: Senua’s Sacrifice", "Terminator: Resistance"]},'+
     '{"name": "саундтрек","pic": "soundtrack", "games": ["Furi", "Ruiner", "Everhood", "Bastion", "198X"]},'+
     '{"name": "квесты","pic": "random", "games": ["Rusty Lake: Roots", "Grim Fandango", "Superliminal", "Sherlock Holmes: Crimes and Punishments", "Forgotten City"]},'+ //нет иконок
     '{"name": "random","pic": "random"}]';

     var genresActiveArray = [];

     var jsonGenres = jQuery.parseJSON(genresArray);

     function doGamesList(data) {
       $('.gamesList').empty();

      for ( let i = 0; i < jsonGenres[data].games.length; i++ ) {
         $( '<div>', {class: 'games' + i} )
         .html( `<span>` + jsonGenres[data].games[i] + `</span>` ).appendTo( $( '.gamesList' ) )
       }
     }

     let lastValue = -1;

     function getRandom() {
       randomValue = Math.floor(Math.random() * (genresActiveArray.length - 0) + 0);
       if (lastValue != randomValue) {
         console.log(lastValue + " " + randomValue);
         lastValue = randomValue;
         return randomValue;
       } else {
         return getRandom();
       }
     }

     function doGenreList(data) {
       const $genreIconsClass = $( '.genre_icons' );

       for ( let i = 0; i < jsonGenres.length; i++ ) {
         $( '<div>', {class: 'icon' + i} )
         .html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Neaktiv.png" width="66" height="76"> </span>` ).appendTo( $genreIconsClass )
          .mousedown(function(e){
            switch(e.which) {
              case 1:
                if (jsonGenres[i].name == "random") {
                  console.log(genresActiveArray);
                  let randomGenre = getRandom();
                  $("#genreName").text(genresActiveArray[randomGenre].name);
                  doGamesList(randomGenre);
                } else {
                  $("#genreName").text(jsonGenres[i].name);
                  doGamesList(i);
                }
              break;
              case 2:
                genresActiveArray.push(jsonGenres[i]);
                console.log(genresActiveArray);
                $( '.icon' + i ).html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Aktiv.png" width="66" height="76"> </span>` )
              break;
              case 3:
                document.oncontextmenu = function() {return false;};
                genresActiveArray.splice($.inArray(genresActiveArray[i], genresActiveArray), 1);
                console.log(genresActiveArray);
                $( '.icon' + i ).html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Neaktiv.png" width="66" height="76"> </span>` )
              break;
            }
            return true;
});
       }
     }

     doGenreList(jsonGenres);

} )( jQuery );
