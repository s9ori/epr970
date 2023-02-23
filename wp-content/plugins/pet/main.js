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

jQuery(document).ready(function ($) {

  playButton.addEventListener("click", playWithPet);
  feedButton.addEventListener("click", feedPet);
  exerciseButton.addEventListener("click", exercisePet);

  window.addEventListener("load", () => {
    retrievePetState();
    updatePetState(pet);
  });

  
// Define function to update pet state and save to local storage
function updatePetState(newState) {
    pet = { ...pet, ...newState };
    localStorage.setItem("petState", JSON.stringify(pet));
 // Update DOM elements with current state levels
 document.getElementById("mood-state").textContent = pet.mood;
 document.getElementById("fitness-state").textContent = pet.fitness;
 document.getElementById("power-level").textContent = "Power Level: " + pet.powerLevel;
}

// Define function to retrieve pet state from local storage
function retrievePetState() {
    const storedPetState = localStorage.getItem("petState");
    if (storedPetState) {
        pet = JSON.parse(storedPetState);
    }
 // Update DOM elements with current state levels
 document.getElementById("mood-state").textContent = pet.mood;
 document.getElementById("fitness-state").textContent = pet.fitness;
 document.getElementById("power-level").textContent = "Power Level: " + pet.powerLevel;
}

function playWithPet() {
    pet.mood += parseInt(INTERACTION_POINTS.PLAY.mood) || 0;
    pet.powerLevel += parseInt(INTERACTION_POINTS.PLAY.powerLevel) || 0;
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
    pet.fitness += parseInt(INTERACTION_POINTS.FEED.fitness) || 0;
    pet.mood += parseInt(INTERACTION_POINTS.FEED.mood) || 0;
    pet.powerLevel += parseInt(INTERACTION_POINTS.FEED.powerLevel) || 0;
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
    pet.fitness += parseInt(INTERACTION_POINTS.EXERCISE.fitness) || 0;
    pet.mood += parseInt(INTERACTION_POINTS.EXERCISE.mood) || 0;
    pet.powerLevel += parseInt(INTERACTION_POINTS.EXERCISE.powerLevel) || 0;
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