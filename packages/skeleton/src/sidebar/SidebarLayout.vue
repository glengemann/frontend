<template>
  <aside class="sidebar-wrapper">
    <slot name="button-container" />
    <div class="sidebar">
      <div class="widgets">
        <SidebarWidget
          v-for="(widget, index) in widgets"
          :key="index"
          @remove="$emit('remove-widget', index)"
          :editing="editing"
          :defaults="widget.scaifeConfig.defaults"
        >
          <template #heading>
            <span class="heading">{{
              displayName(widget.scaifeConfig.displayName)
            }}</span>
          </template>
<!--          <PortalTarget-->
<!--            v-if="widget.scaifeConfig.portalTarget"-->
<!--            slot="sticky"-->
<!--            :name="widget.scaifeConfig.portalTarget"-->
<!--          />-->
          <template #body>
            <component :is="widget" />
          </template>
        </SidebarWidget>
      </div>
      <WidgetEditor
        :options="widgetOptions"
        v-if="editing"
        @change-widget="widget => $emit('change-widget', widget)"
      />
    </div>
  </aside>
</template>

<script>
  // import { PortalTarget } from 'portal-vue';
  import { displayName } from '@scaife-viewer/common';
  import useScaifeStore from "@scaife-viewer/stores";
  import { mapStores } from 'pinia';
  import SidebarWidget from './SidebarWidget.vue';
  import WidgetEditor from '../editor/WidgetEditor.vue';

  export default {
    computed: {
      ...mapStores(useScaifeStore),
    },
    props: ['open', 'editing', 'widgets', 'widgetOptions'],
    components: {
      WidgetEditor,
      SidebarWidget,
      // PortalTarget
    },
    methods: {
      displayName(name) {
        return displayName(name, this.scaifeStore, this.$scaife);
      },
    },
  };
</script>

<style lang="scss">
  .sidebar-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    background: var(--sv-sidebar-wrapper-background-color, #fff);
  }

  .left .button-container {
    text-align: right;
  }

  button.toggle-open {
    border: none;
    font-size: 18px;
    color: var(--sv-toggle-open-text-color, #868e96);
    outline: none;
    background: var(--sv-toggle-open-background-color, transparent);
    margin: 4px;
    padding: 3px 2px 1px 2px;
  }

  .left.sidebar-wrapper {
    border-right: 1px solid;
    border-right-color: var(--sv-sidebar-wrapper-border-left-color, #dee2e6);
  }
  .right.sidebar-wrapper {
    border-left: 1px solid;
    border-left-color: var(--sv-sidebar-wrapper-border-right-color, #dee2e6);
  }
  .left.sidebar-wrapper.sidebar-left--closed,
  .right.sidebar-wrapper.sidebar-right--closed {
    flex: 0;
  }
  .sidebar {
    overflow-y: auto;
    flex: 1;
  }
  .left.sidebar-left--closed .sidebar,
  .right.sidebar-right--closed .sidebar {
    max-width: 0;
    overflow: hidden;
    opacity: 0;
  }
  .left.sidebar-left--closed {
    button.toggle-open {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
    }
  }
  .right.sidebar-right--closed {
    button.toggle-open {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 99;
    }
  }

  .left.sidebar-left--open,
  .right.sidebar-right--open {
    min-width: 200px;

    button.toggle-open {
      position: inherit;
      top: inherit;
      left: inherit;
    }
  }

  .left.sidebar-left--open .sidebar,
  .right.sidebar-right--open .sidebar {
    max-width: 600px;
  }

  .widgets {
    margin-bottom: 50px;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
