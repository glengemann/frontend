import { createApp, h } from 'vue';
import './style.css';
import VueApolloComponents from '@vue/apollo-components';
import pinia from './pinia.config';
import apolloProvider from './apollo.config.components';
import App from './App.vue';
import router from './router';
import {DISPLAY_MODE_DEFAULT} from "@scaife-viewer/stores";
import {DefaultModeReader} from "@scaife-viewer/widget-reader";
import {SkeletonPlugin} from "@scaife-viewer/skeleton";
import { iconMap as commonIconMap } from '@scaife-viewer/common';

pinia.use(({ store }) => {
  store.router = router;
});

const app = createApp({
  render: () => h(App),
});

app.use(SkeletonPlugin, {
  iconMap: {
    ...commonIconMap,
  },
  config: {
    readerComponents: {
      [DISPLAY_MODE_DEFAULT]: DefaultModeReader,
    },
  },
});

app.use(apolloProvider);
app.use(VueApolloComponents);
app.use(router);
app.use(pinia);
app.mount('#app');
