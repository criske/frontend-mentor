/*jshint esversion: 9 */

import RouteEvent from "./route-event.mjs";

export default class Router extends HTMLElement {

    static get observedAttributes() { return ['initialPage']; }

    #zIndex = 0;

    #popStateListener = (e) => {
        if (e.state) {
            if (this.#zIndex < e.state.zIndex) {
                this.#push(e.state.link, false, e.state.zIndex);
            } else {
                this.#pop(e.state.zIndex);
            }
        } else {
            this.#pop(0);
        }
    };

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const { shadowRoot } = this;
        const div = document.createElement('div');
        div.setAttribute("id", "router-content");
        const style = document.createElement('style');
        style.innerHTML = `
            #router-content {
                width: 100%;
                min-height: 100vh;
                position: relative;
            }
        `;
        shadowRoot.appendChild(style);
        shadowRoot.append(div);
        this.shadowRoot.addEventListener(RouteEvent.name, (e) => {
            this.#zIndex++;
            this.#push(e.link, true, this.#zIndex);
        });
    }

    async connectedCallback() {
        var link = this.getAttribute('initialPage');
        window.addEventListener('popstate', this.#popStateListener);
        if (link) {
            this.#push(link, false, this.#zIndex);
        }
    }

    disconnectedCallback() {
        window.removeEventListener('popstate', this.#popStateListener);
    }

    set initialPage(link) {
        this.setAttribute('initialPage', link);
        this.#push(link, false, this.#zIndex);
    }

    get initialPage() {
        return this.hasAttribute('initialPage');
    }

    async loadFile(path) {
        return fetch(path).then(stream => stream.text());
    }

    #push(link, push, zIndex) {
        const el = link.split("?");
        const child = document.createElement('div');
        const page = document.createElement(el[0]);
        if (el.length == 2) {
            page.setAttribute('params', el[1]);
        }
        child.append(page);
        child.setAttribute("style", `zIndex: ${zIndex}; top: 0; left: 0; width: 100%; height:100%; position:absolute; background-color: var(--clr-background); `);
        const content = this.shadowRoot.querySelector('#router-content');
        if (content.lastChild != null) {
            content.lastChild.style.display = "none";
        }
        this.shadowRoot.querySelector('#router-content').append(child);
        if (push)
            window.history.pushState({ 
                zIndex, 
                link, 
                scroll: {
                    top: window.scrollY,
                    legt: window.scrollX
                } 
            }, zIndex, link);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    #pop(zIndex) {
        const content = this.shadowRoot.querySelector('#router-content');
        content.removeChild(content.lastChild);
        content.lastChild.style.display = "block";
        this.#zIndex = zIndex;
    }
}