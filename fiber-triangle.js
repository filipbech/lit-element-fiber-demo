import { LitElement, html } from './node_modules/lit-html-element/lit-element.js';

var targetSize = 25;

export class FiberTriangle extends LitElement {

    static get properties() {
        return {
            s: {
                type: Number
            },
            x: {
                type: Number
            },
            y: {
                type: Number
            },
            seconds: {
                type: Number
            }
        }
    }

  render() {
    let s = this.s;
    if (s <= targetSize) {
      return html`
        <link rel="stylesheet" href="style.css">
        <fiber-dot
            x="${this.x - (targetSize / 2)}"
            y="${this.y - (targetSize / 2)}"
            size="${targetSize}"
            text="${this.seconds}"
        ></fiber-dot>
      `;
    }
    s = s / 2;

    const slowDown = true;
    if (slowDown) {
      const e = performance.now() + 0.8;
      while (performance.now() < e) {
        // Artificially long execution time.
      }
    }
    return html`
      <link rel="stylesheet" href="style.css">
      <fiber-triangle x="${this.x}" y="${this.y - (s / 2)}" s="${s}" seconds="${this.seconds}"></fiber-triangle>
      <fiber-triangle x="${this.x - s}" y="${this.y + (s / 2)}" s="${s}" seconds="${this.seconds}"></fiber-triangle>
      <fiber-triangle x="${this.x + s}" y="${this.y + (s / 2)}" s="${s}" seconds="${this.seconds}"></fiber-triangle>
    `;
  }
}

customElements.define('fiber-triangle', FiberTriangle.withProperties());