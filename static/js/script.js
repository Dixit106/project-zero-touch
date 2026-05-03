let item1 = null;
let item2 = null;

const slot1 = document.getElementById('slot-1');
const slot2 = document.getElementById('slot-2');
const combineBtn = document.getElementById('combine-btn');
const resultMsg = document.getElementById('result-message');
const elementsList= document.getElementById('elements-list'); //to add new boxes

// clicking particles to put them in slots
function makeParticleClickable(particle) {
    particle.addEventListener('click', () => {
        const name = particle.getAttribute('data-name');

        if (!item1) {
            item1 = name;
            slot1.innerText = name;
        } else if (!item2) {
            item2 = name;
            slot2.innerText = name;
        }
    });
}

// Click rule to starting particle
document.querySelectorAll('.element').forEach(particle => {
    makeParticleClickable(particle);
});

//clicking slots to empty them
slot1.addEventListener('click', () => {
    item1 = null;
    slot1.innerText = "Select Item 1";
});

slot2.addEventListener('click', () => {
    item2 = null;
    slot2.innerText = "Select Item 2";
});

//clicking the collide button
combineBtn.addEventListener('click', () => {
    if (item1 && item2) {
        resultMsg.innerText = `smashing ${item1} and ${item2} together...`
        
    // will send in flask to see what it makes    
    fetch('/combine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item1: item1,item2: item2 }),    
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultMsg.innerText = `Success! You created: ${data.result}`;
            resultMsg.style.color = "#66fcf1"; // success

            //check if particle already in list or not
            let alreadyHaveIt = false;
            document.querySelectorAll('.element').forEach(p => {
                if (p.getAttribute('data-name') === data.result) {
                    alreadyHaveIt = true;
                }
            });

            // If we don't have it, create the HTML box!
            if (!alreadyHaveIt) {
                const newParticle = document.createElement('div');
                newParticle.className = 'element';
                newParticle.setAttribute('data-name', data.result);
                
                // add default icons for new things
                newParticle.innerHTML= `<span class="icon">🌌</span>${data.result}`;

                // Make it clickable and push it to the screen
                makeParticleClickable(newParticle);
                elementsList.appendChild(newParticle);
            }

            //The win condition
            if (data.result == "Universe") {
                const goalBox = document.getElementById('goal-tracker');
                goalBox.innerHTML = `<h3>🏆 YOU WIN! 🏆</h3><p>The Universe has been born.</p>`;
                goalBox.style.background = "rgba(102, 252, 241, 0.2)";
                goalBox.style.borderColor = "#66fcf1";
            }

        } else {
            resultMsg.innerText = data.result;
            resultMsg.style.color = "#c5c6c7" //failure
        }

        // to clean the combination area
        item1 = null;
        item2 = null;
        slot1.innerText = "Select Item 1";
        slot2.innerText = "Select Item 2";
    });
    
    } else {
        resultMsg.innerText = "pick two particles first!";
    }
});

// -- hint system logic
const hintBtn = document.getElementById('hint-btn');
const hintMsg = document.getElementById('hint-message');

hintBtn.addEventListener('click', () => {
    // gather list of things player has disvovered
    let currentInventory = [];
    document.querySelectorAll('.element').forEach(p => {
        currentInventory.push(p.getAttribute('data-name'));
    });

    //ask flask for the next hint based on the list
    fetch('/hint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inventory: currentInventory }),
    })
    .then(response => response.json())
    .then(data => {
        hintMsg.innerText = data.hint;
    });
});

// music player logic
const songs = [
    '/static/music/song1.mp3',
    '/static/music/song2.mp3',
    '/static/music/song3.mp3',
];

let currentSongIndex = 0;
const bgAudio = new Audio(songs[currentSongIndex]);
const playBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');
const trackName = document.getElementById('track-name');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgAudio.pause();
        playBtn.innerText = '▶️';
    } else {
        bgAudio.play();
        playBtn.innerText = '⏸️';
    } 
    isPlaying = !isPlaying;
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    bgAudio.src = songs[currentSongIndex]
    trackName.innerText = `Track ${currentSongIndex + 1}`;

    if (isPlaying) {
        bgAudio.play();
    }
});

//auto play
bgAudio.addEventListener('ended', () => {
    nextBtn.click();
});
