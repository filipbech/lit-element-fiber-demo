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

        const s = this.size * 1.3;
        this.style.width = `${s}px`;
        this.style.height = `${s}px`;
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;
        this.style.borderRadius = `${s / 2}px`;
        this.style.lineHeight = `${s}px`;
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

    this.style.background = `${this.hover ? '#ff0' : '#61dafb'}`;   
    this.oldText = this.text;

    this.cachedTemplate = html`
        ${this.hover ? '**' + this.text + '**' : this.text}
    `;
    return this.cachedTemplate;
  }
}

customElements.define('fiber-dot', FiberDot.withProperties());
