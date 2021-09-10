/*jshint esversion: 9 */
import themeLoader from './theme-loader.mjs';
import Calculator from './calculator.mjs';

$(document).ready(ready);

function ready() {
    handleTheme();
    handleCalculator();
}

function handleTheme() {
    const checked = $('input[type=radio][name=theme]:checked');
    if (checked && checked[0]) {
        themeLoader(checked[0].id);
    } else {
        themeLoader('theme-1');
    }
    $('input[type=radio][name=theme]').change(function () {
        themeLoader(this.id);
    });
}

function handleCalculator() {
    const calculator = new Calculator();
    const display = $('#display-input');
    $('#keyboard a').click(function(){
        calculator.op($(this).text());

    });
    calculator.setListener((state) => {
        display.fadeOut(100, () => {
            display.val(state);
            display.fadeIn(100);
        });
    });
}


