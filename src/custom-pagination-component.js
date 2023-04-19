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
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
        this.bindPaginationEvents(template);
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
                this[pageAction]();
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