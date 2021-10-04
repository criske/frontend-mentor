/*jshint esversion: 9 */

export default class BaseComponent extends HTMLElement {

    static autoImportTemplates() {
        return true;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (!this.constructor.pendingQueue) {
            //init q for this component subclass-type
            //ex if Foo extends BaseComponent this q will be for Foo instances only;
            this.constructor.pendingQueue = new Queue();
        }
        if (!this.constructor.cachedTemplate) {
            // while fetching the template add to pending q the created sub class type instances;
            this.constructor.pendingQueue.offer(this);
            if (!this.constructor.cachedTemplatePending) {
                this.constructor.cachedTemplatePending = true; // flag to notify that template fetching is ongoing;
                (async () => {
                    let content = await this.createTemplateCache();
                    this.constructor.cachedTemplate = content;
                    //template is ready and add it to components from q and then discard them.
                    while (!this.constructor.pendingQueue.isEmpty) {
                        const component = this.constructor.pendingQueue.poll();
                        if (component.connected) {
                            component.#readyToRender(content);
                        }
                    }
                })();
            }
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

    #readyToRender(content) {
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

class Queue {
    #elements = [];

    offer(element) {
        this.#elements.push(element);
    }

    peek() {
        return this.#elements[0];
    }

    poll() {
        return this.#elements.shift();
    }

    get isEmpty() {
        return this.#elements.length == 0;
    }

    get length() {
        return this.#elements.length;
    }

}