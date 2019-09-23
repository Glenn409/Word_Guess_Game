//
//All my arrays and variables needed throughout the project
//

var fighter_list = ['Nasus','Darius','Mordekaiser','Illaoi','Trundle','Olaf','Garen','Shyvana','Udyr','Volibear','Yorick','Vi','Nocturne', 'Pantheon','Warwick','irelia','Hecarim'];
var assassin_list = ['Zed','Fizz','Leblanc','Akali','Talon','Katarina','Kassadin','Shaco','Rengar'];
var mage_list =['Ryze','Swain','Rumble','Malzahar','Ziggs','Xerath','Cassiopeia'];
var support_list =['Janna','Nami','Morgana','Lulu','Bard','Zilean','Taric','Karma'];
var marksmen_list = ['Vayne','Caitlyn','Ashe','Corki','Draven','Jinx','Kalista','Lucian','Sivir','Tristana','Kindred','Ezreal','Twitch','Quinn','Jhin','Graves']

var array_list = [fighter_list,assassin_list,mage_list,support_list,marksmen_list];


var secret_song = document.getElementById('secret_word');
var underlines = document.getElementById('underlines');
var guesses = document.getElementById('guesses_remaining');
var start_button = document.getElementById('start_button');
var wrong_guesses_element = document.getElementById('user_wrong_guesses');
// var hidden_string = document.getElementById('hidden_string');
var wins_div = document.getElementById('wins');
var loses_div = document.getElementById('loses');


var guess_count = 12;
var wrong_guesses = [];
var wins = 0;
var loses =0;

// randomly selects song
function randomSong(song_array){
    return song_array[Math.floor((Math.random()*song_array.length))];
};

// gets length of secret_song and creates a _ _ _ _ _ for appropiate length
function underline_div(song){
    var song_array = []
    for (i=0;i<song.length;i++){
        song_array.push('_')
    }
    return song_array;
};
//Checks if letter is repeating 
function repeating(userPress,array){
    for(i=0;i < array.length; i++){
        if (userPress === array[i]){
            return true;
            break;
        }
    }
}
//takes the user's keypress as a guesss
function guess_check(keyPress,song){
    var x;
    //checks if letter is in word it returns true or false
    for(i=0;i<song.length;i++){
        if(keyPress === song[i]){
           // console.log(song[i]);
            x = true;
            break;
        } else {
            x = false;
        }
    }
    //if letter isnt in word it checks to see if user already guessed this letter and executes actions based on that
    if (x === false){
        if (!repeating(keyPress,wrong_guesses)){
            wrong_guesses.push(keyPress);
            guess_count = guess_count - 1;
            guesses.textContent = guess_count;
            wrong_guesses_element.textContent = wrong_guesses.join(' ');
        } else if (x === true){
            //
        }
    }
}
//function takes secret song and replaces it with spaces
function text_hidden(song){
    var song_array = [];
    for(i=0;i<song.length;i++){
        song_array.push('x');
    }
    return song_array;
}
//starts game with empty array for the user guesses
function starting_empty_song(song){
    var song_array = []
    for (i=0;i<song.length;i++){
        song_array.push('_')
    }
    return song_array;
};


//function changes hidden_string text if key press is a accurate guess
function change_hidden_letters(keyPress,song,array){
   // console.log(array);
    for (i = 0; i < song.length; i++){
        if(keyPress === song[i]){
            array[i] = keyPress;
        }
    }
    console.log(array);
    return array;
}
//checks the Hidden Song array to see if theres any blank spaces, if no Blank spaces returns a Win status for user;
function check_win(array){
    var win_status = false;
    for(i=0; i < array.length; i++){
        if(array[i] === '_'){
            win_status = false;
            break;
        } else if (array[i] != '_'){
            win_status = true
        };
    }
    return win_status;
}
//updates class hint
function champion_class_check(array){
    if (array === fighter_list){
        return ' Fighter';
    } else if (array === mage_list){
        return ' Mage';
    } else if (array === assassin_list){
        return " Assassin";
    } else if (array === support_list){
        return ' Support';
    } else if (array === marksmen_list){
        return " Marksmen";
    } else {
        return console.error('no class found');
        
    }
}

// starts the game
document.getElementById('start_button').addEventListener('click',function(){
    var class_list = array_list[Math.floor(Math.random()*array_list.length)];
    secret_song.textContent = champion_class_check(class_list);
    var secret_champ = randomSong(class_list);
 

    var current_champ = secret_champ;
    //console.log(current_champ);
    
    current_champ = current_champ.toLowerCase();
     //grabs the song we are guessing
    var hidden_champ = starting_empty_song(current_champ); //hidden song is the updating element when user guesses true
    //creates blank underline div to match song length
     var underline_word = underline_div(hidden_champ);
     underlines.textContent = underline_word.join(' ');
    // hidden_champ.textContent = ( 'what is this')
    guesses.textContent = guess_count;

    //resets game 
    function start_newgame(){
        guess_count = 12;
        wrong_guesses = [];
        wrong_guesses_element.textContent = "";
        class_list = array_list[Math.floor(Math.random()*array_list.length)];
        secret_song.textContent = champion_class_check(class_list);
        secret_champ = randomSong(class_list);
        current_champ = secret_champ;
        //console.log(current_champ);
        current_champ = current_champ.toLowerCase();
        hidden_champ = starting_empty_song(current_champ);
        underline_word = underline_div(hidden_champ);
        underlines.textContent = underline_word.join(' ');
        guesses.textContent = guess_count;
    } 
    document.onkeypress = function(event){
        //grabs users keypress
        userGuess = event.key;
        userGuess = userGuess.toLowerCase();


        //checks if keypress is wrong if wrong updates guess count and list of wrong guesses
        guess_check(userGuess,current_champ);
        //updates hidden song if keypress is in hidden song
        hidden_champ = change_hidden_letters(userGuess,current_champ,hidden_champ);   
        //console.log(hidden_champ + ' is the hidden song');  
        underlines.textContent = hidden_champ.join(' ');


        //check if you win after each keypress
        if(check_win(hidden_champ)){
            wins++;
            wins_div.textContent = ('Wins: ' +wins);
            alert('you win');
            start_newgame();
        } else if (guess_count === 0){
            loses++;
            loses_div.textContent = ('Loses: ' + loses);
            alert('You Lose!');
            start_newgame();
        }
    }

})