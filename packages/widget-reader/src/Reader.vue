<template>
  <div class="reader">
    <div
      class="reader-container text"
      :class="[`text-${textSize}`, `text-width-${textWidth}`, textDirection]"
    >
      <ReaderTextPart
        v-for="textPart in textParts"
        :key="textPart.id"
        :textPart="textPart"
      />

      <Attribution v-if="showMetricalCredit" class="reader-attribution">
        Metrical annotation &copy; 2016
        <a href="https://hypotactic.com/" target="_blank">David Chamberlain</a>
        under
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"
          >CC BY 4.0 License</a
        >
      </Attribution>
      <Attribution v-if="showGammarCredit" class="reader-attribution">
        From the
        <a href="https://github.com/farnoosh-shamsian/Didakta" target="_blank"
          >Didakta Modular Grammar</a
        >
        by
        <a href="https://orcid.org/0000-0003-3743-4278" target="_blank"
          >Farnoosh Shamsian</a
        >
      </Attribution>
      <EmptyMessage class="reader-empty-annotations" v-if="showMetricalEmpty" />
    </div>
  </div>
</template>

<script>
  import { Attribution, EmptyMessage } from '@scaife-viewer/common';
  import { mapStores } from 'pinia';
  import useScaifeStore from '@scaife-viewer/stores';
  import ReaderTextPart from './ReaderTextPart.vue';
  import PassageLanguageIsRtlMixin from './mixins';

  export default {
    mixins: [PassageLanguageIsRtlMixin],
    components: { Attribution, EmptyMessage, ReaderTextPart },
    props: ['textParts'],
    computed: {
      ...mapStores(useScaifeStore),
      textSize() {
        return this.scaifeStore.readerTextSize;
      },
      textWidth() {
        return this.scaifeStore.readerTextWidth;
      },
      textDirection() {
        return this.passageIsRtl ? 'rtl' : 'ltr';
      },
      metricalMode() {
        return this.scaifeStore.metricalMode;
      },
      grammaticalEntriesMode() {
        return this.scaifeStore.grammaticalEntriesMode;
      },
      showMetricalCredit() {
        if (!this.metricalMode) {
          return false;
        }
        return this.metricalLines.length > 0;
      },
      showGammarCredit() {
        if (!this.grammaticalEntriesMode) {
          return false;
        }
        const tokensHaveEntries =
          this.textParts
            .map(textPart => {
              return textPart.tokens.map(token => {
                const entries = token.grammaticalEntries;
                return entries && entries.length > 0;
              });
            })
            .flat()
            .filter(hasEntries => hasEntries).length > 0;
        return tokensHaveEntries;
      },
      metricalLines() {
        if (!this.metricalMode) {
          return [];
        }
        return this.textParts.filter(textPart => {
          const { metricalAnnotations } = textPart;
          const annotation = metricalAnnotations[0];
          const htmlContent = annotation && annotation.htmlContent;
          return htmlContent !== undefined;
        });
      },
      showMetricalEmpty() {
        if (!this.metricalMode) {
          return false;
        }
        return this.metricalLines.length === 0;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .reader {
    display: flex;
    justify-content: center;
  }
  .text {
    font-family: var(--sv-widget-reader-text-font-family, 'Noto Serif');
    margin: 1em 0;

    &.text-xs {
      line-height: 1.5;
    }
    &.text-sm {
      line-height: 1.6;
    }
    &.text-md {
      line-height: 1.7;
    }
    &.text-lg {
      line-height: 1.8;
    }
    &.text-xl {
      line-height: 1.9;
    }
  }
  .text.rtl {
    font-family: var(
      --sv-widget-reader-text-font-family-rtl,
      'Amiri',
      'Noto Serif'
    );
    margin: 1em 0;

    &.text-xs {
      font-size: 16px;
      line-height: 1.5;
    }
    &.text-sm {
      font-size: 20px;
      line-height: 1.6;
    }
    &.text-md {
      font-size: 24px;
      line-height: 1.7;
    }
    &.text-lg {
      font-size: 28px;
      line-height: 1.8;
    }
    &.text-xl {
      font-size: 32px;
      line-height: 1.9;
    }
  }

  .widget-sidebar .text {
    font-size: 14px;
    line-height: 1.6;
  }

  .text-xs {
    font-size: 12px;
  }
  .text-sm {
    font-size: 14px;
  }
  .text-md {
    font-size: 16px;
  }
  .text-lg {
    font-size: 20px;
  }
  .text-xl {
    font-size: 24px;
  }

  .reader-attribution {
    margin-top: 1rem;
    text-align: center;
  }

  // TODO: media queries for defaults?
  .text-width-narrow {
    max-width: 20em;
  }

  .text-width-normal {
    max-width: 30em;
  }

  .text-width-wide {
    max-width: 40em;
  }

  .text-width-full {
    max-width: 100%;
  }
  .reader-container {
    flex: 4;
  }
</style>
