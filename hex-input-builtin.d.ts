import '@ungap/custom-elements';
import { HexInputBuiltinBase } from './lib/entrypoints/hex-input-builtin.js';
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
 */
export declare class HexInputBuiltin extends HexInputBuiltinBase {
}
//# sourceMappingURL=hex-input-builtin.d.ts.map