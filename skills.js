
// Time a skill is displayed for 
const skillDisplayTime = 10000;

// Lower is faster
const typingDelay = 25;
const deleteDelay = 15;

// The order of rotation.
const skillRotation = [
    "rust",
    "python",
    "web",
    "git",
    "linux"
]

// Get all the data required to render each skill descriptory paragraph.
const data = {
    "rust": {
        "text": "Rust is a general-purpose programming language built for performance and type safety. It is now my main programming language after learning it in 2024.",
        "color": "#f5a97f",
        "buttonid": "rust-box",
    },
    "python": {
        "text": "Python is a high-level, general-purpose programming language which is quite easy to code. It was my first language and I still use it often for testing algorithms.",
        "color": "#8aadf4",
        "buttonid": "python-box",
    },
    "web": {
        "text": "HTML, CSS and JavaScript are the foundations of the web. This website was made fully from scratch by me, as a way of learning some web development.",
        "color": "#eed49f",
        "buttonid": "web-box",
    },
    "git": {
        "text": "GitHub and git are vital tools for version control and collaboration. I have used these for multiple years and all my major projects are hosted there.",
        "color": "#cad3f5",
        "buttonid": "git-box",
    },
    "linux": {
        "text": "Linux distributions are widely used by software developers. This website is self hosted using docker, on debian. I also daily drive fedora linux, and have been a full time linux user since 2021.",
        "color": "#7dc4e4",
        "buttonid": "linux-box",
    }
}

// Uses the data const to set a skill to the skill description.
function setSkill(skill, auto) {
    const element = document.getElementById("skill-description");
    typeSkill(data[skill]["text"], auto);
    element.style.borderBlockColor = data[skill]["color"];
    document.querySelectorAll(".stop-skill-rotation").forEach(button => {
        button.classList.remove("hover");
    })
    document.getElementById(data[skill]["buttonid"]).classList.add("hover")
}

let currentSkill = 0;  // Index of current skill
let skillInterval;  // Interval to change text on.

// Start automatically rotating text.
function startSkillRotation() {
    skillInterval = setInterval(() => {
        currentSkill = (currentSkill + 1) % skillRotation.length;
        setSkill(skillRotation[currentSkill], true);
    }, skillDisplayTime);
}

// Stop rotating text/
function endSkillRotation() {
    clearInterval(skillInterval)
}

// Type an induvidual character
let typeInterval;
let autoTimeout;
let charIndex = 0;

// Pass text for the typed text, and auto for wether to automatically delete the text after a set period.
function typeSkill(text, auto) {

    // Override
    document.getElementById("skill-description").textContent = text;
    return;



    // Reset
    clearInterval(typeInterval);
    clearTimeout(autoTimeout);
    document.getElementById("skill-description").textContent = "";
    charIndex = 0;

    // Add new typing
    typeInterval = setInterval(() => {
        if (charIndex >= text.length) {
            clearInterval(typeInterval);
            return;
        }
        typeCharacter(text[charIndex]);
        charIndex += 1;
    }, typingDelay);

    // After a set time, switch to delete
    if (auto) {
        autoTimeout = setTimeout(() => {
            typeInterval = setInterval(() => {
                if (charIndex < 0) {
                    clearInterval(typeInterval);
                    return;
                }
                removeCharacter();
                charIndex -= 1;
            }, deleteDelay);
        }, skillDisplayTime - (deleteDelay * (text.length + 5)))
    }
}

function typeCharacter(char) {
    document.getElementById("skill-description").textContent += char;
}

function removeCharacter() {
    document.getElementById("skill-description").textContent = document.getElementById("skill-description").textContent.slice(0, -1);
}


startSkillRotation();
setSkill("rust", true);

// Stop rotating text on user interaction to allow proper reading times and QOL.
document.querySelectorAll(".stop-skill-rotation").forEach(button => {
    button.addEventListener('click', endSkillRotation);
})

