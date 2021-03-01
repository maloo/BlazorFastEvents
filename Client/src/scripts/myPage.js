import { __decorate } from "tslib";
import { attr, customElement, FASTElement, html } from '@microsoft/fast-element';
const template = html `
<fluent-slider value="${x => x.value}"
  @change="${(x, c) => x.sliderChanged(c.event)}"></fluent-slider>
`;
let MyPage = class MyPage extends FASTElement {
    constructor() {
        super(...arguments);
        this.value = '';
    }
    sliderChanged(e) {
        const v = e.target.value;
        console.log('Slider changed: ' + v);
        this.value = v;
        this.$emit('change');
    }
};
__decorate([
    attr
], MyPage.prototype, "value", void 0);
MyPage = __decorate([
    customElement({
        name: 'my-page',
        template
    })
], MyPage);
export { MyPage };
//# sourceMappingURL=myPage.js.map