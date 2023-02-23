var openai_data2 = window.openai_data2 || {};
const playButton = document.getElementById("play");
const feedButton = document.getElementById("feed");
const exerciseButton = document.getElementById("exercise");

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
        mood: 1,
        powerLevel: 1
    },
    EXERCISE: {
        fitness: 10,
        mood: -5,
        powerLevel: 5
    }
};

jQuery(document).ready(function($) {

playButton.addEventListener("click", playWithPet);
feedButton.addEventListener("click", feedPet);
exerciseButton.addEventListener("click", exercisePet);

window.addEventListener("load", () => {
    retrievePetState();
    updatePetState(pet);
});

setInterval(() => {
    updateMoodState();
    updatePowerLevel();
    updatePetState(pet);
    savePetState();
}, 10000);

function updateMoodState() {
    if (pet.mood >= 80) {
      pet.mood = MOOD_STATES.JOYFUL;
    } else if (pet.mood >= 60) {
      pet.mood = MOOD_STATES.EXCITED;
    } else if (pet.mood >= 40) {
      pet.mood = MOOD_STATES.SASSY;
    } else if (pet.mood >= 20) {
      pet.mood = MOOD_STATES.PENSIVE;
    } else {
      pet.mood = MOOD_STATES.SLEEPY;
    }
    document.getElementById("mood-state").textContent = pet.mood;
}
  
  function updatePowerLevel() {
    if (pet.powerLevel >= 80) {
      pet.powerLevel = "supercharged";
    } else if (pet.powerLevel >= 60) {
      pet.powerLevel = "energized";
    } else if (pet.powerLevel >= 40) {
      pet.powerLevel = "ready to go";
    } else if (pet.powerLevel >= 20) {
      pet.powerLevel = "a little tired";
    } else {
      pet.powerLevel = "completely drained";
    }
    document.getElementById("power-level").textContent = "Power Level: " + pet.powerLevel;
}

  
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
    var prompt = `The pet is feeling ${pet.mood} and has a fitness level of ${pet.fitness} and has a power level of ${pet.powerLevel}. Write a sentence or two based on this state in the voice and tone of a cute virtual pet.`;

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
            document.getElementById("response").textContent = text;
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
    var prompt = `The pet is feeling ${pet.mood} and has a fitness level of ${pet.fitness} and has a power level of ${pet.powerLevel}. Write a sentence or two based on this state in the voice and tone of a cute virtual pet.`;

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
            document.getElementById("response").textContent = text;
            // Do something with the generated text
        }
    });
}

function exercisePet() {
    pet.fitness += INTERACTION_POINTS.FEED.fitness;
    pet.mood += INTERACTION_POINTS.FEED.mood;
    pet.powerLevel += INTERACTION_POINTS.FEED.powerLevel;
    updatePetState(pet);

    // Make AJAX call to OpenAI API
    var api_key = openai_data.api_key;
    var model = "text-davinci-003";
    var max_tokens = 1000;
    var temperature = 0.5;
    var prompt = `The pet is feeling ${pet.mood} and has a fitness level of ${pet.fitness} and has a power level of ${pet.powerLevel}. Write a sentence or two based on this state in the voice and tone of a cute virtual pet.`;

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
            document.getElementById("response").textContent = text;
            // Do something with the generated text
        }
    });
}

function savePetState() {
    localStorage.setItem("petState", JSON.stringify(pet));
  }
})