/*jshint esversion: 9 */

export default class BaseComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const {shadowRoot} = this;
        const template = document.createElement('template'); 

        const cssFile = this.cssFile();
        let css = '';
        if(cssFile){
            const content = await this.loadFile(`./js/components${this.cssFile()}`);
            css = `<style>${content}</style>`;
        }
        const html = await this.loadFile(`./js/components${this.templateFile()}`);
        template.innerHTML = css + html.trim();
        shadowRoot.innerHTML = '';
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.render();
    }

    render(){}

    templateFile(){}

    cssFile() {}

    $(querySelector) {
        return this.shadowRoot.querySelector(querySelector);
    }

    async loadFile(path) {
        return fetch(path).then(stream => stream.text());
    }
}