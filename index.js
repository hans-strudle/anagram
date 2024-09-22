"use strict";

const PUZZLES = [
    {
        top_word: "adobe",
        top_description: "kind of clay",
        bottom_word: "abode",
        bottom_description: "place of residence",
        hints: [
            {type: "sentence", top: true, hint: "sun dried brick"},
            {type: "type", top: true, hint: "(Noun)"},
            {type: "type", top: false, hint: "(Noun)"},
            {type: "sentence", top: false, hint: "Humble."},
        ],
        letter_hints: [
            {letter: "O", pos: 2, top: true},
            {letter: "D", pos: 3, top: false}
        ],
    },
    {
        top_word: "reward",
        top_description: "winnings",
        bottom_word: "drawer",
        bottom_description: "a place to put your stuff",
        hints: [
            {type: "sentence", top: true, hint: "asdfasdf"},
            {type: "type", top: true, hint: "(Verb)"},
            {type: "type", top: false, hint: "(Noun)"},
            {type: "sentence", top: false, hint: "Clothes"},
        ],
        letter_hints: [
            {letter: "E", pos: 1, top: true},
            {letter: "E", pos: 4, top: false}
        ],
    },
    {
        top_word: "angle",
        top_description: "approach",
        bottom_word: "angel",
        bottom_description: "spiritual being",
        hints: [
            {type: "sentence", top: true, hint: "way to approach an issue"},
            {type: "type", top: true, hint: "(Noun)"},
            {type: "type", top: false, hint: "(Noun)"},
            {type: "sentence", top: false, hint: "messenger of god"},
        ],
        letter_hints: [
            {letter: "G", pos: 2, top: true},
            {letter: "E", pos: 3, top: false}
        ],
    },
    {
        top_word: "angle",
        top_description: "approach",
        bottom_word: "angel",
        bottom_description: "spiritual being",
        hints: [
            {type: "sentence", top: true, hint: "way to approach an issue"},
            {type: "type", top: true, hint: "(Noun)"},
            {type: "type", top: false, hint: "(Noun)"},
            {type: "sentence", top: false, hint: "messenger of god"},
        ],
        letter_hints: [
            {letter: "G", pos: 2, top: true},
            {letter: "E", pos: 3, top: false}
        ],
    },
    {
        top_word: "blamed",
        top_description: "assigned responsibility",
        bottom_word: "bedlam",
        bottom_description: "scene of uproar",
        hints: [
            {type: "sentence", top: true, hint: "placed fault on"},
            {type: "type", top: true, hint: "(Verb)"},
            {type: "type", top: false, hint: "(Noun)"},
        ],
        letter_hints: [
            {letter: "M", pos: 3, top: true},
            {letter: "E", pos: 1, top: false},
            {letter: "L", pos: 3, top: false}
        ],
    },
    {
        top_word: "conversation",
        top_description: "a chat",
        bottom_word: "conservation",
        bottom_description: "prevention of wast",
        hints: [
            {type: "type", top: true, hint: "(Noun)"},
            {type: "sentence", top: true, hint: "through talking"},
            {type: "type", top: false, hint: "(Noun)"},
            {type: "sentence", top: false, hint: "save the earth"},
        ],
        letter_hints: [
            {letter: "T", pos: 8, top: true},
            {letter: "E", pos: 4, top: false},
            {letter: "A", pos: 7, top: false},
            {letter: "A", pos: 7, top: true}
        ],
    },
    {
        top_word: "angle",
        top_description: "approach",
        bottom_word: "angel",
        bottom_description: "spiritual being",
        hints: [
            {type: "sentence", top: true, hint: "way to approach an issue"},
            {type: "type", top: true, hint: "(Noun)"},
            {type: "type", top: false, hint: "(Noun)"},
            {type: "sentence", top: false, hint: "messenger of god"},
        ],
        letter_hints: [
            {letter: "G", pos: 2, top: true},
            {letter: "E", pos: 3, top: false}
        ],
    },

];

var LocalStorage = {
    _PREFIX: '__ANAGRAM_',
    increment: (key) => {
        let item = localStorage.getItem(LocalStorage._PREFIX + key);
        let inc = parseInt(item);
        return localStorage.setItem(LocalStorage._PREFIX + key, inc + 1);
    },
    get_or_set: (key, val) => {
        let item = localStorage.getItem(LocalStorage._PREFIX + key);
        if (item) {
            return item;
        } else {
            localStorage.setItem(LocalStorage._PREFIX + key, val);
            return val;
        }
    },
    set: (key, val) => {
        return localStorage.setItem(LocalStorage._PREFIX + key, val);
    },
    get: (key) => {
        return localStorage.getItem(LocalStorage._PREFIX + key);
    }
}

function load() {
    console.log("Loading");
    const PUZZLE_COUNTER = LocalStorage.get_or_set('PUZZLE_COUNTER', 0);
    const CURRENT_PUZZLE = PUZZLES[PUZZLE_COUNTER];

    let top_word = CURRENT_PUZZLE.top_word;
    let bottom_word = CURRENT_PUZZLE.bottom_word;
    let top_description = CURRENT_PUZZLE.top_description;
    let bottom_description = CURRENT_PUZZLE.bottom_description;
    let hints = CURRENT_PUZZLE.hints;
    let letter_hints = CURRENT_PUZZLE.letter_hints;

    let letterHintCounter = 0;
    let hintCounter = 0;

    const getInputs = () => {
        return document.querySelectorAll("#inputs input");
    }

    const mainDiv = document.getElementById("main");
    mainDiv.style.opacity = 1;
    const topAnswerDiv = document.getElementById("top-answer");
    const bottomAnswerDiv = document.getElementById("bottom-answer");

    const topHintDiv = document.getElementById("top-hint");
    const bottomHintDiv = document.getElementById("bottom-hint");

    const hintButton = document.getElementById("hint");
    const letterHintButton = document.getElementById("letter");
    const checkButton = document.getElementById("check");
    const nextButton = document.getElementById("next");
    nextButton.disabled = true;
    const resetButton = document.getElementById("reset");
    resetButton.onclick = () => {
        localStorage.clear();
        window.location.reload();
    }

    const hintCountSpan = document.getElementById("hints-used");
    hintCountSpan.innerHTML = hintCounter;
    const letterHintCountSpan = document.getElementById("letters-shown");
    letterHintCountSpan.innerHTML = letterHintCounter;

    const currentPuzzleSpan = document.getElementById("current-puzzle");
    currentPuzzleSpan.innerHTML = PUZZLE_COUNTER;
    const totalPuzzleSpan = document.getElementById("total-puzzles");
    totalPuzzleSpan.innerHTML = PUZZLES.length;
    
    const topMainHintDiv = document.getElementById("top-main-hint");
    const bottomMainHintDiv = document.getElementById("bottom-main-hint");

    const topSentenceHintDiv = document.getElementById("top-sentence-hint");
    const bottomSentenceHintDiv = document.getElementById("bottom-sentence-hint");

    topMainHintDiv.innerHTML = top_description;
    bottomMainHintDiv.innerHTML = bottom_description; 

    hintButton.onclick = (e) => {
        let hint = hints[hintCounter];
        let hintDiv = hint.top ? topMainHintDiv : bottomMainHintDiv;
        switch (hint.type) {
            case "type":
                hintDiv.innerHTML += 
                    " <span class='type-hint'>" + hint.hint + "</span>";
                break;
            case "sentence":
                let div = hint.top ? 
                    topSentenceHintDiv : bottomSentenceHintDiv;
                div.innerHTML = hint.hint;
                div.style.opacity = 1;
                break;
        }
        hintCounter++;
        hintCountSpan.innerHTML = hintCounter;
    }

    letterHintButton.onclick = (e) => {
        let hint = letter_hints[letterHintCounter];
        let div = hint.top ? topAnswerDiv : bottomAnswerDiv;
        let i = div.children[hint.pos];
        i.value = hint.letter;
        i.disabled = true;
        letterHintCounter++;
        letterHintCountSpan.innerHTML = letterHintCounter;
    }

    checkButton.onclick = (e) => {
        console.log(topString, bottomString);
        let cl = ' incorrect';
        alert(topString)
        alert(bottomString)
        if (topString == top_word && bottomString == bottom_word) {
            cl = ' solved';
            nextButton.disabled = false;
            // alert("solved!");
        }
        let inputs = getInputs();
        for (let input of inputs) {
            input.className = 'charinput' + cl;
        }
    }

    nextButton.onclick = (e) => {
        mainDiv.style.opacity = 0;
        setTimeout(function(){
            // reset
            topAnswerDiv.innerHTML = '';
            bottomAnswerDiv.innerHTML = '';
            topSentenceHintDiv.innerHTML = '';
            bottomSentenceHintDiv.innerHTML = '';
            LocalStorage.increment('PUZZLE_COUNTER');
            load();
        }, 500);
        // load();
    }

    let topString = '';
    let bottomString = '';

    let onInput = (e) => {
        let back = e.inputType == 'deleteContentBackward';
        let trgt = e.target;
        let prv = trgt.previousElementSibling;
        if (back) {
            prv.focus()
            trgt.__ana == "top" ? 
                topString = topString.substring(0, topString.length - 1) :
                bottomString = bottomString.substring(0, bottomString.length - 1);
        } else {
            trgt.__ana == "top" ? 
                topString += e.data :
                bottomString += e.data;
        };
        let nxt = trgt.nextElementSibling;
        while (nxt && nxt.disabled) {
            nxt = nxt.nextElementSibling;
        }
        trgt.value ? (nxt && nxt.focus()) : (prv && prv.focus());
        console.log(topString, bottomString);
    }

    for (let w in top_word) {
        let inputElement = document.createElement("input");
        inputElement.pattern = "[A-Za-z]*";
        inputElement.__ana = "top";
        inputElement.className = "charinput";
        inputElement.maxLength = 1;
        inputElement.disabled = false;
        inputElement.addEventListener("input",onInput);
        topAnswerDiv.appendChild(inputElement);
    }

    for (let w in bottom_word) {
        let inputElement = document.createElement("input");
        inputElement.__ana = "bottom";
        inputElement.className = "charinput";
        inputElement.maxLength = 1;
        inputElement.disabled = false;
        inputElement.addEventListener("input",onInput);
        bottomAnswerDiv.appendChild(inputElement);
    }
    console.log("Done Loading");
}

window.addEventListener("load", load);
