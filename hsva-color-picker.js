import { HsvaBase } from './lib/entrypoints/hsva.js';
/**
 * A color picker custom element that uses HSVA object format.
 *
 * @element hsva-color-picker
 *
 * @prop {HsvaColor} color - Selected color in HSVA object format.
 *
 * @fires color-changed - Event fired when color property changes.
 *
 * @csspart hue - A hue selector container.
 * @csspart saturation - A saturation selector container
 * @csspart alpha - An alpha selector container.
 * @csspart hue-pointer - A hue pointer element.
 * @csspart saturation-pointer - A saturation pointer element.
 * @csspart alpha-pointer - An alpha pointer element.
 */
export class HsvaColorPicker extends HsvaBase {
}
customElements.define('hsva-color-picker', HsvaColorPicker);
//# sourceMappingURL=hsva-color-picker.js.map