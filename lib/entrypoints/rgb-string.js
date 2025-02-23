import { ColorPicker } from '../components/color-picker.js';
import { rgbStringToHsva, hsvaToRgbString } from '../utils/convert.js';
import { equalColorString } from '../utils/compare.js';
const colorModel = {
    defaultColor: 'rgb(0, 0, 0)',
    toHsva: rgbStringToHsva,
    fromHsva: hsvaToRgbString,
    equal: equalColorString,
    fromAttr: (color) => color
};
export class RgbStringBase extends ColorPicker {
    get colorModel() {
        return colorModel;
    }
}
//# sourceMappingURL=rgb-string.js.map