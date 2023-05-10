export class CustomPagiantionMarkupUtil {
    static createPageItems(shadowRoot, pages) {
        const pageList = document.createElement('ul');
        pageList.classList.add('pagination');
        shadowRoot.append(pageList);
        
        pageList.appendChild(this.createPageItem('first', '<<'));
        pageList.appendChild(this.createPageItem('prev', '<'));

        for (let page = 1; page <= pages; ++page) {
            const pageItem = this.createPageItem(page, page);
            pageList.appendChild(pageItem);
        }
        
        pageList.appendChild(this.createPageItem('next', '>'));
        pageList.appendChild(this.createPageItem('last', '>>'));
    }

    static createPageItem(page, text) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.appendChild(this.createPageItemLink(page, text));
        return pageItem;
    }

    static createPageItemLink(page, text) {
        const pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.setAttribute('data-action', 'goToPage');
        pageLink.setAttribute('data-page-num', page);
        pageLink.appendChild(document.createTextNode(text));
        return pageLink;
    }
}