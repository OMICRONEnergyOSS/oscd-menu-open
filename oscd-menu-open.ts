import { html, LitElement } from 'lit';
import { query } from 'lit/decorators.js';

import { newOpenEvent } from '@omicronenergy/oscd-api/utils.js';

export default class OscdOpen extends LitElement {
  @query('input')
  input!: HTMLInputElement;

  async run() {
    this.input.click();
  }

  async openDoc(event: Event): Promise<void> {
    const file = (<HTMLInputElement | null>event.target)?.files?.item(0);
    if (!file) {
      return;
    }

    const text = await file.text();
    const docName = file.name;
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    this.dispatchEvent(newOpenEvent(doc, docName));
    this.input.onchange = null;
  }

  render() {
    return html`
      <input
        @click=${({ target }: MouseEvent) => {
          (<HTMLInputElement>target).value = '';
        }}
        @change=${this.openDoc}
        type="file"
      />
    `;
  }
}
