import BaseComponent from '../base-component.mjs';

export default class FlagImage extends BaseComponent {

    static autoImportTemplates() {
        return false;
    }

    static get observedAttributes() { return ['src']; }

    render() {
        this.$('img').addEventListener('load', () => {
            this.$('loading-spinner').classList.add('hidden');
            this.$('img').classList.remove('hidden');
        });
        if (this.hasAttribute('src')) {
            this.#setSrc(this.getAttribute('src'));
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src') {
            this.#setSrc(newValue);
        }
    }

    #setSrc(value) {
        this.$('img').setAttribute('src', value);
        this.$('img').classList.add('hidden');
        this.$('loading-spinner').classList.remove('hidden');
    }

    template() {
        return `
        <style>
        :host{
            display: block;
            position: relative;
            oveflow: hidden;
            height: 100%;
            width: 100%;
        }
        
        .hidden {
            display: none;
        }
        
        img {
            object-fit: cover;
            margin: auto;
            width: 100%;
            height: 100%;
            max-width: 100%;
        }
        
        .loading-spinner-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        </style>
        <img class="hidden"></img>
        <div class="loading-spinner-container">
            <loading-spinner size="2rem" thickness="1px"></loading-spinner>
        </div>
        `;
    }

}