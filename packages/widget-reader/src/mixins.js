import useScaifeStore from "@scaife-viewer/stores";

const RTL_LANGUAGES = new Set(['far']);

const PassageLanguageIsRtlMixin = {
  computed: {
    passageIsRtl() {
      const rtlLanguages = this.$scaife.config.rtlLanguages || RTL_LANGUAGES;
      const scaifeStore = useScaifeStore();
      const { metadata } = scaifeStore;
      return metadata && rtlLanguages.has(metadata.lang);
    },
  },
};

export default PassageLanguageIsRtlMixin;
