/*jshint esversion: 9 */

const COMMON = {
    '--radius': '.3rem',
    '--box-shadow': '0px 0px 10px 0px rgba(0,0,0,0.2)'
};

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
        '--clr-input': 'hsl(0, 0%, 100%)',
    }
};

function setTheme(light, el) {
    let root = el || document.documentElement;
    let theme = light ? "LIGHT" : "DARK";
    const selected = THEMES[theme];
    for (const [key, value] of Object.entries({ ...COMMON, ...selected })) {
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
        changeTheme: (changedLight, el) => {
            isLight = changedLight;
            setTheme(isLight, el);
        },
        updateFor: (el) => {
            setTheme(isLight, el);
        },
        isLight: () => isLight
    };
}

export class ThemeToggleEvent extends CustomEvent {

    static name = "theme-toggle";

    constructor() {
        super(ThemeToggleEvent.name, {
            bubbles: true,
            composed: true
        });
    }
}
