# Chamel (short for chameleon)

This is a ReactJS UI framework designed to provide the most native experience possible automatically across common platforms and devices.

## Using Chamel

### The Library

    npm install chamel --save

Now you can use it anywhere within your ES6 code via imports

    import FlatButton from 'chamel/FlatButton'

    const App = () => {
        return (<div><FlatButton label={'Click Me'} /></div>);
    }

### The Styles

Chamel uses cssmodules and sass-loader to create dynamic css documents from the components you use.
If you do not use webpack then follow the "Without Webpack" directions below.

There are styles for iOS, Material (Android), and Windows. Eventually we will have the library
automatically switch between these, but for now it is up to developers to decide which style to load.

### Utilizing Webpack

First install sass-loader

    imp install sass-loader --save

Then make sure that the following config is added to your webpack config

    module: {
      {
        test: /\.(scss)$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[path][name]-[local]-[hash:base64:5]&sourceMap&importLoaders=1&!sass?sourceMap')
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]&sourceMap&importLoaders=1&!sass?sourceMap')
      },
    }

Take a look at the webpack config in the ./demo directory for a full example of how to utlize styles with cssmodules.

### Without Webpack

#### 1. Include the CSS in the head of your document

All the themes can be found in /dist/css/chamel-[themename].cmp.css

## Developing, Testing & Building

### Docker (Preferred)

The simplest way to interact with chamel is through docker because it provides a predictable environment across all platforms.

    docker-compose up

With the above container running, you can open a new tab/window and run tests with:

    docker exec -it chamel npm test

### Local Node

If you would like to build the project or develop it locally then follow these steps.

First make sure you have the latest version of node installed and working locally: https://nodejs.org

#### 1. Open your terminal or command prompt and type

    npm install

#### 2. Install Build Tools (ONLY if running windows)

    npm install --global --production windows-build-tools

###$ 3. Run the server

    npm start

###$ 4. Run tests

    npm test

This will start a development server that can be accessed at http://localhost:8081

## Building and Publishing (from develop)

1. Bump the version number (npm run patch)
2. Merge develop to master
3. Push
