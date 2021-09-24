/*jshint esversion: 9 */

export default class BaseComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const {shadowRoot} = this;
        const template = document.createElement('template'); 

        let content = this.template();
        if(content === null){
            const cssFile = this.cssFile();
            let css = '';
            if(cssFile){
                const cssContent = await this.loadFile(`./js/components${this.cssFile()}`);
                css = `<style>${cssContent}</style>`;
            }
            const html = await this.loadFile(`./js/components${this.templateFile()}`);
            content = css + html.trim();
        }
        template.innerHTML = content;
        shadowRoot.innerHTML = '';
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.render();
    }

    render(){}

    templateFile(){}

    template(){ return null; }

    cssFile() {}

    $(querySelector) {
        return this.shadowRoot.querySelector(querySelector);
    }

    dispatchEvent(event) {
        this.shadowRoot.dispatchEvent(event);
    }

    async loadFile(path) {
        return fetch(path).then(stream => stream.text());
    }
}