/*jshint esversion: 6 */
import State from './state.mjs';
import View from './view.mjs';
import Actions from './actions.mjs';

function runMenu() {
    const state = new State();
    const view = new View("menu");
    view.setListener((action, data) => {
        switch (action) {
            case Actions.TOGGLE: {
                state.toggle();
                break;
            }
            case Actions.SELECTED: {
                state.select(data);
                break;
            }
            case Actions.LOADING: {
                break;
            }
        }
    });
    view.expand();

    state.setListener((action, state) => {
        switch (action) {
            case Actions.TOGGLE: {
                view.expand(state.expanded);
                break;
            }
            case Actions.ENTRIES: {
                view.entries(state.entries);
                break;
            }
            case Actions.SELECTED: {
                const selected = state.entries[state.selected];
                view.selected(selected);
                $('#frontend-mentor-display').attr("src", selected.path);
                $('#frontend-mentor-display-link').attr("href", selected.path);
                $('#frontend-mentor-comparator-link').attr("href", `/comparator#${selected.path.replace('./','')}`);
                if(selected.solution) {
                    $('.challenge-links > a').attr("href", selected.solution);
                    $('.challenge-links > a').attr('target','_blank');
                    $('.challenge-links > a').text("completed");
                }else{
                    $('.challenge-links > a').attr("href", "#");
                    $('.challenge-links > a').text("in-progress");
                    $('.challenge-links > a').attr('target','_self');
                }
                break;
            }
        }
    });

    $.get("./challenges.json", (entries) => state.entries(entries));
}

$(document).ready(runMenu);