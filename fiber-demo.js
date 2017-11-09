import { LitElement, html } from './node_modules/lit-html-element/lit-element.js';

export class FiberDemo extends LitElement {
    static get properties() {
        return {
            seconds: {
                type: Number,
                value: 0
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.shouldUpdate = true;
        this.seconds = 0;
        var tick = this.tick.bind(this);
        this.intervalID = setInterval(tick, 5000);
    }
   

  tick() {
    this.shouldUpdate = true;
    this.seconds = (this.seconds % 10) + 1;
  }

  render() {
    if(this.shouldUpdate) {
        this.shouldUpdate = false;
        this.cachedTemplate = html`
            <link rel="stylesheet" href="style.css">
            <div>
                <fiber-triangle x="${0}" y="${0}" s="${1000}" seconds="${this.seconds}"></fiber-triangle>
            </div>
        `;
    }
    return this.cachedTemplate;
  }


constructor() {
    super();
    this._elapsed=0;
    Object.defineProperty(this, 'elapsed', {
        get() { return this._elapsed },
        set(v) {
            this._elapsed = v;

            const t = (this.elapsed / 1000) % 10;
            const scale = 1 + (t > 5 ? 10 - t : t) / 10;
            this.style.transform = `scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px)`;
        }
    });
}


}

customElements.define('fiber-demo', FiberDemo.withProperties());