import { CustomPagiantionMarkupUtil } from "./custom-pagination-markup.util.js";

export class CustomPagiantionComponent extends HTMLElement {
    totalCount;
    pages;
    pageSize = 10;
    currentPage = 1;

    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        this.render();
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return ['page-size', 'total-count', 'current-page'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'current-page' && oldValue !== newValue) {
            this.updateActivePage(newValue);
        } else if (oldValue !== null) {
            this.reRender();
        }
    }

    adoptedCallback() {

    }

    render() {
        fetch('custom-pagination-component.css')
            .then(stream => stream.text())
            .then(template => {
                const style = document.createElement('style');
                style.textContent = template;
                this.shadowRoot.append(style);

                this.totalCount = +this.getAttribute('total-count');
                this.pageSize = +this.getAttribute('page-size');
                this.pages = Math.ceil(this.totalCount / this.pageSize);
                
                CustomPagiantionMarkupUtil.createPageItems(this.shadowRoot, this.pages);
                this.setAttribute('current-page', 1);
                this.bindEvents();
            })
            .catch((error) => console.log(error));
    }

    bindEvents() {
        this.getPaginationElem().addEventListener('click', this.handlePageItemClick.bind(this));
    }

    handlePageItemClick(event) {
        const pageAction = event.target.dataset.action;
        if (pageAction) {
            this[pageAction](event);
        }
    }

    goToPage(event) {
        const pageNumLookup = {
            first: 1,
            prev: +this.currentPage - 1,
            next: +this.currentPage + 1,
            last: this.pages
        };
        const pageAction = event.target.dataset.action;
        const pageNum = event.target.dataset.pageNum;

        this.currentPage = pageNumLookup[pageNum] || pageNum;
        this.setAttribute('current-page', this.currentPage);

        this.dispatchEvent(new CustomEvent('custom-pagingation-click', {
            bubbles: true,
            composed: true,
            detail: { detail: "composed", pageAction, pageNum, pageSize: this.pageSize, event }
        }));
    }

    reRender() {
        this.unbindEvents();
        this.shadowRoot.innerHTML = '';
        this.render();
    }

    unbindEvents() {
        this.getPaginationElem().removeEventListener('click', this.handlePageItemClick.bind(this));
    }

    updateActivePage(newValue) {
        const currentActive = this.getPaginationElem().querySelector('.page-item.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        const newActive = this.getPaginationElem().querySelector(`[data-page-num="${newValue}"]`).closest('li');
        newActive.classList.add('active');

        const first = this.getPaginationElem().querySelector(`[data-page-num="first"]`).closest('li');
        const prev = this.getPaginationElem().querySelector(`[data-page-num="prev"]`).closest('li');
        const next = this.getPaginationElem().querySelector(`[data-page-num="next"]`).closest('li');
        const last = this.getPaginationElem().querySelector(`[data-page-num="last"]`).closest('li');

        if (+newValue === 1) {
            first.classList.add('disabled');
            prev.classList.add('disabled');
        } else {
            first.classList.remove('disabled');
            prev.classList.remove('disabled');
        }

        if (+newValue === this.pages) {
            next.classList.add('disabled');
            last.classList.add('disabled');
        } else {
            next.classList.remove('disabled');
            last.classList.remove('disabled');
        }
    }
    
    getPaginationElem() {
        return this.shadowRoot.querySelector('.pagination');
    }
}

customElements.define('custom-pagination-component', CustomPagiantionComponent);
