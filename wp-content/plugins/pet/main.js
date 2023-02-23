var openai_data2 = window.openai_data2 || {};
const playButton = document.getElementById("play");
const feedButton = document.getElementById("feed");
const exerciseButton = document.getElementById("exercise");

playButton.addEventListener("click", playWithPet);
feedButton.addEventListener("click", feedPet);
exerciseButton.addEventListener("click", exercisePet);

window.addEventListener("load", () => {
    retrievePetState();
    updatePetState(pet);
});

// Define mood states
const MOOD_STATES = {
    SLEEPY: "sleepy",
    HAPPY: "happy",
    PENSIVE: "pensive",
    SASSY: "sassy",
    EXCITED: "excited",
    JOYFUL: "joyful"
};

// Define fitness states
const FITNESS_STATES = {
    HUNGRY: "hungry",
    CUTTING: "cutting",
    FIT: "fit",
    BULKING: "bulking",
    FULL_BELLY: "full belly"
};

// Define pet object with default values
let pet = {
    mood: MOOD_STATES.HAPPY,
    fitness: FITNESS_STATES.FIT,
    powerLevel: 0
};

// Define point values for interactions
const INTERACTION_POINTS = {
    PLAY: {
        mood: 10,
        powerLevel: 5
    },
    FEED: {
        fitness: -5,
        mood: -5,
        powerLevel: 1
    },
    EXERCISE: {
        fitness: 10,
        mood: -5,
        powerLevel: 5
    }
};

function savePetState() {
    localStorage.setItem("petState", JSON.stringify(pet));
  }

  
setInterval(() => {
    updateMoodState();
    updatePowerLevel();
    updatePetState(pet);
    savePetState();
}, 10000);

// Define function to update pet state and save to local storage
function updatePetState(newState) {
    pet = { ...pet, ...newState };
    localStorage.setItem("petState", JSON.stringify(pet));
}

// Define function to retrieve pet state from local storage
function retrievePetState() {
    const storedPetState = localStorage.getItem("petState");
    if (storedPetState) {
        pet = JSON.parse(storedPetState);
    }
}

function playWithPet() {
    pet.mood += INTERACTION_POINTS.PLAY.mood;
    pet.powerLevel += INTERACTION_POINTS.PLAY.powerLevel;
    updatePetState(pet);

    // Make AJAX call to OpenAI API
    var api_key = openai_data.api_key;
    var model = "text-davinci-003";
    var max_tokens = 1000;
    var temperature = 0.5;
    var prompt = "The pet is feeling " + pet.mood + " and has a power level of " + pet.powerLevel + ". Write a sentence or two based on this state.";

    var data = {
        "model": model,
        "prompt": prompt,
        "max_tokens": max_tokens,
        "temperature": temperature
    };

    $.ajax({
        type: "POST",
        url: "https://api.openai.com/v1/completions",
        headers: {
            "Authorization": "Bearer " + api_key,
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        success: function(response) {
            var text = response.choices[0].text;
            console.log(text);
            // Do something with the generated text
        }
    });
}
function feedPet() {
    pet.fitness += INTERACTION_POINTS.FEED.fitness;
    pet.mood += INTERACTION_POINTS.FEED.mood;
    pet.powerLevel += INTERACTION_POINTS.FEED.powerLevel;
    updatePetState(pet);

    // Make AJAX call to OpenAI API
    var api_key = openai_data.api_key;
    var model = "text-davinci-003";
    var max_tokens = 1000;
    var temperature = 0.5;
    var prompt = "The pet is feeling " + pet.mood + " and has a fitness level of " + pet.fitness + ". Write a sentence or two based on this state.";

    var data = {
        "model": model,
        "prompt": prompt,
        "max_tokens": max_tokens,
        "temperature": temperature
    };

    $.ajax({
        type: "POST",
        url: "https://api.openai.com/v1/completions",
        headers: {
            "Authorization": "Bearer " + api_key,
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        success: function(response) {
            var text = response.choices[0].text;
            console.log(text);
            // Do something with the generated text
        }
    });
}
