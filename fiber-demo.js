import { LitElement, html } from './node_modules/lit-html-element/lit-element.js';

import { render } from './node_modules/lit-html/lit-html.js';

export class FiberDemo extends LitElement {
    static get properties() {
        return {
            elapsed: {
                type: Number,
                value: 0
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.seconds = 0;
        var tick = this.tick.bind(this);
        this.intervalID = setInterval(tick, 1000);
    }

  tick() {
    this.seconds = (this.seconds % 10) + 1;
  }

  render() {
      const t = (this.elapsed / 1000) % 10;
      const scale = 1 + (t > 5 ? 10 - t : t) / 10;
      return html`
        <style>
            :host {
                position: absolute;
                transform-origin: 0 0;
                left: 50%;
                top: 50%;
                width: 10px;
                height: 10px;
                background: #eee;
                transform: scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px);
            }
        </style>
        <div>
            <fiber-triangle x="${0}" y="${0}" s="${1000}" seconds="${this.seconds}"></fiber-triangle>
        </div>
    `;
  }
}

customElements.define('fiber-demo', FiberDemo.withProperties());