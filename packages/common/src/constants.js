// TODO: Determine if we need to decouple these constants further
import {
  SHOW_TRANSLITERATION,
  SHOW_LEMMA,
  SHOW_RELATIONSHIP,
  SHOW_MORPH_TAG,
  SHOW_GRAMMATICAL_TAGS,
  SHOW_GLOSS,
} from '@scaife-viewer/stores';

// eslint-disable-next-line import/prefer-default-export
export const TOKEN_ANNOTATION_TOGGLES = new Map([
  [SHOW_TRANSLITERATION, 'Transliteration'],
  [SHOW_LEMMA, 'Lemma'],
  [SHOW_RELATIONSHIP, 'Relationship'],
  [SHOW_MORPH_TAG, 'Morph. Tag'],
  [SHOW_GRAMMATICAL_TAGS, 'Gram. Tags'],
  [SHOW_GLOSS, 'Gloss'],
]);
