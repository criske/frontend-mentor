/*jshint esversion: 9 */
import themeLoader from './theme-loader.mjs';

$(document).ready(ready);

function ready() {
    handleTheme();
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
