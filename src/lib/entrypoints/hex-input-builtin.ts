import type { ColorPickerEventListener, ColorPickerEventMap } from '../types';
import { validHex } from '../utils/validate.js';

// Escapes all non-hexadecimal characters including "#"
const escape = (hex: string, alpha: boolean) =>
  hex.replace(/([^0-9A-F]+)/gi, '').substring(0, alpha ? 8 : 6);

const $alpha = Symbol('alpha');
const $color = Symbol('color');
const $saved = Symbol('saved');
const $init = Symbol('init');
const $prefix = Symbol('prefix');
const $update = Symbol('update');

export interface HexInputBuiltinBase {
  addEventListener<T extends keyof ColorPickerEventMap<string>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<string>[T]>,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<T extends keyof ColorPickerEventMap<string>>(
    type: T,
    listener: ColorPickerEventListener<ColorPickerEventMap<string>[T]>,
    options?: boolean | EventListenerOptions
  ): void;
}

export class HexInputBuiltinBase extends HTMLInputElement {
  static get observedAttributes(): string[] {
    return ['alpha', 'color', 'prefixed'];
  }

  constructor() {
    super();
  }

  private declare [$color]: string;

  private declare [$alpha]: boolean;

  private declare [$prefix]: boolean;

  private declare [$saved]: string;

  get color(): string {
    return this[$color];
  }

  set color(hex: string) {
    this[$color] = '#' + escape(hex, this.alpha);
    this[$update](hex);
  }

  get alpha(): boolean {
    return this[$alpha];
  }

  set alpha(alpha: boolean) {
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

  get prefixed(): boolean {
    return this[$prefix];
  }

  set prefixed(prefixed: boolean) {
    this[$prefix] = prefixed;
    this.toggleAttribute('prefixed', prefixed);
    this[$update](this.color);
  }

  connectedCallback(): void {
    this[$init]();

    // A user may set a property on an _instance_ of an element,
    // before its prototype has been connected to this class.
    // If so, we need to run it through the proper class setter.
    if (this.hasOwnProperty('alpha')) {
      const value = this.alpha;
      delete this['alpha' as keyof this];
      this.alpha = value;
    } else {
      this.alpha = this.hasAttribute('alpha');
    }

    if (this.hasOwnProperty('prefixed')) {
      const value = this.prefixed;
      delete this['prefixed' as keyof this];
      this.prefixed = value;
    } else {
      this.prefixed = this.hasAttribute('prefixed');
    }

    if (this.hasOwnProperty('color')) {
      const value = this.color;
      delete this['color' as keyof this];
      this.color = value;
    } else if (this.color == null) {
      this.color = this.getAttribute('color') || '';
    } else if (this[$color]) {
      this[$update](this[$color]);
    }
  }

  handleEvent(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    switch (event.type) {
      case 'input':
        const hex = escape(value, this.alpha);
        this[$saved] = this.color;
        if (validHex(hex, this.alpha) || value === '') {
          this.color = hex;
          this.dispatchEvent(
            new CustomEvent('color-changed', {
              bubbles: true,
              detail: { value: hex ? '#' + hex : '' }
            })
          );
        }
        break;
      case 'blur':
        if (value && !validHex(value, this.alpha)) {
          this.color = this[$saved];
        }
    }
  }

  attributeChangedCallback(attr: string, _oldVal: string, newVal: string): void {
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

  private [$init](): void {
    this.addEventListener('input', this);
    this.addEventListener('blur', this);
    this[$update](this.color);
  }

  private [$update](hex: string): void {
    this.value =
      hex == null || hex == '' ? '' : (this.prefixed ? '#' : '') + escape(hex, this.alpha);
    this.style.setProperty('--hex', hex ? '#' + escape(hex, this.alpha) : '#0000');
  }
}
