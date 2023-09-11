import FixedSkeleton from './FixedSkeleton.vue';
import SkeletonPlugin from './plugin';

//export { default as EditableSkeleton } from './EditableSkeleton.vue';
export { default as SkeletonPlugin } from './plugin';
export default FixedSkeleton;

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(SkeletonPlugin);
}
