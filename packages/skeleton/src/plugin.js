import { Icon, LoaderBall, displayName } from '@scaife-viewer/common';

import FixedSkeleton from './FixedSkeleton.vue';
import EditableSkeleton from './EditableSkeleton.vue';

import iconMap from './icons';

class Skeleton {
  constructor(widgets) {
    this.widgets = widgets.reduce((map, obj) => {
      // eslint-disable-next-line no-param-reassign
      map[displayName(obj.scaifeConfig.displayName)] = obj;
      return map;
    }, {});
  }

  widgetOptions(location, mainWidget, leftWidgets, rightWidgets) {
    return Object.keys(this.widgets)
      .filter(name => {
        const config = this.widgets[name].scaifeConfig;
        return config.location === location || config.location === 'both';
      })
      .filter(name => {
        const config = this.widgets[name].scaifeConfig;
        // only show widgets if they haven't already been used in the case of
        // it being marked a singleton, unless the location is main.
        if (config.singleton) {
          const notInMain = mainWidget !== name;
          const notInLeft = leftWidgets[name] === undefined;
          const notInRight = rightWidgets[name] === undefined;
          return (
            // eslint-disable-next-line operator-linebreak
            (location === 'main' && notInLeft && notInRight) ||
            (notInMain && notInLeft && notInRight)
          );
        }
        return true;
      })
      .map(text => ({
        text,
        component: this.widgets[text],
      }));
  }
}

const install = (Vue, options) => {
  if (install.installed) return;
  install.installed = true;

  // eslint-disable-next-line no-param-reassign
  Vue.config.globalProperties.$scaife = Vue.config.globalProperties.$scaife || {};
  // eslint-disable-next-line no-param-reassign
  const additionalIconMap = options.iconMap || {};
  // eslint-disable-next-line no-param-reassign
  Vue.config.globalProperties.$scaife = {
    ...Vue.config.globalProperties.$scaife,
    skeleton: new Skeleton(options.widgets || []),
    config: options.config || {},
    iconMap: {
      ...iconMap,
      ...additionalIconMap,
    },
  };

  Vue.component('FixedSkeleton', FixedSkeleton);
  Vue.component('EditableSkeleton', EditableSkeleton);
  Vue.component('LoaderBall', LoaderBall);
  Vue.component('Icon', Icon);
};

const SkeletonPlugin = { install };

export default SkeletonPlugin;
