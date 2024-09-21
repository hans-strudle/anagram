"use strict";

const letter_hints = [
    {letter: "E", pos: 1, top: true},
    {letter: "E", pos: 4, top: false}
];

const hints = [
    {type: "sentence", top: true, hint: "asdfasdf"},
    {type: "type", top: true, hint: "(Verb)"},
    {type: "type", top: false, hint: "(Noun)"},
    {type: "sentence", top: false, hint: "Clothes"},
];

function load() {
    console.log("Loading");

    let word = "reward";
    let word2 = "drawer";

    let letterHintCounter = 0;
    let hintCounter = 0;

    const getInputs = () => {
        return document.querySelectorAll("#inputs input");
    }

    const mainDiv = document.getElementById("main");
    const topAnswerDiv = document.getElementById("top-answer");
    const bottomAnswerDiv = document.getElementById("bottom-answer");

    const topHintDiv = document.getElementById("top-hint");
    const bottomHintDiv = document.getElementById("bottom-hint");
    
    const hintButton = document.getElementById("hint");
    const letterHintButton = document.getElementById("letter");
    const checkButton = document.getElementById("check");
    
    const hintCountSpan = document.getElementById("hints-used");
    const letterHintCountSpan = document.getElementById("letters-shown");

    const topMainHintDiv = document.getElementById("top-main-hint");
    const bottomMainHintDiv = document.getElementById("bottom-main-hint");

    const topSentenceHintDiv = document.getElementById("top-sentence-hint");
    const bottomSentenceHintDiv = document.getElementById("bottom-sentence-hint");

    topMainHintDiv.innerHTML = 'winnings'; 
    bottomMainHintDiv.innerHTML = 'a place to put your things'; 

    hintButton.onclick = (e) => {
        let hint = hints[hintCounter];
        let hintDiv = hint.top ? topMainHintDiv : bottomMainHintDiv;
        switch (hint.type) {
            case "type":
                console.log("type hint");
                hintDiv.innerHTML += " <span class='type-hint'>" + hint.hint + "</span>";
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
        if (topString == word && bottomString == word2) {
            cl = ' solved';
            // alert("solved!");
        }
        let inputs = getInputs();
        for (let input of inputs) {
            input.className = 'charinput' + cl;
        }
    }

    let topString = '';
    let bottomString = '';

    let onInput = (e) => {
        console.log(e);
        console.log(e.target.parent);

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
        trgt.value ? nxt.focus() : prv.focus();
        console.log(topString, bottomString);
    }


    for (let w in word) {
        console.log(w);
        let inputElement = document.createElement("input");
        inputElement.pattern = "[A-Za-z]*";
        inputElement.__ana = "top";
        inputElement.className = "charinput";
        inputElement.maxLength = 1;
        inputElement.disabled = false;
        inputElement.addEventListener("input",onInput);
        topAnswerDiv.appendChild(inputElement);
    }

    for (let w in word2) {
        console.log(w);
        let inputElement = document.createElement("input");
        inputElement.__ana = "bottom";
        inputElement.className = "charinput";
        inputElement.maxLength = 1;
        inputElement.disabled = false;
        inputElement.addEventListener("input",onInput);
        bottomAnswerDiv.appendChild(inputElement);
    }

    // const inputs = document.getElementsByTagName("input");
    // for (let input of inputs) {
    //     console.log(input);
    //     input.disabled = true;
    // }
}

window.addEventListener("load", load);
