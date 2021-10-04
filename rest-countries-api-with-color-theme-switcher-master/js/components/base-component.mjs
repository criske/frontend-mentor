/*jshint esversion: 9 */

export default class BaseComponent extends HTMLElement {

    static autoImportTemplates() {
        return true;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (!this.constructor.cachedTemplate) {
            this.createTemplateCache().then(content => {
                this.constructor.cachedTemplate = content;
                if (this.connected) {
                    this.#readyToRender(content);
                }
            });
        }
    }

    connectedCallback() {
        this.connected = true;
        if (this.constructor.cachedTemplate) {
            const content = this.constructor.cachedTemplate;
            this.#readyToRender(content);
        }
    }

    get rendered() {
        return this.connected && this.constructor.cachedTemplate;
    }

    #readyToRender(content){
        const { shadowRoot } = this;
        const template = document.createElement('template');
        template.innerHTML = content;
        shadowRoot.innerHTML = '';
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.render();
    }

    render() { }

    templateFile() { }

    template() { return null; }

    cssFile() { }

    $(querySelector) {
        return this.shadowRoot.querySelector(querySelector);
    }

    dispatchEvent(event) {
        this.shadowRoot.dispatchEvent(event);
    }

    async loadFile(path) {
        return fetch(path).then(stream => stream.text());
    }

    #camelToHyphenClassName() {
        return this.constructor.name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).substring(1);
    }

    async createTemplateCache() {
        let content;
        if (this.constructor.autoImportTemplates()) {
            const name = this.#camelToHyphenClassName();
            const cssContent = await this.loadFile(`./js/components/${name}/${name}.css`);
            const css = `<style>${cssContent}</style>`;
            const html = await this.loadFile(`./js/components/${name}/${name}.html`);
            content = css + html.trim();
        } else {
            content = this.template();
            if (content === null) {
                const cssFile = this.cssFile();
                let css = '';
                if (cssFile) {
                    const cssContent = await this.loadFile(`./js/components${this.cssFile()}`);
                    css = `<style>${cssContent}</style>`;
                }
                const html = await this.loadFile(`./js/components${this.templateFile()}`);
                content = css + html.trim();
            }
        }
        return content;
    }
}