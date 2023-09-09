<template>
  <div class="main-layout" :class="flexSize">
    <MainWidget>
      <h2 class="main-widget-heading" slot="heading">
        <span>{{ widgetHeader }}</span>
        <EditLayoutButton
          v-if="isEditable && editing !== undefined"
          :editing="editing"
          @editToggle="$emit('edit-toggle')"
        />
      </h2>

      <WidgetEditor
        slot="body"
        v-if="editing"
        class="main-widget-editor"
        kind="main"
        :editing="editing"
        :main-widget="widget"
        :options="widgetOptions"
        @change-widget="widget => $emit('change-widget', widget)"
      />
      <template v-slot:body>
        <component :is="widget" v-show="!editing" v-if="widget !== null" />
      </template>
    </MainWidget>
  </div>
</template>

<script>
  import { displayName } from '@scaife-viewer/common';
  import useScaifeStore from '@scaife-viewer/stores';
  import { mapStores } from 'pinia';
  import EditLayoutButton from './EditLayoutButton.vue';
  import MainWidget from './MainWidget.vue';
  import WidgetEditor from '../editor/WidgetEditor.vue';

  export default {
    props: ['editing', 'widget', 'widgetOptions', 'fixed', 'isEditable'],
    components: {
      EditLayoutButton,
      MainWidget,
      WidgetEditor,
    },
    computed: {
      ...mapStores(useScaifeStore),
      widgetHeader() {
        return this.widget
          ? displayName(this.widget.scaifeConfig.displayName)
          : '';
      },
      flexSize() {
        return this.scaifeStore.mainLayoutFlexClass;
      },
    },
  };
</script>

<style lang="scss">
  .main-layout-flex-2 {
    flex: 2;
  }
  .main-layout-flex-4 {
    flex: 4;
  }
  .main-layout-flex-6 {
    flex: 6;
  }

  .main-layout {
    height: 100vh;
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .widget h2.main-widget-heading {
    padding: 15px 24px 15px;
  }
  .main-layout .widget {
    height: calc(
      100vh - 2px - 8px
    ); // 2px top/bottom border of widget, 8px bottom padding of widget
    overflow-y: scroll;
  }
</style>
