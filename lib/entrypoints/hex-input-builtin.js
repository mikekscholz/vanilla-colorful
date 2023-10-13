import { validHex } from '../utils/validate.js';
// Escapes all non-hexadecimal characters including "#"
const escape = (hex, alpha) => hex.replace(/([^0-9A-F]+)/gi, '').substring(0, alpha ? 8 : 6);
const $alpha = Symbol('alpha');
const $color = Symbol('color');
const $saved = Symbol('saved');
const $init = Symbol('init');
const $prefix = Symbol('prefix');
const $update = Symbol('update');
export class HexInputBuiltinBase extends HTMLInputElement {
    static get observedAttributes() {
        return ['alpha', 'color', 'prefixed'];
    }
    constructor() {
        super();
    }
    get color() {
        return this[$color];
    }
    set color(hex) {
        this[$color] = '#' + escape(hex, this.alpha);
        this[$update](hex);
    }
    get alpha() {
        return this[$alpha];
    }
    set alpha(alpha) {
        this[$alpha] = alpha;
        this.toggleAttribute('alpha', alpha);
        // When alpha set to false, update color
        const color = this.color;
        if (color && !validHex(color, alpha)) {
            this.color = color.startsWith('#')
                ? color.substring(0, color.length === 5 ? 4 : 7)
                : color.substring(0, color.length === 4 ? 3 : 6);
        }
    }
    get prefixed() {
        return this[$prefix];
    }
    set prefixed(prefixed) {
        this[$prefix] = prefixed;
        this.toggleAttribute('prefixed', prefixed);
        this[$update](this.color);
    }
    connectedCallback() {
        this[$init]();
        // A user may set a property on an _instance_ of an element,
        // before its prototype has been connected to this class.
        // If so, we need to run it through the proper class setter.
        if (this.hasOwnProperty('alpha')) {
            const value = this.alpha;
            delete this['alpha'];
            this.alpha = value;
        }
        else {
            this.alpha = this.hasAttribute('alpha');
        }
        if (this.hasOwnProperty('prefixed')) {
            const value = this.prefixed;
            delete this['prefixed'];
            this.prefixed = value;
        }
        else {
            this.prefixed = this.hasAttribute('prefixed');
        }
        if (this.hasOwnProperty('color')) {
            const value = this.color;
            delete this['color'];
            this.color = value;
        }
        else if (this.color == null) {
            this.color = this.getAttribute('color') || '';
        }
        else if (this[$color]) {
            this[$update](this[$color]);
        }
    }
    handleEvent(event) {
        const target = event.target;
        const { value } = target;
        switch (event.type) {
            case 'input':
                const hex = escape(value, this.alpha);
                this[$saved] = this.color;
                if (validHex(hex, this.alpha) || value === '') {
                    this.color = hex;
                    this.dispatchEvent(new CustomEvent('color-changed', {
                        bubbles: true,
                        detail: { value: hex ? '#' + hex : '' }
                    }));
                }
                break;
            case 'blur':
                if (value && !validHex(value, this.alpha)) {
                    this.color = this[$saved];
                }
        }
    }
    attributeChangedCallback(attr, _oldVal, newVal) {
        if (attr === 'color' && this.color !== newVal) {
            this.color = newVal;
        }
        const hasBooleanAttr = newVal != null;
        if (attr === 'alpha') {
            if (this.alpha !== hasBooleanAttr) {
                this.alpha = hasBooleanAttr;
            }
        }
        if (attr === 'prefixed') {
            if (this.prefixed !== hasBooleanAttr) {
                this.prefixed = hasBooleanAttr;
            }
        }
    }
    [$init]() {
        this.addEventListener('input', this);
        this.addEventListener('blur', this);
        this[$update](this.color);
    }
    [$update](hex) {
        this.value =
            hex == null || hex == '' ? '' : (this.prefixed ? '#' : '') + escape(hex, this.alpha);
        this.style.setProperty('--hex', hex ? '#' + escape(hex, this.alpha) : '#0000');
    }
}
//# sourceMappingURL=hex-input-builtin.js.map