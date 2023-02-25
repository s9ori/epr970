var openai_data2 = window.openai_data2 || {};
var file_contents2 = file_data2.file_contents2;
const playButton = document.getElementById("play");
const exerciseButton = document.getElementById("exercise");
window.addEventListener("load", () => {
    retrievePetState();
    pet.level = getLevel(pet.powerPoints);
    updatePetState(pet);
    const levelElement = document.getElementById("level");
    levelElement.textContent = `Level: ${pet.level}`;
    updateLevel();
  });

  const interactBtns = document.querySelectorAll('.interaction button');

interactBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.add('clicked');
    // Your interaction logic here
  });
  
  btn.addEventListener('touchstart', () => {
    btn.classList.add('clicked');
  });
  
  btn.addEventListener('touchend', () => {
    btn.classList.remove('clicked');
  });
});

  
const levelElement = document.getElementById("level");
const adventureButton = document.getElementById("adventure");
const foodsDiv = document.getElementById("foods");
const monstersDiv = document.getElementById("monsters");

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

  playButton.addEventListener("click", playWithPet);
  exerciseButton.addEventListener("click", exercisePet);
  adventureButton.addEventListener("click", adventurePet);
  

  // Define function to decrease pet's mood and fitness levels by random amount
function decreaseMoodAndFitness() {
    pet.mood -= Math.floor(Math.random() * 10);
    pet.fitness -= Math.floor(Math.random() * 10);
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

// Set interval to add new elements with a probability that depends on the pet's level
setInterval(() => {
    const foodsDiv = document.getElementById("foods");
    const level = pet.level;
  
    // Define probabilities for each type of food as a function of the pet's level
    let rareProbability = level / (700);  // Becomes rarer as level goes up
    let uncommonProbability = (1) / (30);  // Becomes rarer as level goes up
    let commonProbability = (1) / (10);  // Becomes rarer as level goes up

  
    // Generate a random number and add a food element based on the probability
    let rand = Math.random();
    if (rand < rareProbability) {
      addElement("rare");
    } else if (rand < uncommonProbability) {
      addElement("uncommon");
    } else if (rand < commonProbability) {
      addElement("common");
    }    
  }, 1000);
  
function addElement(type) {
  let moodBoost, imageSrc;
  if (type === "rare") {
    moodBoost = 150;
    imageSrc = 'https://lowfemme.com/wp-content/uploads/2023/02/Asset-2.png';
  } else if (type === "uncommon") {
    moodBoost = 100;
    imageSrc = 'https://lowfemme.com/wp-content/uploads/2023/02/Asset-1.png';
  } else {
    moodBoost = 50;
    imageSrc = 'https://lowfemme.com/wp-content/uploads/2023/02/Asset-3.png';
  }

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Image';
    img.width = 38;
  
    const newElement = document.createElement('div');
    newElement.appendChild(img);
    newElement.classList.add('food');
  
    newElement.addEventListener('click', () => {
      pet.mood += moodBoost;
      updatePetState(pet);
      newElement.remove();
    });
  
    const foodsDiv = document.getElementById('foods');
    foodsDiv.appendChild(newElement);
  }  

  // Set interval to add new monsters with a probability that depends on the pet's level
setInterval(() => {
    const monstersDiv = document.getElementById("monsters");
    const level = pet.level;
  
    // Define probabilities for each type of food as a function of the pet's level
    let monsterProbability = (1) / (20);  // Becomes rarer as level goes up
  
    // Generate a random number and add a food element based on the probability
    let rand = Math.random();
    if (rand < monsterProbability) {
      addMonster("monster");
    }
  }, 1000);


function dropElement(type) {
  let fitnessBoost, imageSrc;
  if (type === "ribbon1") {
    fitnessBoost = 300;
    imageSrc = ' https://lowfemme.com/wp-content/uploads/2023/02/tumblr_2dd2dd3e0bc9407e8e0d1a3b01c67b38_4b38d417_75.webp';
  } else if (type === "ribbon2") {
    fitnessBoost = 600;
    imageSrc = 'https://lowfemme.com/wp-content/uploads/2023/02/tumblr_bd16179ec8017844f4175a144f1b6a2c_5a6b991f_75.webp';
  } else if (type === "ribbon3") {
    fitnessBoost = 900;
    imageSrc = 'https://lowfemme.com/wp-content/uploads/2023/02/tumblr_9acc2ace0bf9920ded8a4ef9a1be77ee_c56fb2cd_75.webp';
  }

  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = 'Ribbon';
  img.width = 20;

  const newElement = document.createElement('div');
  newElement.appendChild(img);
  newElement.classList.add('drop');

  newElement.addEventListener('click', () => {
    pet.fitness += fitnessBoost;
    updatePetState(pet);
    newElement.remove();
  });

  const dropsDiv = document.getElementById('drops');
  dropsDiv.appendChild(newElement);
}
  
  function addMonster(type) {
    let moodBoost, imageSrc;
    if (type === "monster") {
      let monsterLevel = Math.floor(Math.random() * 50) + 1;
      const monsterImg = document.createElement('img');
      monsterImg.src = 'https://lowfemme.com/wp-content/uploads/2023/02/tumblr_inline_p7gi2483iO1qfc9y0_75sq.gif';
      monsterImg.alt = 'Monster';
      monsterImg.width = 38;
  
      const monsterLevelEl = document.createElement('p');
      monsterLevelEl.innerText = `Level: ${monsterLevel}`;
      monsterLevelEl.classList.add('monster-level');
  
      const monsterElement = document.createElement('div');
      monsterElement.appendChild(monsterImg);
      monsterElement.appendChild(monsterLevelEl);
      monsterElement.classList.add('monster');
      monsterElement.addEventListener('click', () => {
        const winChance = pet.level / monsterLevel;
        const rand = Math.random();
        if (rand < winChance) {
          const powerPointsWon = monsterLevel * 15;
          pet.powerPoints += powerPointsWon;
          updatePetState(pet);
          monsterElement.remove();
          const alertEl = document.createElement('p');
          alertEl.innerText = `You won the dance battle! + ${powerPointsWon} power points.`;
          alertEl.classList.add('alert');
          monstersDiv.appendChild(alertEl);
          setTimeout(() => {
            alertEl.remove();
            const rollChance = Math.random();
          if (rollChance < 0.5) {
            dropElement("ribbon1");
          } else if (rollChance < 0.8) {
            dropElement("ribbon2");
          } else {
            dropElement("ribbon3");
          }
          }, 2000);
        } else {
          pet.fitness = 0;
          pet.mood = 0;
          updatePetState(pet);
          monsterElement.remove();
          const alertEl = document.createElement('p');
          alertEl.innerText = 'You lost the dance battle! Your fitness and mood are drained to 0.';
          alertEl.classList.add('alert');
          monstersDiv.appendChild(alertEl);
          setTimeout(() => {
            alertEl.remove();
          }, 2000);
        }
      });
      // Remove any existing monster elements
      while (monstersDiv.firstChild) {
        monstersDiv.removeChild(monstersDiv.firstChild);
      }
      monstersDiv.appendChild(monsterElement);
      return;
    }
  
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Image';
    img.width = 38;
  
    const newElement = document.createElement('div');
    newElement.appendChild(img);
    newElement.classList.add('monster');
  
    newElement.addEventListener('click', () => {
      pet.mood += moodBoost;
      pet.fitness += fitnessBoost;
      updatePetState(pet);
      newElement.remove();
    });
  
    monstersDiv.appendChild(newElement);
  }

  
  
  setInterval(updateLevel, 1000);
  
  jQuery(document).ready(function ($) {
  setInterval(() => {
    const powerPoints = pet.powerPoints;
    const storedpowerPoints = parseInt(localStorage.getItem("powerPoints"));
    
    if (powerPoints % 300 === 0 && powerPoints !== storedpowerPoints) {
      localStorage.setItem("powerPoints", powerPoints);
  
      // Make AJAX call to OpenAI API
      var api_key = openai_data2.api_key;
      var model = "text-davinci-003";
      var max_tokens = 100;
      var temperature = 0.7;
      
      var prompt = `You're a cute virtual pet owned by a young girl named Espe. You love to learn and explore the world around you. Tell me how you feel with your power level being ${powerPoints}/13,000,000 in less than ten words in your most adorable animal character voice and noises:\n\n`;
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
})
  

  
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

function exercisePet() {
    if (pet.mood >= 0) {
      pet.fitness += parseInt(INTERACTION_POINTS.EXERCISE.fitness) || 0;
      pet.mood += parseInt(INTERACTION_POINTS.EXERCISE.mood) || 0;
      pet.powerPoints += parseInt(INTERACTION_POINTS.EXERCISE.powerPoints) || 0;  
      updatePetState(pet);
    }
    }
  

    function adventurePet() {
        if (pet.mood > 0 && pet.fitness > 0) {
          // Determine power level increment based on mood and fitness levels
          let powerPointsDelta = 0;
          const fitnessModifier = Math.floor(pet.fitness / 10); // value between -10 and 10
          const moodModifier = Math.floor(pet.mood / 10); // value between -10 and 10
          const randomIncrement = Math.floor(Math.random() * 11); // random value between 0 and 10
          powerPointsDelta = randomIncrement + fitnessModifier + moodModifier;
      
          if (powerPointsDelta < 0) {
            powerPointsDelta = 0;
          }
      
          // Decrease mood and fitness levels by random amount
          const moodDecrease = Math.floor(Math.random() * -101);
          const fitnessDecrease = Math.floor(Math.random() * -101);
          pet.mood += moodDecrease;
          pet.fitness += fitnessDecrease;
      
          pet.powerPoints += powerPointsDelta;
          updatePetState(pet);
        } else {
          console.log("Pet's mood or fitness level is too low for an adventure.");
        }
      }
      
  
function savePetState() {
    localStorage.setItem("petState", JSON.stringify(pet));
  }