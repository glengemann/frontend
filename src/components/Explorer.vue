<script>
  import FixedSkeleton from '@scaife-viewer/skeleton';
  import {mapStores} from "pinia";
  import useScaifeStore from '@scaife-viewer/stores';
  import ReaderWidget from '@scaife-viewer/widget-reader';

  export default {
    components: {
      FixedSkeleton,
    },
    computed: {
      ...mapStores(useScaifeStore),
      left() {
        return [];
      },
      right() {
        return [];
      },
      main() {
        return ReaderWidget;
      },
    },
    methods: {
      metaLoaded() {
        return this.scaifeStore.libraryTree !== null;
      },
    },
  };
</script>

<template>
  <div>
    <FixedSkeleton
      v-if="metaLoaded"
      :left-widgets="left"
      :right-widgets="right"
      :main-widget="main"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
