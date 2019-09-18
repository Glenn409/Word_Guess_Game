//
//All my arrays and variables needed throughout the project
//
var song_list = ['idk','maybethis','oranges','apples','areallyextralongname'];

var secret_song = document.getElementById('secret_word');
var hidden_song = document.getElementById('mystery_word');
var guesses = document.getElementById('guesses_remaining');
var start_button = document.getElementById('start_button');
var wrong_guesses_element = document.getElementById('user_wrong_guesses');
var hidden_string = document.getElementById('hidden_string');

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
    var song_string =""
    for (i=0;i<song.length;i++){
        song_string = song_string + "_ ";
    }
    song_string = song_string.slice(0,-1);
    return song_string;
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
            console.log('true');
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
            wrong_guesses_element.textContent = wrong_guesses;
        } else if (x === true){
            //
        }
    }
    guessCount_checker();
}
//function takes secret song and replaces it with spaces
function text_hidden(song){
    var song_string = "";
    for(i=0;i<song.length;i++){
        song_string = song_string + 'x' + ' ';
    }
    return song_string;
}
//

// function display(song){
//     var song_string = "";
//     for(i=0;i<song.length;i++){
//         song_string = song_string + 'x' + ' ';
//     }
//     return song_string;
// }
//}

//function changes hidden_string text if key press is a accurate guess
function change_hidden_letters(keyPress,song){

}

// starts the game
document.getElementById('start_button').addEventListener('click',function(){
    secret_song.textContent = randomSong(song_list);
    var current_song = secret_song.textContent;
    console.log('thecurret song is ' +current_song);

    hidden_string.textContent = text_hidden(current_song);
    console.log(hidden_string.textContent);


    hidden_song.textContent = underline_div(secret_song.textContent);
    guesses.textContent = guess_count;

    document.onkeypress = function(event){
        userGuess = event.key;
        //console.log(userGuess);
        guess_check(userGuess,current_song);
        //console.log(wrong_guesses_element)
       
    }

})