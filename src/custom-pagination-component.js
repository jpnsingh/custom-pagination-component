export class CustomPagiantionComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('custom-pagination-component added to page.');
        fetch("custom-pagination-component.html")
            .then(stream => stream.text())
            .then(template => this.render(template))
            .catch((error) => console.log(error));
    }

    render(templateHtml) {
        const template = document.createElement('template');
        template.innerHTML = templateHtml;
        const shadowRoot = this.attachShadow({ mode: "open" });
        // shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.innerHTML = templateHtml;

        document.addEventListener('page-item-click', event => alert(event.detail));

        console.log(this.shadowRoot.querySelector('.pagination'));
        this.shadowRoot.querySelector('.pagination').onclick = e => alert("Inner target: " + e.target.tagName);
        document.onclick = e => alert("Outer target: " + e.target.tagName);

        this.bindPaginationEvents(this.shadowRoot.querySelector('.pagination'));
    }

    bindPaginationEvents(elem) {
        elem.addEventListener('click', event => {
            const pageAction = event.target.dataset.action;
            if(pageAction) {
                const pageItem = event.target.closest('.page-item');
                const currentActive = elem.querySelector('.pagination .page-item.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                pageItem.classList.add('active');
                console.log(pageAction);
                elem.dispatchEvent(new CustomEvent('page-item-click', {
                    bubbles: true,
                    composed: true,
                    detail: "composed"
                }));
                // this[pageAction]();
            }
        });
    }

    disconnectedCallback() {
        console.log('custom-pagination-component removed from the page.');
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    adoptedCallback() {

    }
}

customElements.define('custom-pagination-component', CustomPagiantionComponent);