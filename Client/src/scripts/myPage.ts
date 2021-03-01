import { FluentSlider } from '@fluentui/web-components';
import { attr, customElement, FASTElement, html } from '@microsoft/fast-element'

const template = html<MyPage>`
<fluent-slider value="${x => x.value}"
  @change="${(x, c) => x.sliderChanged(c.event)}"></fluent-slider>
`;

@customElement({
    name: 'my-page',
    template
})
export class MyPage extends FASTElement {
    @attr value = '';

    sliderChanged(e: Event) {
        const v = (<FluentSlider>e.target).value;
        console.log('Slider changed: ' + v);
        this.value = v;
        this.$emit('change');
    }
}