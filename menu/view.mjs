/*jshint esversion: 9 */
import Actions from './actions.mjs';
import Queue from './queue.mjs';

export default class View {

    #listener = (action) => {};

    #queue = new Queue();

    #loading = true;

    #menuEntryTemplate;

    constructor(id) {
        const dis = this;
        $('#menu').css("position", "relative");
        $.get('./menu/templates/menu.mustache', (template) => {
                var rendered = Mustache.render(template);
                $('#menu').append(rendered);
                $('#menu_container_top').click(() => {
                    this.#listener(Actions.TOGGLE);
                });
                $.get('./menu/templates/menu_entry.mustache', (template) => {
                    this.#menuEntryTemplate = template;
                    while(!this.#queue.isEmpty()){
                        this.#queue.poll()();
                    }
                    this.#loading = false;
                    this.#listener(Actions.LOADING, this.#loading);
                });
        });
        
    }

    expand(expanded) {
        this.#enqueueOrExecute(() => $('#menu_container_list').slideToggle());
    }

    entries(entries) {
        const dis = this;
        this.#enqueueOrExecute(() => {
            $('#menu_container_list > div').remove();
            entries.forEach(entry => {
                var rendered = Mustache.render(this.#menuEntryTemplate, { name: entry.name });
                $('#menu_container_list').append(rendered);
            });
           
            $('#menu_container_list > div').click(function() {
                dis.#listener(Actions.SELECTED, $(this).index());
            });
        });
    }

    selected(entry){
        this.#enqueueOrExecute(() => $('#menu_container_top').text(entry.name));
    }

    setListener(listener) {
        this.#listener = listener;
        this.#listener(Actions.LOADING, this.#loading);
    }

    #enqueueOrExecute(action){
        if(!this.#loading){
            action();
        }else{
            this.#queue.offer(action);
        }
    }

}