import { LitElement, html } from './node_modules/lit-html-element/lit-element.js';
import { render } from './node_modules/lit-html/lib/lit-extended.js';


export class FiberDot extends LitElement {

    static get properties() {
        return {
            size: {
                type: Number
            },
            x: {
                type: Number
            },
            y: {
                type: Number
            },
            text: {
                type: String
            },
            hover: {
                type: Boolean,
                value: false
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.enter = this.enter.bind(this);
        this.leave = this.leave.bind(this);
        this.addEventListener('mouseenter', this.enter);
        this.addEventListener('mouseleave', this.leave);
    }

  enter() {
    this.hover = true;
  }

  leave() {
    this.hover = false;
  }

  render() {
    if (this.cachedTemplate && this.oldHover === this.hover && this.oldText === this.text) {
        return this.cachedTemplate;
    }
    this.oldHover = this.hover;
    this.oldText = this.text;
    
    const s = this.size * 1.3;
    this.cachedTemplate = html`
        <style>
        :host {
                position: absolute;
                font: normal 15px sans-serif;
                text-align: center;
                cursor: pointer;
                width: ${s}px;
                height: ${s}px;
                left: ${this.x}px;
                top: ${this.y}px;
                border-radius: ${s / 2}px;
                line-height: ${s}px;
                background: ${this.hover ? '#ff0' : '#61dafb'};
            }
        </style>
        ${this.hover ? '**' + this.text + '**' : this.text}
    `;
    return this.cachedTemplate;
  }
}

customElements.define('fiber-dot', FiberDot.withProperties());
