import displayName from '../display-mode-utils';

test('name param is a string ', () => {
    let widgetConfig = {
        scaifeConfig: {
            displayName: 'Table of Contents',
        }
    };

    let actual = displayName(widgetConfig.scaifeConfig.displayName);
    expect('Table of Contents').toEqual(actual);
});

test('name param is a function', () => {
    const displayNameCallback = (rootGetters, scaifeConfig) => {
        return 'Commentary';
    };

    let widgetConfig = {
        scaifeConfig: {
            displayName: displayNameCallback,
        }
    };
    let store = {};
    let scaifeConfig = {};

    let actual = displayName(
        widgetConfig.scaifeConfig.displayName,
        store,
        scaifeConfig
    );
    expect('Commentary').toEqual(actual);
});
