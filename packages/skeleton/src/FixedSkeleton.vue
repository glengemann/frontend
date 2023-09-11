<template>
  <div class="skeleton">
    <SidebarLayout
      v-if="leftVisible"
      class="left"
      :class="sidebarClasses"
      :widgets="leftWidgets"
    >
      <template #button-container class="button-container">
        <div class="button-container">
          <button class="toggle-open" v-if="leftOpen" @click="onLeftToggle">
            <Icon name="arrow-left" />
          </button>
          <button class="toggle-open" v-else @click="onLeftToggle">
            <Icon name="arrow-right" />
          </button>
        </div>
      </template>
    </SidebarLayout>

    <MainLayout :widget="mainWidget" :isEditable="isEditable" />

    <SidebarLayout
      v-if="rightVisible"
      class="right"
      :class="sidebarClasses"
      :widgets="rightWidgets"
    >
      <div slot="button-container" class="button-container">
        <button class="toggle-open" v-if="rightOpen" @click="onRightToggle">
          <Icon name="arrow-right" />
        </button>
        <button class="toggle-open" v-else @click="onRightToggle">
          <Icon name="arrow-left" />
        </button>
      </div>
    </SidebarLayout>
  </div>
</template>

<script>
  import useScaifeStore from '@scaife-viewer/stores';
  import MainLayout from './main/MainLayout.vue';
  import SidebarLayout from './sidebar/SidebarLayout.vue';
  import { mapStores } from 'pinia';

  export default {
    props: ['mainWidget', 'leftWidgets', 'rightWidgets'],
    components: { MainLayout, SidebarLayout },
    data() {
      return {
        editing: false,
        isEditable: false,
      };
    },
    methods: {
      onLeftToggle() {
        this.$emit('left-toggle');
        this.scaifeStore.toggleLeftSidebar();
      },
      onRightToggle() {
        this.$emit('right-toggle');
        this.scaifeStore.toggleRightSidebar();
      },
    },
    watch: {
      title: {
        immediate: true,
        handler() {
          const { pageTitle } = this.$scaife.config;
          document.title =
            (pageTitle && pageTitle(this.title)) ||
            (this.title ? `Scaife Viewer | ${this.title}` : 'Scaife Viewer');
        },
      },
    },
    computed: {
      ...mapStores(useScaifeStore),
      leftOpen() {
        return this.scaifeStore.leftOpen;
      },
      rightOpen() {
        return this.scaifeStore.rightOpen;
      },
      leftVisible() {
        return this.scaifeStore.leftVisible;
      },
      rightVisible() {
        return this.scaifeStore.rightVisible;
      },
      sidebarClasses() {
        return [
          this.leftOpen ? 'sidebar-left--open' : 'sidebar-left--closed',
          this.rightOpen ? 'sidebar-right--open' : 'sidebar-right--closed',
        ];
      },
      mainWidgetOptions() {
        return this.$scaife.skeleton.widgetOptions(
          'main',
          this.mainWidget,
          this.leftWidgets,
          this.rightWidgets,
        );
      },
      sidebarWidgetOptions() {
        return this.$scaife.skeleton.widgetOptions(
          'sidebar',
          this.mainWidget,
          this.leftWidgets,
          this.rightWidgets,
        );
      },
      title() {
        const { metadata } = this.scaifeStore;
        return metadata && metadata.label;
      },
    },
  };
</script>

<style lang="scss" src="./skeleton.scss"></style>
