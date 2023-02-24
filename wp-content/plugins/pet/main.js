var openai_data2 = window.openai_data2 || {};
var file_contents2 = file_data2.file_contents2;
const playButton = document.getElementById("play");
const feedButton = document.getElementById("feed");
const exerciseButton = document.getElementById("exercise");

// Define pet object with default values
let pet = {
  mood: 25,
  fitness: 25,
  powerLevel: 0
};

// Define point values for interactions
const INTERACTION_POINTS = {
  PLAY: {
    mood: 10,
    powerLevel: Math.floor(Math.random() * 2) * 5

  },
  FEED: {
    fitness: -5,
    mood: 5,
    powerLevel: 5
  },
  EXERCISE: {
    fitness: 10,
    mood: -5,
    powerLevel: 10
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

  // Define function to decrease pet's mood and fitness levels by random amount
function decreaseMoodAndFitness() {
    pet.mood -= Math.floor(Math.random() * 11);
    pet.fitness -= Math.floor(Math.random() * 11);
  }
  
  // Set interval to decrease mood and fitness levels every 10 seconds
  setInterval(() => {
    decreaseMoodAndFitness();
    updatePetState(pet);
    savePetState();
  }, 10000);

  function updateMoodState() {
    let moodDelta = 0;
    moodDelta += parseInt(INTERACTION_POINTS.PLAY.mood) || 0;
    moodDelta += parseInt(INTERACTION_POINTS.FEED.mood) || 0;
    moodDelta += parseInt(INTERACTION_POINTS.EXERCISE.mood) || 0;
    pet.mood += moodDelta;
    
    document.getElementById("mood-state").textContent = moodState;
  }

  function updatePowerLevel() {
    let powerLevelDelta = 0;
    powerLevelDelta += parseInt(INTERACTION_POINTS.PLAY.powerLevel) || 0;
    powerLevelDelta += parseInt(INTERACTION_POINTS.FEED.powerLevel) || 0;
    powerLevelDelta += parseInt(INTERACTION_POINTS.EXERCISE.powerLevel) || 0;
    pet.powerLevel += powerLevelDelta;
  
    document.getElementById("power-level").textContent = powerLevelState;
  }

  setInterval(() => {
    const powerLevel = pet.powerLevel;
    const storedPowerLevel = parseInt(localStorage.getItem("powerLevel"));
    
    if (powerLevel % 50 === 0 && powerLevel !== storedPowerLevel) {
      localStorage.setItem("powerLevel", powerLevel);
  
      // Make AJAX call to OpenAI API
      var api_key = openai_data2.api_key;
      var model = "text-davinci-003";
      var max_tokens = 200;
      var temperature = 0.8;
      var prompt = `Imagine you are a cute virtual pet owned by a young radio producer names Espe with interests in anime, kpop, and fashion. \n\n Learn about Boys Planet 999, the South Korean boy group reality survival show to form a global K-pop boy group, from this discussion on the latets episode among fans: \n" ${file_contents2}. \n\n Your mood and fitness levels change when Espe interacts with you. \n\nYour mood and fitness level ranges from 0 to 1000, the higher they are the happier and more fit you are. Your mood state right now is ${pet.mood} and fitness level is ${pet.fitness}. Speaking like a little anime animal, here are ten words or less that express the virtual pet fitness and mood states and references Boy Planet 999:\n\n`;
  
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
    }, 100);
  

  
// Define function to update pet state and save to local storage
function updatePetState(newState) {
    pet = { ...pet, ...newState };
    localStorage.setItem("petState", JSON.stringify(pet));
 // Update DOM elements with current state levels
 document.getElementById("mood-state").textContent = pet.mood;
 document.getElementById("fitness-state").textContent = pet.fitness;
 document.getElementById("power-level").textContent = pet.powerLevel;
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
 document.getElementById("power-level").textContent = pet.powerLevel;
}

function playWithPet() {
    pet.mood += parseInt(INTERACTION_POINTS.PLAY.mood) || 0;
    pet.powerLevel += parseInt(INTERACTION_POINTS.PLAY.powerLevel) || 0;
    updatePetState(pet);
}
function feedPet() {
    pet.fitness += parseInt(INTERACTION_POINTS.FEED.fitness) || 0;
    pet.mood += parseInt(INTERACTION_POINTS.FEED.mood) || 0;
    pet.powerLevel += parseInt(INTERACTION_POINTS.FEED.powerLevel) || 0;    
    updatePetState(pet);
}

function exercisePet() {
    pet.fitness += parseInt(INTERACTION_POINTS.EXERCISE.fitness) || 0;
    pet.mood += parseInt(INTERACTION_POINTS.EXERCISE.mood) || 0;
    pet.powerLevel += parseInt(INTERACTION_POINTS.EXERCISE.powerLevel) || 0;  
    updatePetState(pet);
}

function savePetState() {
    localStorage.setItem("petState", JSON.stringify(pet));
  }
}
);
