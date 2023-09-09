import { iconMap as commonIconMap } from '@scaife-viewer/common';
import { mount } from '@vue/test-utils';
import Icon from '../Icon.vue';

test('Mount component and render left arrow', () => {
  const wrapper = mount(Icon, {
    global: {
      config: {
        globalProperties: {
          $scaife: {
            iconMap: {
              ...commonIconMap,
            },
          },
        },
      },
    },
    props: {
      name: 'chevron-left',
      inline: undefined,
    },
  });

  const svgElement = wrapper.find('svg');
  expect(svgElement.classes()).toContain('fa-chevron-left');
});

test('Mount component and render right arrow', () => {
  const wrapper = mount(Icon, {
    global: {
      config: {
        globalProperties: {
          $scaife: {
            iconMap: {
              ...commonIconMap,
            },
          },
        },
      },
    },
    props: {
      name: 'chevron-right',
      inline: undefined,
    },
  });

  const svgElement = wrapper.find('svg');
  expect(svgElement.classes()).toContain('fa-chevron-right');
});

