/*jshint esversion: 9 */
const THEMES = {
    "theme-1" : {
        '--main-background': 'hsl(222, 26%, 31%)',

        '--screen-background': 'hsl(224, 36%, 15%)',

        '--keypad-background': 'hsl(223, 31%, 20%)',

        '--key-color': 'hsl(221, 14%, 31%)',
        '--key-background': 'rgb(234, 227, 219)',
        '--key-shadow': 'hsl(28, 16%, 65%)',

        '--key-color-special': 'white',
        '--key-background-special': 'hsl(225, 21%, 49%)',
        '--key-shadow-special': 'hsl(224, 28%, 35%)',

        '--key-color-special-eq': 'white',
        '--key-background-special-eq': 'hsl(6, 63%, 50%)',
        '--key-shadow-special-eq': 'hsl(6, 70%, 34%)',

        '--text-color': 'white',
    },
    "theme-2" : {
        '--main-background': 'hsl(0, 0%, 90%)',

        '--screen-background': 'hsl(0, 0%, 93%)',

        '--keypad-background': 'hsl(0, 5%, 81%)',

        '--key-color': 'hsl(60, 10%, 19%)',
        '--key-background': 'hsl(35, 11%, 61%)',
        '--key-shadow': 'hsl(28, 16%, 65%)',

        '--key-color-special': 'white',
        '--key-background-special': 'hsl(185, 42%, 37%)',
        '--key-shadow-special': 'hsl(185, 58%, 25%)',

        '--key-color-special-eq': 'white',
        '--key-background-special-eq': 'hsl(25, 98%, 40%)',
        '--key-shadow-special-eq': 'hsl(25, 99%, 27%)',

        '--text-color': 'hsl(60, 10%, 19%)',
    },
    "theme-3" : {
        '--main-background': 'hsl(268, 75%, 9%)',

        '--screen-background': 'hsl(268, 71%, 12%)',

        '--keypad-background': 'hsl(268, 71%, 12%)',

        '--key-color': 'hsl(52, 100%, 62%)',
        '--key-background': 'hsl(268, 47%, 21%)',
        '--key-shadow': 'hsl(290, 70%, 36%)',

        '--key-color-special': 'white',
        '--key-background-special': 'hsl(281, 89%, 26%)',
        '--key-shadow-special': 'hsl(285, 91%, 52%)',

        '--key-color-special-eq': 'hsl(198, 20%, 13%)',
        '--key-background-special-eq': 'hsl(176, 100%, 44%)',
        '--key-shadow-special-eq': 'hsl(177, 92%, 70%)',

        '--text-color': 'hsl(52, 100%, 62%)',
    },
};

export default function(theme){
    for (const [key, value] of Object.entries(THEMES[theme])) {
        $(':root').css(key, value);
    }
}