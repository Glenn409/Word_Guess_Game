//
//All my arrays and variables needed throughout the project
//

var fighter_list = ['Nasus','Darius','Mordekaiser','Illaoi','Trundle','Olaf','Garen','Shyvana','Udyr','Dr. Mundo','Volibear','Yorick','Vi','Xin Zhao']

var song_list = fighter_list;

var secret_song = document.getElementById('secret_word');
var underlines = document.getElementById('underlines');
var guesses = document.getElementById('guesses_remaining');
var start_button = document.getElementById('start_button');
var wrong_guesses_element = document.getElementById('user_wrong_guesses');
// var hidden_string = document.getElementById('hidden_string');
var wins_div = document.getElementById('wins');


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
//function to check guesscounter and end game.
function guessCount_checker(){
    if(guess_count === 0){
        alert('you have lost! please refresh to restart!');
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
    guessCount_checker();
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
// starts the game
document.getElementById('start_button').addEventListener('click',function(){
    secret_song.textContent = randomSong(song_list);
    console.log(secret_song);


    var current_song = secret_song.textContent; //grabs the song we are guessing
    var hidden_song = starting_empty_song(current_song); //hidden song is the updating element when user guesses true
    console.log(hidden_song + " hidden song")
    console.log(current_song + ' current song')

     //creates blank underline div to match song length
     var underline_word = underline_div(hidden_song);
     underlines.textContent = underline_word.join(' ');



    // hidden_song.textContent = ( 'what is this')
    guesses.textContent = guess_count;

    document.onkeypress = function(event){
        //grabs users keypress
        userGuess = event.key;
        //checks if keypress is wrong if wrong updates guess count and list of wrong guesses
        guess_check(userGuess,current_song);
        //updates hidden song if keypress is in hidden song
        hidden_song = change_hidden_letters(userGuess,current_song,hidden_song);   
        console.log(hidden_song + ' is the hidden song');  
        underlines.textContent = hidden_song.join(' ');


        //check if you win after each keypress
        if(check_win(hidden_song)){
            alert('you win');
            wins++;
            wins_div.textContent = wins;
        }
    }

})