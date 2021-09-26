import BaseComponent from "../base-component.mjs";

export default class LoadingSpinner extends BaseComponent {

    static autoImportTemplates() {
        return false;
    }

    render(){
        if(this.hasAttribute('size')){
            const value = this.getAttribute('size');
            this.shadowRoot.host.style.setProperty("--size", value);
        }
        if(this.hasAttribute('thickness')){
            const value = this.getAttribute('thickness');
            this.shadowRoot.host.style.setProperty("--thickness", value);
        }
    }

    template() {
        return  `
            <style>
                :host {
                    --size: 3rem;
                    --thickness: .2rem;
                }
                .loader {
                    border: var(--thickness) solid var(--clr-background-elements); 
                    border-top: var(--thickness) solid gray;
                    border-radius: 50%;
                    width: var(--size);
                    height: var(--size);
                    animation: spin 2s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
            <div id="loader" class="loader"></div>
        `;
    }
}