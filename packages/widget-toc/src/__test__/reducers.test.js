import reducer from '../reducers'

const dataProvider = [
    {
        query: 'ref-1',
        data: {
            "@id": "urn:cite:scaife-viewer:toc.iliad-folio-root",
            "title": "Iliad Books by Folio Ref",
            "description": "Mapping between book / line boundaries to Venetus A folios",
            "items": [
                {
                    "title": "1",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-1"
                },
                {
                    "title": "2",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-2"
                },
                {
                    "title": "3",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-3"
                },
            ]
        },
        expected: {
            "@id": "urn:cite:scaife-viewer:toc.iliad-folio-root",
            "description": "Mapping between book / line boundaries to Venetus A folios",
            "items": [
                {
                    "title": "1",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-1",
                },
            ],
            "title": "Iliad Books by Folio Ref",
        }
    },
    {
        query: '2',
        data: {
            "@id": "urn:cite:scaife-viewer:toc.iliad-folio-root",
            "title": "Iliad Books by Folio Ref",
            "description": "Mapping between book / line boundaries to Venetus A folios",
            "items": [
                {
                    "title": "1",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-1"
                },
                {
                    "title": "2",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-2"
                },
                {
                    "title": "3",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-3"
                },
            ]
        },
        expected: {
            "@id": "urn:cite:scaife-viewer:toc.iliad-folio-root",
            "description": "Mapping between book / line boundaries to Venetus A folios",
            "items": [
                {
                    "title": "2",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-2",
                },
            ],
            "title": "Iliad Books by Folio Ref",
        }
    },
    {
        query: '8',
        data: {
            "@id": "urn:cite:scaife-viewer:toc.iliad-folio-root",
            "title": "Iliad Books by Folio Ref",
            "description": "Mapping between book / line boundaries to Venetus A folios",
            "items": [
                {
                    "title": "1",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-1"
                },
                {
                    "title": "2",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-2"
                },
                {
                    "title": "3",
                    "uri": "urn:cite:scaife-viewer:toc.iliad-folio-ref-3"
                },
            ]
        },
        expected: {
            "@id": "urn:cite:scaife-viewer:toc.iliad-folio-root",
            "description": "Mapping between book / line boundaries to Venetus A folios",
            "items": [],
            "title": "Iliad Books by Folio Ref",
        }
    },
];

test.each(dataProvider)('Filter TOC', ({query, data, expected}) => {
    let actual = reducer.tocReducer(data, query);

    expect(actual).toEqual(expected)
});
