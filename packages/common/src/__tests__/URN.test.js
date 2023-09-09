import { test, expect } from 'vitest';
import URN from '../URN';

const dataProvider = [
  [
    'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:12.80-12.230',
    {
      absolute: 'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:12.80-12.230',
      delimiter: ':',
      scheme: 'urn',
      nid: 'cts',
      nss: 'greekLit',
      textGroup: 'tlg0012',
      work: 'tlg0012.tlg001.perseus-eng3',
      reference: '12.80-12.230',
      version: 'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:',
    },
  ],
  [
    'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:13.1-13.125',
    {
      absolute: 'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:13.1-13.125',
      delimiter: ':',
      scheme: 'urn',
      nid: 'cts',
      nss: 'greekLit',
      textGroup: 'tlg0012',
      work: 'tlg0012.tlg001.perseus-eng3',
      reference: '13.1-13.125',
      version: 'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:',
    },
  ],
  [
    'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3',
    {
      absolute: 'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3',
      delimiter: ':',
      scheme: 'urn',
      nid: 'cts',
      nss: 'greekLit',
      textGroup: 'tlg0012',
      work: 'tlg0012.tlg001.perseus-eng3',
      reference: undefined,
      version: 'urn:cts:greekLit:tlg0012.tlg001.perseus-eng3:',
    },
  ],
];

test.each(dataProvider)(
  'Instantiating URN class given %s',
  (urn, expected) => {
    const urnObject = new URN(urn);
    expect(expected).toEqual(urnObject);
    expect(urn).toEqual(urnObject.toString());
  });

test('get lcp on valid reference', () => {
  const urnObject = new URN(dataProvider[0][0]);
  expect('80').toEqual(urnObject.lcp);
});

test('get lcp on reference null', () => {
  const urnObject = new URN(dataProvider[2][0]);
  expect(null).toEqual(urnObject.lcp);
});
