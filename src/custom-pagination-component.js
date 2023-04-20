export class CustomPagiantionComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('custom-pagination-component added to page.');
        fetch('custom-pagination-component.html')
            .then(stream => stream.text())
            .then(template => this.render(template))
            .catch((error) => console.log(error));
    }

    render(templateHtml) {
        const shadowRoot = this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = templateHtml;
        this.bindPaginationEvents(this.shadowRoot.querySelector('.pagination'));
    }

    bindPaginationEvents(paginationElem) {
        document.addEventListener('page-item-click', event => console.log(event.detail));
        paginationElem.addEventListener('click', event => {
            const pageAction = event.target.dataset.action;
            if(pageAction) {
                const pageItem = event.target.closest('.page-item');
                const currentActive = paginationElem.querySelector('.pagination .page-item.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                pageItem.classList.add('active');
                console.log(pageAction);
                paginationElem.dispatchEvent(new CustomEvent('page-item-click', {
                    bubbles: true,
                    composed: true,
                    detail: "composed"
                }));
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