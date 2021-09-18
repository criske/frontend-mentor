/*jshint esversion: 9 */

const THEMES = {

    "LIGHT": {
        '--clr-background': 'hsl(0, 0%, 98%)',
        '--clr-background-elements': 'hsl(0, 0%, 100%)',
        '--clr-text': 'hsl(200, 15%, 8%)',
        '--clr-input': 'hsl(0, 0%, 52%)',
    },

    "DARK": {
        '--clr-background': 'hsl(207, 26%, 17%)',
        '--clr-background-elements': 'hsl(209, 23%, 22%)',
        '--clr-text': 'hsl(0, 0%, 100%)',
        '--clr-input': 'hsl(0, 0%, 100%)'
    }
};

function setTheme(light, el) {
    let root = el || document.documentElement;
    let theme = light ? "LIGHT" : "DARK";
    for (const [key, value] of Object.entries(THEMES[theme])) {
        root.style.setProperty(key, value);
    }
}

let isLight = true;

const listeners = [];

export default function () {
    return {
        initial: (el) => {
            setTheme(isLight, el);
        },
        toggle: (el) => {
            isLight = !isLight;
            setTheme(isLight, el);
        },
        updateFor: (el) => {
            setTheme(isLight, el);
        } 
    };
}

export class ThemeToggleEvent extends CustomEvent {

    static name = "theme-toggle";

    constructor(){
        super(ThemeToggleEvent.name, {
            bubbles: true,
            composed: true
        });
    }
}
