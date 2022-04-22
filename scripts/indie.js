( function( $ ) {

    var genresArray =
     '[{"name": "долгие","pic": "dolgie", "games": ["Subnautica", "Desperados III", "Kingdom Come Deliverance", "Hollow Knight", "Darkest Dungeon", "Loop Hero"]},'+
     '{"name": "глубокие","pic": "glubokie",  "games": ["The Vanishing of Ethan Carter", "Night in the Woods", "The Red Strings Club", "The Beginner`s Guide", "Death and Taxes", "LISA: The Painfull"]},'+
     '{"name": "хоррор","pic": "horror", "games": ["At Dead Of Night", "Among the Sleep", "Detention", "Outlast", "The Witch`s House MV", "Summer of 58"]},'+
     '{"name": "экшн игры","pic": "action", "games": ["Death’s door", "Tunic", "Alien Shooter", "Ape Out", "Nobody Saves the World", "Shank"]},'+
     '{"name": "культовые","pic": "kultovie", "games": ["Papers, Please", "Undertale", "The Stanley Parable", "Brothers - A Tale of Two Sons", "Braid", "Harvester"]},'+
     '{"name": "метроидвания","pic": "metroidv", "games": ["Supraland Six Inches Under", "Ender Lilies: Quietus of the Knights", "Guacamelee! (STCE)", "The Messenger", "Axiom Verge", "Rogue Legacy 2"]},'+
     '{"name": "платформер","pic": "platform", "games": ["BattleBlock Theater", "Little Nightmares 2", "Guns, Gore and Cannoli 2", "Psychonauts", "Celeste", "Vector"]},'+
     '{"name": "роглайк","pic": "roguelike", "games": ["Dead Cells", "Inscryption", "Hades", "Enter the Gungeon", "Slay the Spire", "Binding of Isaac: Repentance"]},'+
     '{"name": "мемы","pic": "meme", "games": ["Pony Island", "The Hex", "Adventures of pepeL", "I Hate this Game", "Helltaker", "Montaro"]},'+
     '{"name": "шутер","pic": "shooter", "games": ["Bright Memory: Infinite", "SUPERHOT", "Terminator: Resistance", "Serious Sam: Siberian Mayhem", "Black Mesa", "Them and Us"]},'+
     '{"name": "интерактивные истории","pic": "interaktiv", "games": ["Her Story", "Tiny Bunny", "Do Not Feed the Monkeys", "Not For Broadcast", "Late Shift", "Who Pressed Mute on Uncle Marcus?"]},'+
     '{"name": "Хайден Гемы","pic": "hiddengem", "games": ["In Sound Mind", "Fearmonium", "The Artful Escape", "Bright Lights of Svetlov", "Sludge Life", "Inertial Drift"]},'+
     '{"name": "юмор","pic": "jumor", "games": ["Protocol", "Untitled Goose Game", "Sam & Max Save the World", "Breathedge", "Magicka", "Пилигримы"]},'+
     '{"name": "АА инди","pic": "aaindi", "games": ["Life is Strange", "KENA: Bridge of Spirits", "HITMAN 3", "Hellblade: Senua`s Sacrifice", "Ghostrunner", "A Plague Tale: Innocence"]},'+
     '{"name": "приключения","pic": "prikl", "games": ["Помни...", "A Story About My Uncle", "The Final Station", "Tails of Iron", "Hyper Light Drifter", "Road 96"]},'+
     '{"name": "саундтрек","pic": "soundtrack", "games": ["Furi", "Sayonara Wild Hearts", "Everhood", "Bastion", "198X", "DUSK"]},'+
     '{"name": "квесты","pic": "quest", "games": ["Rusty Lake: Roots", "Creepy Tale 2", "Superliminal", "Edna & Harvey The Breakout", "Forgotten City", "Fran Bow"]},'+
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
                  $('.gamesList').empty();

                  $( '.genre_icons > div' ).removeClass('glowEffect');
                  let randomGenre = getRandom();
                  let fromArrayIndex = $.inArray(genresActiveArray[randomGenre], jsonGenres);

                  $("#genreName").addClass('spin');
                  setTimeout(function(){
                    $("#genreName").removeClass('spin');
                    $("#genreName").text(genresActiveArray[randomGenre].name);
                    $('.icon' + fromArrayIndex).addClass('glowEffect');
                    doGamesList(fromArrayIndex);
                  }, 3000);

                } else {
                  $("#genreName").text(jsonGenres[i].name);
                  doGamesList(i);
                }
              break;
              case 2:
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
       for (var i = 0; i < 6; i++) {
         greyArray.push(i);
       }

       console.log(greyArray);
       greyArray.splice(Math.floor((Math.random() * (4 - 0) + 0)), 1);
       greyArray.sort(() => Math.random() - 0.5);
     }

     $("#genreName").click(function() {
         positionsList();
         for (var i = 0; i < 5; i++) {
           makeGrey(i);
         }
     });

     function makeGrey(i){
       setTimeout(function() {
         $('.game_' + greyArray[i]).addClass('greyPosition');
         playSound("activate");
       }, ( (i+1) *1200) * i);
     }

     doGenreList(jsonGenres);

} )( jQuery );
