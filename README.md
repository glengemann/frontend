# Scaife Viewer Frontend

![](ScaifeViewer.png)


## Development

There is a host environment setup under `./src` that you can run by executing:

```
yarn dev
```

This will create a live environment that will auto-reload when changing any
source in any of the packages being used.  Be warned, that development in Safari
is problematic due to the browser over-caching.  Use FireFox or Chrome for most
reliable development experience.

You can build packages by running:

```
yarn build
```

## Creating a new package

- Create the package

```
cd packages
mkdir -p <package-name> && cd <package-name>
yarn init
```

- Mimic other packages for entrypoint, license, etc
- Copy over `LICENSE` file
- Install it locally
```
yarn install
```
- Install dependencies
```
 npx lerna add graphql-tag --scope=@scaife-viewer/<package-name>
 ```
