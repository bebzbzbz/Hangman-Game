import { playHangman } from "./app";

export const generatedKeys = () : HTMLButtonElement[] => {
    const keyboard = document.querySelector("#keyboard");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    const keys : HTMLButtonElement[] = [];

    for(const letter of alphabet) {
        const key = document.createElement("button");
        key.textContent = letter;
        key.setAttribute("value", letter);
        key.addEventListener("click", () => {
            playHangman(key);
        })

        keys.push(key);

        if(keyboard) {
            keyboard.appendChild(key);
        }
    }
    return keys;
}