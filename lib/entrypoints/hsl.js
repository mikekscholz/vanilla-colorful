import { ColorPicker } from '../components/color-picker.js';
import { hslaToHsva, hsvaToHsla, hslaToHsl } from '../utils/convert.js';
import { equalColorObjects } from '../utils/compare.js';
const colorModel = {
    defaultColor: { h: 0, s: 0, l: 0 },
    toHsva: ({ h, s, l }) => hslaToHsva({ h, s, l, a: 1 }),
    fromHsva: (hsva) => hslaToHsl(hsvaToHsla(hsva)),
    equal: equalColorObjects,
    fromAttr: (color) => JSON.parse(color)
};
export class HslBase extends ColorPicker {
    get colorModel() {
        return colorModel;
    }
}
//# sourceMappingURL=hsl.js.map