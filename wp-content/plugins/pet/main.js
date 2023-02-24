var openai_data2 = window.openai_data2 || {};
var file_contents2 = file_data2.file_contents2;
const playButton = document.getElementById("play");
const exerciseButton = document.getElementById("exercise");
const levelElement = document.getElementById("level");
const adventureButton = document.getElementById("adventure");
const foodsDiv = document.getElementById("foods");

window.addEventListener("load", () => {
    retrievePetState();
    pet.level = getLevel(pet.powerPoints);
    updatePetState(pet);
    const levelElement = document.getElementById("level");
    levelElement.textContent = `Level: ${pet.level}`;
    updateLevel();
  });

  // Define function to retrieve pet state from local storage
function retrievePetState() {
    const storedPetState = localStorage.getItem("petState");
    if (storedPetState) {
        pet = JSON.parse(storedPetState);
    }
}
  
// Define pet object with default values
let pet = {
  mood: 25,
  fitness: 25,
  powerPoints: 0,
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
  },
  ADVENTURE: {
    fitness: 10,
    mood: 10,
    powerPoints: () => getRandompowerPoints()
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

    window.addEventListener("load", () => {
        retrievePetState();
        pet.level = getLevel(pet.powerPoints);
        updatePetState(pet);
        const levelElement = document.getElementById("level");
        levelElement.textContent = `Level: ${pet.level}`;
        updateLevel();
      });

  playButton.addEventListener("click", playWithPet);
  exerciseButton.addEventListener("click", exercisePet);
  adventureButton.addEventListener("click", adventurePet);
  

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

  function updateLevel() {
    const newLevel = getLevel(pet.powerPoints);
    if (newLevel !== pet.level) {
      pet.level = newLevel;
      document.getElementById("level").textContent = `Level: ${pet.level}`;
    }
  }

// Define function to create new element and add event listener
function addElement() {
    // Create new image element
    const img = document.createElement('img');
    img.src = 'https://lowfemme.com/wp-content/uploads/2023/02/228733961fa9fb474132fdd4a089efbc.gif';
    img.alt = 'Image';
    img.width = 38;
  
    // Create new element and add image and text
    const newElement = document.createElement('div');
    newElement.appendChild(img);
    newElement.classList.add("food"); // add class "food" to the new element

  
    // Add event listener to increase pet mood by 50 when clicked
    newElement.addEventListener('click', () => {
      pet.mood += 50;
      updatePetState(pet);
      newElement.remove();
    });

        // Add adve element to the "foods" div
        const foodsDiv = document.getElementById("foods");
        foodsDiv.appendChild(newElement);
  
  }
  
  // Set interval to add new elements with a 1/30 chance every second
  setInterval(() => {
    const foodsDiv = document.getElementById("foods");
    if (foodsDiv && Math.random() < 1/30) {
      addElement();
    }
  }, 1000);
  
  
  
  setInterval(updateLevel, 1000);
  

  setInterval(() => {
    const powerPoints = pet.powerPoints;
    const storedpowerPoints = parseInt(localStorage.getItem("powerPoints"));
    
    if (powerPoints % 50 === 0 && powerPoints !== storedpowerPoints) {
      localStorage.setItem("powerPoints", powerPoints);
  
      // Make AJAX call to OpenAI API
      var api_key = openai_data2.api_key;
      var model = "text-davinci-003";
      var max_tokens = 100;
      var temperature = 0.7;
      var prompt = `Imagine you are a cute virtual pet owned by me, a young girl named Espe. \n\n Your mood and fitness level ranges from 0 to 5000, the higher they are the happier and more fit you are, but the lower they are the sleepier and weaker you are. Your mood state right now is ${pet.mood} and fitness level is ${pet.fitness}. Speaking like a cute animal character, here is a sentence with less than 10 words that expresses how you feel about your current fitness and mood:\n\n`;
  
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

function adventurePet() {
    // Determine power level increment based on mood and fitness levels
    let powerPointsDelta = 0;
    const fitnessModifier = Math.floor(pet.fitness / 10); // value between -10 and 10
    const moodModifier = Math.floor(pet.mood / 10); // value between -10 and 10
    const randomIncrement = Math.floor(Math.random() * 11); // random value between 0 and 10
    powerPointsDelta = randomIncrement + fitnessModifier + moodModifier;
  
    // Decrease mood and fitness levels by random amount
    const moodDecrease = Math.floor(Math.random() * -101);
    const fitnessDecrease = Math.floor(Math.random() * -101);
    pet.mood += moodDecrease;
    pet.fitness += fitnessDecrease;
  
    pet.powerPoints += powerPointsDelta;
    updatePetState(pet);
  }  

function savePetState() {
    localStorage.setItem("petState", JSON.stringify(pet));
  }
}
);
