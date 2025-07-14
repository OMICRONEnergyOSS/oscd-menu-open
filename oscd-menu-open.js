function newOpenEvent(doc, docName) {
    return new CustomEvent('oscd-open', {
        bubbles: true,
        composed: true,
        detail: { doc, docName },
    });
}

class OscdMenuOpen extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.addEventListener('click', (event) => {
            event.target.value = '';
        });
        this.input.addEventListener('change', this.openDoc.bind(this));
        shadow.appendChild(this.input);
    }
    run() {
        this.input.click();
    }
    async openDoc(event) {
        const file = event.target?.files?.item(0);
        if (!file) {
            return;
        }
        const text = await file.text();
        const docName = file.name;
        const doc = new DOMParser().parseFromString(text, 'application/xml');
        this.dispatchEvent(newOpenEvent(doc, docName));
        this.input.onchange = null;
    }
}

export { OscdMenuOpen as default };
//# sourceMappingURL=oscd-menu-open.js.map
