( function( $ ) {

    var genresArray =
     '[{"name": "долгие","pic": "dolgie", "games": ["Subnautica", "Desperados III", "Disco Elysium", "Pathologic 2", "Hollow Knight"]},'+
     '{"name": "глубокие","pic": "glubokie",  "games": ["The Vanishing of Ethan Carter", "What Remains of Edith Finch", "The Red Strings Club", "The Beginner’s Guide", "OneShot"]},'+
     '{"name": "хоррор","pic": "horror", "games": ["Summer of 58", "Yuppie Psycho", "Among the Sleep", "Detention", "Happy Game"]},'+
     '{"name": "экшн игры","pic": "action", "games": ["Death’s door", "Elderborn", "Alien Shooter", "Ape Out", "Chernobylite"]},'+
     '{"name": "культовые","pic": "kultovie", "games": ["Papers, Please", "Undertale", "The Stanley Parable", "Brothers - A Tale of Two Sons", "Braid"]},'+
     '{"name": "метроидвания","pic": "metroidv", "games": ["Ori and the Will of the Wisps", "Ender Lilies: Quietus of the Knights", "Fearmonium", "F.I.S.T.: Forged In Shadow Torch", "Valfaris"]},'+
     '{"name": "платформер","pic": "platform", "games": ["Child of Light", "Little Nightmares 2", "Pumpkin Jack", "Psychonauts", "A Story About My Uncle"]},'+
     '{"name": "роглайк","pic": "roguelike", "games": ["Dead Cells", "Inscryption", "Hades", "BPM: Bullets Per Minute", "Ziggurat 2"]},'+
     '{"name": "мемы","pic": "meme", "games": ["Mercury Man", "Montaro", "Adventures of pepeL", "I Hate this Game", "Helltaker"]},'+
     '{"name": "шутер","pic": "shooter", "games": ["Bright Memory: Infinite", "SUPERHOT", "Shadow Warrior 2", "Serious Sam: The First Encounter", "Black Mesa"]},'+
     '{"name": "интерактивные истории","pic": "interaktiv", "games": ["Her Story", "Death and Taxes", "Road 96", "Not For Broadcast", "Late Shift"]},'+
     '{"name": "Хайден Гемы","pic": "hiddengem", "games": ["In Sound Mind", "Inertial Drift", "A Juggler’s Tale", "Bright Lights of Svetlov", "Sludge Life"]},'+
     '{"name": "юмор","pic": "jumor", "games": ["Protocol", "Untitled Goose Game", "Pony Island", "Breathedge", "There Is No Game: Wrong Dimension"]},'+
     '{"name": "АА инди","pic": "aaindi", "games": ["Life is Strange", "KENA: Bridge of Spirits", "Outlast", "Hellblade: Senua’s Sacrifice", "Terminator: Resistance"]},'+
     '{"name": "приключения","pic": "prikl", "games": ["Tails of Iron", "Grimm’s Hollow", "Sally Face", "The Banner Saga", "LISA: The Painfull"]},'+
     '{"name": "саундтрек","pic": "soundtrack", "games": ["Furi", "Ruiner", "Everhood", "Bastion", "198X"]},'+
     '{"name": "квесты","pic": "quest", "games": ["Rusty Lake: Roots", "Grim Fandango", "Superliminal", "Sherlock Holmes: Crimes and Punishments", "Forgotten City"]},'+
     '{"name": "random","pic": "random"}]';

     var genresActiveArray = [];

     var jsonGenres = jQuery.parseJSON(genresArray);

     function playSound(name) {
       var soundFile = document.createElement("audio");
       soundFile.src = "assets/sounds/" + name + ".mp3";
       soundFile.play();
    }

     function doGamesList(data) {
       $('.gamesList').empty();

      for ( let i = 0; i < jsonGenres[data].games.length; i++ ) {
         $( '<div>', {class: 'game_' + i} )
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

     var clickedText = new Boolean(false);

     function doGenreList(data) {
       const $genreIconsClass = $( '.genre_icons' );

       for ( let i = 0; i < jsonGenres.length; i++ ) {
         $( '<div>', {class: 'icon' + i} )
         .html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Neaktiv.png" width="66" height="76"> </span>` ).appendTo( $genreIconsClass )
          .mousedown(function(e){
            switch(e.which) {
              case 1:
                if (jsonGenres[i].name == "random") {
                  // console.log(genresActiveArray);
                  let randomGenre = getRandom();
                  // console.log(randomGenre);
                  $("#genreName").text(genresActiveArray[randomGenre].name);
                  doGamesList($.inArray(genresActiveArray[randomGenre], jsonGenres));
                } else {
                  $("#genreName").text(jsonGenres[i].name);
                  doGamesList(i);
                }
              break;
              case 2:
                $('.icon' + i).addClass('glowEffect');
                genresActiveArray.push(jsonGenres[i]);
                console.log(jsonGenres[i]);
                console.log(genresActiveArray);
                $( '.icon' + i ).html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Aktiv.png" width="66" height="76"> </span>` )
                playSound("activate");
              break;
              case 3:
                $('.icon' + i).removeClass('glowEffect');
                document.oncontextmenu = function() {return false;};
                console.log(jsonGenres[i]);
                if ($.inArray(jsonGenres[i], genresActiveArray) != -1 ) {
                  console.log("удаляем из массива");
                  genresActiveArray.splice($.inArray(jsonGenres[i], genresActiveArray), 1);
                } else {
                  console.log("нет в массиве");
                }
                console.log(genresActiveArray);
                $( '.icon' + i ).html( `<span> <img src="assets/icons/` + jsonGenres[i].pic + `Neaktiv.png" width="66" height="76"> </span>` )
                playSound("deactivate");
              break;
            }
            return true;
          });
       }
     }

     var greyArray = [];

     function positionsList() {
       greyArray = [];
       for (var i = 0; i < 5; i++) {
         greyArray.push(i);
       }

       console.log(greyArray);
       greyArray.splice(Math.floor((Math.random() * (4 - 0) + 0)), 1);
       greyArray.sort(() => Math.random() - 0.5);
     }

     $("#genreName").click(function() {
         positionsList();
         for (var i = 0; i < 4; i++) {
           makeGrey(i);
         }
     });

     function makeGrey(i){
       setTimeout(function() {
         $('.game_' + greyArray[i]).addClass('greyPosition');
         playSound("activate");
       }, ( (i+1) *1500) * i);
     }

     doGenreList(jsonGenres);

} )( jQuery );
