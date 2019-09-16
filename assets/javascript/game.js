var song_list = ['idk','maybethis','oranges','apples','areallyextralongname'];

var secret_song = document.getElementById('secret_word');

var hidden_song = document.getElementById('mystery_word');
var guesses = document.getElementById('guesses_remaining');
var start_button = document.getElementById('start_button');
var wrong_guesses_element = document.getElementById('user_wrong_guesses');

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
    //console.log(song.length)
    for (i=0;i<song.length;i++){
        song_string = song_string + "_ ";
    }
    song_string = song_string.slice(0,-1);
    //console.log(song_string);
    return song_string;
};

function guess_check(keyPress,song){
    var x;
    for(i=0;i<song.length;i++){
        if(keyPress === song[i]){
            console.log('true');
            x = true;
            break;
        } else {
            x = false;
        }
    }
    if (x === false){
        wrong_guesses.push(keyPress);
        guess_count = guess_count - 1;
        console.log(guess_count);
    }
    guesses.textContent = guess_count;
    wrong_guesses_element.textContent = wrong_guesses;

    //if guess content hits 0 here trigger you lose function
}


// starts the game
document.getElementById('start_button').addEventListener('click',function(){
    start_button.textContent = 'Restart';
    secret_song.textContent = randomSong(song_list);
    var current_song = secret_song.textContent;
    console.log('thecurret song is ' +current_song);

    hidden_song.textContent = underline_div(secret_song.textContent);
    guesses.textContent = guess_count;

    document.onkeypress = function(event){
        userGuess = event.key;
        //console.log(userGuess);
        guess_check(userGuess,current_song);
        //console.log(wrong_guesses_element)
       
    }

})