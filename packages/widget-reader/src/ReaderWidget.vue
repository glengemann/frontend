<template>
  <article :class="{ 'full-height': fullHeight }">
    <section class="reader-left">
      <h2 v-if="passageTitle" class="reader-heading main-widget-heading">
        {{ passageTitle }}
      </h2>
      <ApolloQuery
        class="reader-container"
        :class="[textDirection]"
        :query="query"
        :variables="queryVariables"
        :update="queryUpdate"
        :skip="urn === null"
      >
        <template v-slot="{ result: { data } }">
          <Paginator :urn="data && data.previous" :direction="pagerPrevious" />

          <component :is="readerComponent" :query-variables="queryVariables" />

          <Paginator :urn="data && data.next" :direction="pagerNext" />
        </template>
      </ApolloQuery>
    </section>
  </article>
</template>

<script>
  import gql from 'graphql-tag';

  import URN, { Paginator } from '@scaife-viewer/common';
  import { mapStores } from 'pinia';
  import useScaifeStore from '@scaife-viewer/stores';
  import PassageLanguageIsRtlMixin from './mixins';

  export default {
    mixins: [PassageLanguageIsRtlMixin],
    components: {
      Paginator,
    },
    scaifeConfig: {},
    methods: {
      setVersionMetadata() {
        if (this.urn === null) {
          return;
        }
        this.scaifeStore.updateMetadata({ urn: this.urn.version });
      },
      queryUpdate(data) {
        const {
          nextPassage: next,
          previousPassage: previous,
        } = data.passageTextParts.metadata;
        return {
          next: next ? new URN(next) : null,
          previous: previous ? new URN(previous) : null,
        };
      },
    },
    watch: {
      urn: {
        immediate: true,
        handler(newValue, oldValue) {
          if (newValue) {
            if (oldValue && oldValue.toString() === newValue.toString()) {
              return;
            }
            this.$nextTick(() => {
              this.$parent.$el.scrollTop = 0;
            });

            this.scaifeStore.setPassage({ urn: this.urn.toString() });
          }
        },
      },
      versionMetadata: {
        immediate: true,
        handler() {
          if (!this.versionMetadata && this.urn) {
            this.setVersionMetadata();
          }
        },
      },
    },
    beforeUpdate() {
      if (this.urn && !this.$route.params.urn) {
        this.$router.push({
          to: 'reader',
          params: {
            urn: this.urn.toString(),
          },
        });
      }
      if (this.urn && this.version !== this.urn.version) {
        this.setVersionMetadata();
      }
    },
    computed: {
      ...mapStores(useScaifeStore),
      readerComponent() {
        const { displayMode } = this.scaifeStore;
        return this.$scaife.config.readerComponents[displayMode];
      },
      query() {
        return gql`
          query TextParts($urn: String!) {
            passageTextParts(reference: $urn) {
              metadata {
                previousPassage
                nextPassage
              }
            }
          }
        `;
      },
      queryVariables() {
        return { urn: this.urn === null ? '' : this.urn.absolute };
      },
      namedEntitiesMode() {
        return this.scaifeStore.namedEntitiesMode;
      },
      urn() {
        return this.scaifeStore.urn;
      },
      version() {
        return this.scaifeStore.firstPassageUrn;
      },
      versionMetadata() {
        return this.scaifeStore.metadata;
      },
      passageTitle() {
        return this.versionMetadata ? this.versionMetadata.label : null;
      },
      fullHeight() {
        return this.namedEntitiesMode;
      },
      isDefaultDisplayMode() {
        return this.scaifeStore.displayMode;
      },
      textDirection() {
        // FIXME: Further localization required across
        // the other display modes
        return this.passageIsRtl && this.isDefaultDisplayMode ? 'rtl' : 'ltr';
      },
      pagerPrevious() {
        return this.textDirection === 'ltr' ? 'left' : 'right';
      },
      pagerNext() {
        return this.textDirection === 'ltr' ? 'right' : 'left';
      },
    },
  };
</script>

<style lang="scss" scoped>
  article {
    width: 100%;
  }
  section {
    width: 100%;
  }
  .full-height {
    height: calc(100vh - 30px);
    overflow: hidden;
  }
  .reader-heading {
    flex: 1;
  }
  .reader-container {
    // TODO: RTLize via .overall from SV1
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: left;
    & nav:last-child {
      margin-left: auto;
    }
    ::v-deep .ball-pulse {
      margin-left: auto;
      padding-top: 40px;
    }
  }
  .reader-container.rtl {
    direction: rtl;
  }
</style>
