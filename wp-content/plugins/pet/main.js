/*
Entry Point
*/


// Inital load (Document)
$(() => {
    // Inital call to update pet info
    checkAndUpdatePetInfoInHtml()

    // Add click events for buttons
    $('.adopt-button').click(enableActions)
    $('.treat-button').click(clickedTreatButton)
    $('.play-button').click(clickedPlayButton)
    $('.exercise-button').click(clickedExerciseButton)
    $('.abandon-button').click(resetPet)
})


/*
    Configuration
    */


// Alive pet
const tick_alive_timer = 2500 // in ms
const max_initial_status = 125
const max_status_reduction = 10 

// Actions rate
const interact_treat_happiness = 5
const interact_treat_weight = 7

const interact_play_happiness = 7
const interact_play_weight = 12

const interact_exercise_happiness = 7
const interact_exercise_weight = 5

// Status Treshholds
// (GT = Greater Then, LT = Less Then) && (Equal To)
const threshold_depressed = 30 // LT
const threshold_hunger = 60 // LT
const threshold_hol = 200 // GT
const threshold_overweight = 250 // GT
const threshold_max_weight = 500 // GT 


/*
    State
    */


// Store aliveTimer reference to clear for later
let aliveTimer

// Pet info state stored as object
let pet_info = { name: 'MissingNo.', weight: '??', happiness: '??', status: '??', state: '??' }


/*
    Rendering
    */


// Render function, does check before value is rendered onto page
function checkAndUpdatePetInfoInHtml () {
    checkWeightAndHappinessBeforeUpdating()
    updatePetInfoInHtml()
}

function checkWeightAndHappinessBeforeUpdating () {
    // Add conditional so if weight is lower than zero, set it back to zero
    let weight = parseInt(pet_info.weight)
    let happiness = parseInt(pet_info.happiness)

    // If Pet is ded
    if ( (isNaN(weight) || (weight < 0) || (weight >= threshold_max_weight)) || (isNaN(happiness) || (happiness < 0)) ) {
        pet_info.weight = 0
        pet_info.happiness = 0  

        // Reset tick timers
        clearInterval(aliveTimer)

        disableActions()
        updateStatus()
    } else {
    // Attach proper status
    if (weight <= threshold_hunger) {
        updateStatus('hungry')
    } else if (happiness <= threshold_depressed) {
        updateStatus('depressed')
    } else if (weight >= threshold_overweight) {
        updateStatus('overweight')
    } else if (happiness >= threshold_hol) {
        updateStatus('hol')
    } else {
        updateStatus('alive')
    }
    }
}

// Updates your HTML with the current values in your pet_info dictionary safely
function updatePetInfoInHtml () {
    $('.name').text(pet_info['name'])
    $('.weight').text(pet_info['weight'])
    $('.happiness').text(pet_info['happiness'])
    $('#status').text(pet_info['status'])
}


// Helper function to update status of pet_info
function updateStatus (status) {
    // Reset status
    $('#status').removeAttr('class')

    // Set Status
    switch(status) {
    case 'alive':
        $('#status').addClass('green')
        pet_info.status = 'alive'
        pet_info.state = 'good'
        
        break
    case 'hol':
        $('#status').addClass('teal')
        pet_info.status = 'high on life'
        pet_info.state = 'good'
        
        break
    case 'overweight':
        $('#status').addClass('orange')
        pet_info.status = 'overweight'
        pet_info.state = 'bad'
        
        break
    case 'depressed':
        $('#status').addClass('purple')
        pet_info.status = 'depressed'
        pet_info.state = 'bad'

        break
    case 'hungry':
        $('#status').addClass('orange')
        pet_info.status = 'hungry'
        pet_info.state = 'bad'

        break
    default:
        $('#status').addClass('red')
        pet_info.status = 'dead'
        pet_info.state = 'dead'
    }
}


/*
    Actions
    */


// Enable all actions related to managing your pet
function enableActions () {
    $('#actions').attr('class', 'button-container active')
    $('#adopt').attr('class', 'button-container')
    
    resetPet()
    itsAlive()
    updatePetInfoInHtml()
}

// Disable all management actions and set interactions to only (adopt)
function disableActions () {
    $('#actions').attr('class', 'button-container')
    $('#adopt').attr('class', 'button-container active')
}

// Updates data and calls render function
function clickedTreatButton () {
    pet_info.happiness += interact_treat_happiness 
    pet_info.weight += interact_treat_weight

    checkAndUpdatePetInfoInHtml()
}

function clickedPlayButton () {
    pet_info.happiness += interact_play_happiness
    pet_info.weight -= interact_play_weight

    checkAndUpdatePetInfoInHtml()
}

function clickedExerciseButton () {
    pet_info.happiness -= interact_exercise_happiness
    pet_info.weight -= interact_exercise_weight

    checkAndUpdatePetInfoInHtml()
}


/*
    Pet Creation
    */


// Reset all related pet data
function resetPet () {
    resetPokemon()
    resetStats()
    updateStatus('alive')
}

// Updates new pet image using pokemon's API (https://pokeapi.co/docs/v2)
async function resetPokemon () {
    // 150 represents the range of "GEN 1" Pokemon interfaced from the API
    let randomGenOnePokemon = Math.floor((Math.random() * 150) + 1)
    let fetchURL = 'https://pokeapi.co/api/v2/pokemon/' + randomGenOnePokemon + '/'

    let pokemonObject = await fetch(fetchURL)
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error)
    })

    let pokemonName = pokemonObject.name
    setName(pokemonName)

    $('.pet-image').attr('src', pokemonObject.sprites.front_default)
}

// Set pet name to pokemon name
function setName (pokemonName) {
    // Set first character as UpperCase
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)

    pet_info.name = pokemonName
}

// Randomly update new inital Weight & Happiness pet_info stats
function resetStats () {
    let randomWeight = Math.floor((Math.random() * max_initial_status) + 75)
    let randomHappiness = Math.floor((Math.random() * max_initial_status) + 75)
    
    pet_info.weight = randomWeight
    pet_info.happiness = randomHappiness
}

// Helper function to reduce random stat from range on each call
function reduceRandomStats () {
    let randomWeightReduction = Math.floor((Math.random() * max_status_reduction) + 0)
    let randomHappinessReduction = Math.floor((Math.random() * max_status_reduction) + 0)
    
    pet_info.happiness -= randomWeightReduction
    pet_info.weight -= randomHappinessReduction
}

// Select random emote depending on state
function randomEmote () {
    let emoteState = pet_info.state
    
    switch(emoteState) {
    case 'good':
        const goodPetStates = [
        './assets/Emote_Heart.png',
        './assets/Emote_Hi!.gif',
        './assets/Emote_Game.png',
        './assets/Emote_Laugh.gif',
        './assets/Emote_Happy.png',
        './assets/Emote_Note.png',
        './assets/Emote_Yes.gif'
        ]
        
        const goodArrayLength = goodPetStates.length
        let goodSelectedState = Math.floor((Math.random() * goodArrayLength) + 0)

        $('.pet-state').attr('src', goodPetStates[goodSelectedState])
        
        break
    case 'bad':
        const badPetStates = [
        './assets/Emote_No.gif',
        './assets/Emote_Sad.png',
        './assets/Emote_Sick.gif',
        './assets/Emote_Surprised.gif',
        './assets/Emote_Uh.gif',
        './assets/Emote_Angry.png'
        ]
        
        const badArrayLength = badPetStates.length
        let badSelectedState = Math.floor((Math.random() * badArrayLength) + 0)
        
        $('.pet-state').attr('src', badPetStates[badSelectedState])
        
        break
    case 'dead':
        const deadPetStates = [
        './assets/Emote_Sleep.png',
        './assets/Emote_X.png',
        './assets/Emote_Exclamation.png'
        ]
        
        const deadArrayLength = deadPetStates.length
        let deadSelectedState = Math.floor((Math.random() * deadArrayLength) + 0)
        
        $('.pet-state').attr('src', deadPetStates[deadSelectedState])
        
        break
    default:
        const defaultPetState = 'Emote_Question.png'
        $('.pet-state').attr('src', defaultPetState)
    }
}

// ITSSSS ALIVEEEE!!!!!
function itsAlive () {
    aliveTimer = setInterval( () => {
    // Enables Tamagotchi behavior
    reduceRandomStats()
    randomEmote()
    checkAndUpdatePetInfoInHtml()
    }, tick_alive_timer )
}