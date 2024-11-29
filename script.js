const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Enable/Disabled button
function toggleButton(){
    button.disabled = !button.disabled
}

// calling voiceRSS api through SDK
function tellMe(joke){
    console.log(joke);
    VoiceRSS.speech({
        key: 'e8d2035a94fb41a8bdea0fa14da3ee86',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


//Get Jokes from Joke API
async function getJokes(){
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiURL);
        const data = await response.json()
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        //Disabled the button
        toggleButton();

        //Calling text to voice API
        tellMe(joke);

    }catch (error){
        console.log('Woops ', error)
    }
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)



