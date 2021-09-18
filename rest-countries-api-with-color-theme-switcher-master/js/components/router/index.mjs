/*jshint esversion: 9 */

export default class Router extends HTMLElement{

    static get observedAttributes() { return ['initialPage']; }

    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        const {shadowRoot} = this;
        const div = document.createElement('div'); 
        div.setAttribute("id", "router-content");
        const style = document.createElement('style');
        style.innerHTML = `
            div {
                width: 100%;
                min-height: 100vh;
                position: relative;
            }
        `;
        shadowRoot.appendChild(style);
        shadowRoot.append(div);

    }

    async connectedCallback() {
       
        //window.history.pushState(link);
        var link = this.getAttribute('initialPage');
        this.#push(link);
    }

    set initialPage(link) {
        console.log(link);
        this.setAttribute('initialPage', link);
        this.#push(link);
    }

    get initialPage(){
        return this.hasAttribute('initialPage');
    }

    async loadFile(path) {
        return fetch(path).then(stream => stream.text());
    }

    #push(link, html){
        fetch(link).then(stream => stream.text()).then(html => {
            const child = document.createElement('div'); 
            child.innerHTML = html.trim();
            this.shadowRoot.querySelector('#router-content').append(child);
        });
    }

    #pop(){
        
    }

}