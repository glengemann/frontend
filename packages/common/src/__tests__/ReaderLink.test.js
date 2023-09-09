import ReaderLink from '../ReaderLink.vue';
import { mount } from '@vue/test-utils';

test('Mount component', () => {
  const $route = {
    query: { plan: 'private' },
  };
  const wrapper = mount(ReaderLink, {
    global: {
      mocks: {
        $route,
      },
      config: {
        globalProperties: {
          $scaife: {
            config: {
              readerRouterName: 'reader',
            },
          },
        },
      },
    },
    prop: {
      urn: 'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:12.80-12.230',
    },
  });

  console.log(wrapper.html());
});
