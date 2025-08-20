"use strict";

const PUZZLES = [
    {
        top_word: "forest",
        top_description: "NATURE vs NURTURE",
        bottom_word: "foster",
        bottom_description: "place of residence",
        hints: [
            {type: "sentence", top: true, hint: "sun dried brick"},
            {type: "type", top: true, hint: "(Noun)"},
            {type: "type", top: false, hint: "(Noun)"},
            {type: "sentence", top: false, hint: "Humble."},
        ],
        descriptions: [
            {answer: "FACE OFF", desc: "BATTLE (2)", p: 0},
            {answer: "ORZO", desc: "PASTA TYPE", p: 1},
            {answer: "REGISTER", desc: "COMPREHEND", p: 5},
            {answer: "EDGE", desc: "BORDER", p: 4},
            {answer: "STRESS", desc: "WORRY", p: 2},
            {answer: "TAUNT", desc: "MOCK", p: 3},
        ],
        matches: [
            0, 1, 5, 4, 2, 3
        ],
        letter_hints: [
            {letter: "O", pos: 2, top: true},
            {letter: "D", pos: 3, top: false}
        ],
    },
    {
        top_word: "march",
        top_description: "LUCK",
        bottom_word: "charm",
        bottom_description: "",
        hints: [
            {type: "sentence", top: true, hint: "sun dried brick"},
            {type: "type", top: true, hint: "(Noun)"},
            {type: "type", top: false, hint: "(Noun)"},
            {type: "sentence", top: false, hint: "Humble."},
        ],
        descriptions: [
            {answer: "MAUSELEUM", desc: "TOMB", p: 0},
            {answer: "ARENA", desc: "STADIUM", p: 1},
            {answer: "ROSTER", desc: "LIST", p: 5},
            {answer: "CIVIC", desc: "MUNICIPAL", p: 2},
            {answer: "HUNCH", desc: "SUSPICION", p: 4},
        ],
        matches: [
            4, 2, 3, 0, 1
        ],
        letter_hints: [
            {letter: "O", pos: 2, top: true},
            {letter: "D", pos: 3, top: false}
        ],
    },
    ];
const colors = [
    "#e97abb",
    "#e5868e",
    // "#dfe690",
    "#85eab7",
    "#6abefa",
    "#6e91f9",
    "#8578fa",
    "#cf83fb",
    "#ebebac"
]


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
    localStorage.clear();
    console.log("Loading");
    const PUZZLE_COUNTER = LocalStorage.get_or_set('PUZZLE_COUNTER', 0);
    const CURRENT_PUZZLE = PUZZLES[PUZZLE_COUNTER];

    let top_word = CURRENT_PUZZLE.top_word;
    let bottom_word = CURRENT_PUZZLE.bottom_word;
    let top_description = CURRENT_PUZZLE.top_description;
    let bottom_description = CURRENT_PUZZLE.bottom_description;
    let hints = CURRENT_PUZZLE.hints;
    let letter_hints = CURRENT_PUZZLE.letter_hints;
    let descriptions = CURRENT_PUZZLE.descriptions;
    let matches = CURRENT_PUZZLE.matches;

    let letterHintCounter = 0;
    let hintCounter = 0;
    let currentDescriptionCounter = 0;

    const getInputs = () => {
        return document.querySelectorAll("#inputs input");
    }

    const mainDiv = document.getElementById("main");
    mainDiv.style.opacity = 1;
    const topAnswerDiv = document.getElementById("top-answer");
    const bottomAnswerDiv = document.getElementById("bottom-answer");
    const currentGuessInput = document.getElementById('current-guess');
    const currentGuessButton = document.getElementById('check-desc');

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
    const descriptionList = document.getElementById("description-list");

    const topSentenceHintDiv = document.getElementById("top-sentence-hint");
    const bottomSentenceHintDiv = document.getElementById("bottom-sentence-hint");

    topMainHintDiv.innerHTML = top_description;
    // bottomMainHintDiv.innerHTML = bottom_description; 
    console.log(descriptions);
    let currentDescription = descriptions[currentDescriptionCounter];
    currentGuessInput.placeholder = currentDescription.desc;
    currentGuessInput.oninput = function(e) {
        let g = e.target.value;
        let first = g[0];
        console.log(currentDescriptionCounter, first);
        let inputs = Array.from(getInputs());
        if (g.length == 1) {
            inputs[currentDescriptionCounter].value = first;
            console.log(matches[currentDescriptionCounter]);
            inputs[matches[currentDescriptionCounter] + top_word.length].value = first
            // inputs[currentDescriptionCounter].dispatchEvent(new Event('input'));

        }
        console.log(g);
    }
    currentGuessButton.onclick = function(e) {
        currentDescription = descriptions[currentDescriptionCounter];
        let guess = currentGuessInput.value.toUpperCase();
        let first = guess[0];
        let last = guess[guess.length - 1];
        let answer = currentDescription.answer.toUpperCase();
        if (first == last && first == answer[0] ) {
            console.log("GOOD!");
            currentGuessInput.className = 'solved';
            tops[currentDescriptionCounter].value = guess[0];
            tops[currentDescriptionCounter].dispatchEvent(new Event('input'));
            revealAnswer(currentDescriptionCounter);
        } else {
            currentGuessInput.className = 'incorrect';
        }
    }
    for (let i in descriptions) {
        let d = descriptions[i];
        let li = document.createElement("li");
        li.className = 'description';
        li.style.color = colors[i];
        let a = document.createElement('a');
        a.style.color = colors[i];
        a.innerHTML = d.desc;
        a.href = '';
        a.__idx = i;
        a.onclick = (e) => {
            e.preventDefault();
            let idx = parseInt(e.target.__idx);
            currentDescriptionCounter = idx;
            let currentDescription = descriptions[idx];
            currentGuessInput.className = '';
            currentGuessInput.placeholder = currentDescription.desc;
            currentGuessInput.value = '';
            return false;
        }
        li.appendChild(a);
        descriptionList.appendChild(li);
    }

    /*hintButton.onclick = (e) => {
        let hint = hints[hintCounter];
        let hintDiv = hint.top ? topMainHintDiv : bottomMainHintDiv;
        switch (hint.type) {
            case "type":
                let span = document.createElement('span');
                span.className = 'type-hint';
                span.innerHTML = hint.hint;
                hintDiv.appendChild(span);
                //hintDiv.innerHTML += 
                //    " <span class='type-hint'>" + hint.hint + "</span>";
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
    }*/

    /*letterHintButton.onclick = (e) => {
        let hint = letter_hints[letterHintCounter];
        let div = hint.top ? topAnswerDiv : bottomAnswerDiv;
        let i = div.children[hint.pos];
        i.value = hint.letter;
        i.disabled = true;
        letterHintCounter++;
        letterHintCountSpan.innerHTML = letterHintCounter;
    }*/

    let revealAnswer = (idx) => {
        let descs = descriptionList.children;
        console.log(descs[idx]);
        descs[idx].innerHTML += '&nbsp; - &nbsp;' + descriptions[idx].answer;

    }

    checkButton.onclick = (e) => {
        let cl = ' incorrect';
        const topInputs = document.querySelectorAll('#top-answer input');
        const bottomInputs = document.querySelectorAll('#bottom-answer input');

        const topLetters = Array.from(topInputs);
        const botLetters = Array.from(bottomInputs);

        const topAnswer = topLetters
            .map(e => e.value)
            .join('')
            .toLowerCase();
        const bottomAnswer = botLetters
            .map(e => e.value)
            .join('')
            .toLowerCase();

        console.log(topAnswer, bottomAnswer);

        if (topAnswer == top_word.toLowerCase() && bottomAnswer == bottom_word.toLowerCase()) {
            cl = ' solved';
            nextButton.disabled = false;
            // alert("solved!");
        }
        let inputs = Array.from(getInputs());
        for (let i in inputs) {
            if (inputs[i].value == top_word[i] ||
                inputs[i].value == bottom_word[i - bottom_word.length]) {
                // Letter is in correct place
                inputs[i].className = 'charinput solved'
                if (inputs[i].value == top_word[i] && !inputs[i].disabled) {
                    revealAnswer(i);
                }
                inputs[i].disabled = true;
            } else {
                inputs[i].className = 'charinput incorrect'
                inputs[i].value = '';

            }
            
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
        }, 50);
        // load();
    }

    let onInput = (e) => {
        let back = e.inputType == 'deleteContentBackward';
        console.log(e);
        let trgt = e.target;
        let prv = trgt.previousElementSibling;
        if (back) {
            prv?.focus()
        }
        let nxt = trgt.nextElementSibling;
        while (nxt && nxt.disabled) {
            nxt = nxt.nextElementSibling;
        }
        trgt.value ? (nxt && nxt.focus()) : (prv && prv.focus());
        // console.log(topString, bottomString);
        let inputs = Array.from(getInputs());
        let match = inputs[trgt.__match];
        match.value = trgt.value;
        console.log(match);
    }

    let counter = 0;

    let drawLine = (e1, e2) => {
        // var b1 = document.getElementById('btn1').getBoundingClientRect();
        // var b2 = document.getElementById('btn2').getBoundingClientRect();
        var b1 = e1.getBoundingClientRect();
        var b2 = e2.getBoundingClientRect();
        console.log(b1);
        console.log(b2);
        var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLine.setAttribute('id', 'line1');

        let fleft = b1.left + b1.width / 2;
        let ftop = b1.top +  b1.height;
        let lleft = b2.left + b2.width / 2;
        let ltop = b2.top; 

        if (fleft > lleft) {
            console.log(fleft, lleft);
            let t = fleft;
            let t2 = ftop;
            fleft = lleft;
            ftop = ltop
            lleft = t;
            ltop = t2;
        };

        newLine.setAttribute('x1', fleft);
        newLine.setAttribute('y1', ftop);
        newLine.setAttribute('x2', lleft);
        newLine.setAttribute('y2', ltop);

        let d = `M${fleft} ${ftop} L${lleft} ${ltop}`;
        let color = colors[counter];
        newLine.setAttribute('style', `stroke: ${color}; stroke-width: 2;`);
        // document.getElementById("line").append(newLine);
        var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        newPath.setAttribute('d', d);
        newPath.setAttribute('id', 'textPath' + counter);
        newPath.__idx = counter;
        newPath.setAttribute('style', `cursor: pointer; pointer-events: all; stroke: ${color}; stroke-width: 2;`);
        document.getElementById("line").append(newPath);
        let currentDescription = descriptions[counter].desc;
        let descClick = (e) => {
            let idx = e.target.__idx;
            currentDescriptionCounter = idx;
            let currentDescription = descriptions[idx];
            currentGuessInput.className = '';
            currentGuessInput.placeholder = currentDescription.desc;
            currentGuessInput.value = '';
            console.log(e);
        }

        newPath.addEventListener("click", descClick)

        var txtPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
        var txt= document.createElementNS('http://www.w3.org/2000/svg', 'text');
        var midx = ((b1.left + b1.width / 2) + (b2.left + b2.width / 2)) / 2
        var midy = ((b1.top + b1.height / 2) + (b2.top + b2.height / 2)) / 2
        // txt.setAttribute('x', midx);
        // txt.setAttribute('y', midy);
        // txt.setAttribute('rotate', 90);
        txt.__idx = counter;
        txtPath.__idx = counter;
        txtPath.setAttribute('href', '#textPath' + counter);
        counter++;
        txtPath.setAttribute('startOffset', '10%');
        txtPath.innerHTML = currentDescription;
        txt.setAttribute('class', 'hintText');
        txt.setAttribute('style', `cursor: pointer; pointer-events: all; stroke: ${color}; stroke-width: 2;`);
        txtPath.setAttribute('class', 'hintText');
        document.getElementById("line").append(txt);
        txt.appendChild(txtPath);
        txt.addEventListener("click", descClick)
    }

    let tops = [];
    let bots = [];

    for (let w in top_word) {
        console.log(w);
        let inputElement = document.createElement("input");
        inputElement.pattern = "[A-Za-z]*";
        inputElement.__ana = "top";
        inputElement.className = "charinput";
        inputElement.maxLength = 1;
        // inputElement.disabled = true;
        inputElement.__position = parseInt(w);
        inputElement.__match = matches[parseInt(w)] + top_word.length;
        inputElement.addEventListener("input",onInput);
        topAnswerDiv.appendChild(inputElement);
        tops.push(inputElement);
    }

    for (let w in bottom_word) {
        let revMatch = matches.indexOf(parseInt(w));
        let inputElement = document.createElement("input");
        inputElement.pattern = "[A-Za-z]*";
        inputElement.__ana = "bottom";
        inputElement.className = "charinput";
        inputElement.maxLength = 1;
        // inputElement.disabled = true;
        inputElement.__position = parseInt(w) + top_word.length;
        inputElement.__match = revMatch;
        inputElement.addEventListener("input",onInput);
        bottomAnswerDiv.appendChild(inputElement);
        bots.push(inputElement);
    }
    for (let i = 0; i< matches.length; i++) {
        console.log('match: ', i, matches[i]);
        drawLine(tops[i], bots[matches[i]]);
    }
    console.log("Done Loading");
}

window.addEventListener("load", load);
