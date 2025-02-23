import { HexInputBase } from './lib/entrypoints/hex-input.js';
/**
 * A custom element for entering color in HEX format.
 *
 * @element hex-input
 *
 * @prop {string} color - Color in HEX format.
 * @attr {string} color - Selected color in HEX format.
 * @prop {boolean} alpha - When true, `#rgba` and `#rrggbbaa` color formats are allowed.
 * @attr {boolean} alpha - Allows `#rgba` and `#rrggbbaa` color formats.
 * @prop {boolean} prefixed - When true, `#` prefix is displayed in the input.
 * @attr {boolean} prefixed - Enables `#` prefix displaying.
 *
 * @fires color-changed - Event fired when color is changed.
 *
 * @csspart input - A native input element.
 */
export declare class HexInput extends HexInputBase {
}
declare global {
    interface HTMLElementTagNameMap {
        'hex-input': HexInput;
    }
}
//# sourceMappingURL=hex-input.d.ts.map