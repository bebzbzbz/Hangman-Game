import { words } from "./words";
import { generatedKeys } from "./generateKeys"

let randomIndex : number;
let randomWordArray : string[] = [];
let hiddenWordArray : string[] = [];
let chances : number;
const guessWordField = document.querySelector<HTMLParagraphElement>("#guess-word-field");

const keys = generatedKeys();

// SET COUNTER
const counterField = document.querySelector<HTMLParagraphElement>("#counter");
let currentCounter = 0;

function count() : void {
    if(counterField) {
        counterField.innerHTML = `chances <br> ${currentCounter} : ${chances}`
    }
}

function generateWord() : void {
    // GENERATE WORD
    randomIndex = Math.floor(Math.random() * (words.length - 1));
    randomWordArray = (words[randomIndex]).toUpperCase().split("");
    console.log(randomWordArray);

    // ENCRYPT WORD
    hiddenWordArray = randomWordArray.map((letter) => letter.replace(letter, "●"));

    // ADD WORD TO FIELD
    if(guessWordField) {
        guessWordField.innerText = hiddenWordArray.join("");
    }

    // GENERATE CHANCES FROM WORD LENGTH
    chances = Math.round(randomWordArray.length * 0.75);
    count();
}
generateWord();
export function playHangman(key : HTMLButtonElement) : void {
    // DISABLE BUTTON WHEN CLICKED
    key.disabled = true;
    key.classList.add("disabled")

    // GET VALUE OF CLICKED BUTTON
    const value = key.value;

    // CHECK IF CLICKED VALUE OF BUTTON IS PART OF WORD
    if(randomWordArray.includes(value)) {
        let letterIndeces : number[] = [];

        // IF SO, FIND INDEX OF LETTER IN WORD
        for(let i = 0; i < randomWordArray.length; i++) {
            if(randomWordArray[i] === value) {
                letterIndeces.push(i);
            }
        }

        // AND REVEAL LETTER IN INDEX IN HIDDEN WORD
        letterIndeces.map((index) => {
            hiddenWordArray[index] = value;
        })

        // ADD UPDATED HIDDEN WORD TO FIELD
        if(guessWordField) {
            guessWordField.innerText = hiddenWordArray.join("");

            // IF WORD IS FULLY GUESSED
            if(!hiddenWordArray.includes("●")) {
                window.alert("You won! Congracts");
                keys.forEach((key) => key.disabled = true);
            }
        }
    } else {
        // IF GUESSED LETTER IS WRONG, UPDATE COUNT
        currentCounter++;
        count();

        // IF ALL CHANCES ARE USED UP
        if(currentCounter === chances) {
            window.alert("You lost! Try again")
            keys.forEach((key) => key.disabled = true)
        }
    }
}

// GENERATE NEW WORD WHEN BTN CLICKED AND ADD TO FIELD
const newWordBtn = document.querySelector("#new-word-btn");
if(newWordBtn) {
    newWordBtn.addEventListener("click", () => {
        // GENERATE NEW WORD
        generateWord();

        // RESET COUNT
        currentCounter = 0;
        count();

        // REACTIVATE KEYS
        keys.forEach((key) => {
            key.disabled = false;
            key.classList.remove("disabled")
        });
    });
}