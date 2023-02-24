var openai_data2 = window.openai_data2 || {};
var file_contents2 = file_data2.file_contents2;
const playButton = document.getElementById("play");
const feedButton = document.getElementById("feed");
const exerciseButton = document.getElementById("exercise");

// Define pet object with default values
let pet = {
  mood: 25,
  fitness: 25,
  powerPoints: 0,
  level: 1
};

const LEVEL_CAP = 99;

// Define point values for interactions
const INTERACTION_POINTS = {
  PLAY: {
    mood: 10,
    powerPoints: () => getRandompowerPoints()
  },
  FEED: {
    fitness: -5,
    mood: 5,
    powerPoints: 5
  },
  EXERCISE: {
    fitness: 10,
    mood: -5,
    powerPoints: 10
  }
};

// Define function to calculate experience required for a given level
function getExperienceForLevel(level) {
    if (level <= 1) {
      return 0;
    } else {
      return Math.floor(getExperienceForLevel(level - 1) + (level - 1) + 300 * Math.pow(2, (level - 1) / 7));
    }
  }
  
  // Define function to get the pet's current level based on its power level
  function getLevel(powerPoints) {
    let level = 1;
    let experience = 0;
    while (level <= LEVEL_CAP && experience <= powerPoints) {
      experience += getExperienceForLevel(level);
      level++;
    }
    return level - 1;
  }

function getRandompowerPoints() {
    return Math.floor(Math.random() * 2) * 5;
  }

jQuery(document).ready(function ($) {

  playButton.addEventListener("click", playWithPet);
  feedButton.addEventListener("click", feedPet);
  exerciseButton.addEventListener("click", exercisePet);

  window.addEventListener("load", () => {
    retrievePetState();
    pet.level = getLevel(pet.powerPoints);
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

  function updatepowerPoints() {
    let powerPointsDelta = 0;
    powerPointsDelta += parseInt(INTERACTION_POINTS.PLAY.powerPoints) || 0;
    powerPointsDelta += parseInt(INTERACTION_POINTS.FEED.powerPoints) || 0;
    powerPointsDelta += parseInt(INTERACTION_POINTS.EXERCISE.powerPoints) || 0;
    pet.powerPoints += powerPointsDelta;
  
    document.getElementById("power-level").textContent = powerPointsState;
  }

  setInterval(() => {
    const powerPoints = pet.powerPoints;
    const storedpowerPoints = parseInt(localStorage.getItem("powerPoints"));
    
    if (powerPoints % 50 === 0 && powerPoints !== storedpowerPoints) {
      localStorage.setItem("powerPoints", powerPoints);
  
      // Make AJAX call to OpenAI API
      var api_key = openai_data2.api_key;
      var model = "text-davinci-003";
      var max_tokens = 200;
      var temperature = 0.8;
      var prompt = `Imagine you are a cute virtual pet owned by a young radio producer names Espe. \n\n As her pet, you must learn about Boys Planet 999, the South Korean boy group reality survival show to form a global pop music boy group, from this fan discussion on the latets episode: \n" ${file_contents2}. \n\n Your mood and fitness levels change when Espe interacts with you. \n\nYour mood and fitness level ranges from 0 to 5000, the higher they are the happier and more fit you are. Your mood state right now is ${pet.mood} and fitness level is ${pet.fitness}. Speaking like a baby animal character, here are ten words or less that express the virtual pet fitness and mood states and subtly references Boy Planet 999:\n\n`;
  
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
    const newLevel = getLevel(pet.powerPoints);
    if (newLevel !== pet.level) {
        pet.level = newLevel;
        document.getElementById("level").textContent = `Level: ${pet.level}`;
      }
    localStorage.setItem("petState", JSON.stringify(pet));
 // Update DOM elements with current state levels
 document.getElementById("mood-state").textContent = pet.mood;
 document.getElementById("fitness-state").textContent = pet.fitness;
 document.getElementById("power-level").textContent = pet.powerPoints;
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
 document.getElementById("power-level").textContent = pet.powerPoints;
}

function playWithPet() {
    pet.mood += parseInt(INTERACTION_POINTS.PLAY.mood) || 0;
    pet.powerPoints += parseInt(INTERACTION_POINTS.PLAY.powerPoints()) || 0;
    updatePetState(pet);
}
function feedPet() {
    pet.fitness += parseInt(INTERACTION_POINTS.FEED.fitness) || 0;
    pet.mood += parseInt(INTERACTION_POINTS.FEED.mood) || 0;
    pet.powerPoints += parseInt(INTERACTION_POINTS.FEED.powerPoints) || 0;    
    updatePetState(pet);
}

function exercisePet() {
    pet.fitness += parseInt(INTERACTION_POINTS.EXERCISE.fitness) || 0;
    pet.mood += parseInt(INTERACTION_POINTS.EXERCISE.mood) || 0;
    pet.powerPoints += parseInt(INTERACTION_POINTS.EXERCISE.powerPoints) || 0;  
    updatePetState(pet);
}

function savePetState() {
    localStorage.setItem("petState", JSON.stringify(pet));
  }
}
);
