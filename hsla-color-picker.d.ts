import { HslaBase } from './lib/entrypoints/hsla.js';
export type { HslaColor } from './lib/types';
/**
 * A color picker custom element that uses HSLA object format.
 *
 * @element hsla-color-picker
 *
 * @prop {HslaColor} color - Selected color in HSLA object format.
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
export declare class HslaColorPicker extends HslaBase {
}
declare global {
    interface HTMLElementTagNameMap {
        'hsla-color-picker': HslaColorPicker;
    }
}
//# sourceMappingURL=hsla-color-picker.d.ts.map