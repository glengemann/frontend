import { defineStore } from 'pinia';
import gql from 'graphql-tag';
import URN from '@scaife-viewer/common';
import {
  DISPLAY_MODE_COMMENTARIES,
  DISPLAY_MODE_DEFAULT,
  DISPLAY_MODE_DICTIONARY_ENTRIES,
  DISPLAY_MODE_GRAMMATICAL_ENTRIES,
  DISPLAY_MODE_INTERLINEAR,
  DISPLAY_MODE_METRICAL,
  DISPLAY_MODE_NAMED_ENTITIES,
  SHOW_GLOSS,
  SHOW_GRAMMATICAL_TAGS,
  SHOW_LEMMA,
  SHOW_MORPH_TAG,
  SHOW_RELATIONSHIP,
  SHOW_TRANSLITERATION,
} from "./constans";

const useScaifeStore = defineStore('scaife', {
  state() {
    return {
      libraryTree: null,
      metadata: null,
      passage: null,
      selectedNamedEntities: [],
      selectedGrammaticalEntries: [],
      selectedToken: null,
      selectedLemmas: [],
      selectedCommentaries: [],
      [SHOW_TRANSLITERATION]: false,
      [SHOW_LEMMA]: false,
      [SHOW_RELATIONSHIP]: false,
      [SHOW_MORPH_TAG]: false,
      [SHOW_GRAMMATICAL_TAGS]: false,
      [SHOW_GLOSS]: false,
      showCitedLemmas: true,
      showAvailableLemmas: true,
      showMissingLemmas: true,
      commentariesHash: {},
      nowPlaying: null,
      readerTextSize: 'md',
      readerTextWidth: 'normal',
      // skeleton
      mainLayoutFlexClass: 'main-layout-flex-2',
      leftVisible: true,
      rightVisible: true,
      rightOpen: true,
      leftOpen: true,
    };
  },
  getters: {
    getPassage: state => (state.passage ? new URN(state.passage) : null),
    firstPassageUrn: state =>
      state.metadata ? new URN(state.metadata.firstPassageUrn) : null,
    urn() {
      console.log('ScaiferStore:getters::urn')
      if (!this.router?.currentRoute) {
        return this.firstPassageUrn;
      }
      const { urn } = this.router.currentRoute.params;
      return urn ? new URN(urn) : this.firstPassageUrn;
    },
    displayMode() {
      if (!this.router?.currentRoute) {
        return DISPLAY_MODE_DEFAULT;
      }
      const { mode } = this.router.currentRoute.query;
      return mode || DISPLAY_MODE_DEFAULT;
    },
    defaultMode() {
      return this.displayMode === DISPLAY_MODE_DEFAULT;
    },
    interlinearMode() {
      return this.displayMode === DISPLAY_MODE_INTERLINEAR;
    },
    grammaticalEntriesMode() {
      return this.displayMode === DISPLAY_MODE_GRAMMATICAL_ENTRIES;
    },
    namedEntitiesMode() {
      return this.displayMode === DISPLAY_MODE_NAMED_ENTITIES;
    },
    dictionaryEntriesMode() {
      return this.displayMode === DISPLAY_MODE_DICTIONARY_ENTRIES;
    },
    commentariesMode() {
      return this.displayMode === DISPLAY_MODE_COMMENTARIES;
    },
    showCommentary() {
      const { commentary } = this.router.currentRoute?.query;
      return commentary === 'y';
    },
    metricalMode() {
      return this.displayMode === DISPLAY_MODE_METRICAL;
    },
  },
  actions: {
    fetchLibrary() {
      console.log('fetchLibrary');
      this.client
        .query({
          query: gql`
              {
                tree(urn: "urn:cts:", upTo: "version") {
                  tree
                }
              }
          `,
        })
        .then(data => {
          const nid = data.data.tree.tree[0];
          const textGroupsTree = nid.children.reduce((a, b) => {
            return a.concat(b.children);
          }, []);
          this.libraryTree = textGroupsTree;
        });
    },
    fetchMetadata() {
      console.log('fetchMetadata');
      this.client
        .query({
          query: gql`
                {
                  versions(first: 1) {
                    edges {
                      node {
                        id
                        metadata
                      }
                    }
                  }
                }
          `,
        })
        .then(data =>
          (this.metadata = data.data.versions.edges
            .map(e => e.node.metadata)
            .pop()),
        );
    },
    updateMetadata({ urn }) {
      console.log('ScaiferStore::updateMetadata')
      this.client
        .query({
          query: gql`
          {
            versions(urn: "${urn}") {
              edges {
                node {
                  id
                  metadata
                }
              }
            }
          }
        `,
        })
        .then(data =>
          (this.metadata = data.data.versions.edges
            .map(e => e.node.metadata)
            .pop()),
        );
    },
    clearNamedEntities() {
      this.selectedNamedEntities = [];
    },
    clearGrammaticalEntries() {
      this.selectedGrammaticalEntries = [];
    },
    selectToken({ token }) {
      this.selectedToken = token;
    },
    setSelectedLemmas({ lemmas }) {
      this.selectedLemmas = lemmas;
    },
    setSelectedCommentaries({ commentaries }) {
      this.selectedCommentaries = commentaries;
    },
    selectNamedEntities({ entities }) {
      this.selectedNamedEntities = entities;
    },
    selectGrammaticalEntries({ entries }) {
      this.selectedGrammaticalEntries = entries;
    },
    selectLine({ ref }) {
      this.selectedLine = ref;
    },
    setPassage({ urn }) {
      this.passage = urn;
    },
  },
});

export default useScaifeStore;
