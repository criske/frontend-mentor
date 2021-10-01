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
        this.$('img').addEventListener('error', () => {
            this.$('loading-spinner').classList.add('hidden');
            this.$('svg').classList.remove('hidden');
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
            display: flex;
            position: relative;
            oveflow: hidden;
            height: 100%;
            width: 100%;
            align-items:center;
            justify-content:center;
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

        svg {
            width: 25%;
            opacity: .3;
        }

        </style>
        <img class="hidden"></img>
        <svg xmlns="http://www.w3.org/2000/svg" class="hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="loading-spinner-container">
            <loading-spinner size="2rem" thickness="1px"></loading-spinner>
        </div>
        `;
    }

}