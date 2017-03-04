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

The simplest way to interact with chamel is through docker because it provides a predictable environment
across all platforms.

    docker build -t chamel .

Then in Linux/OSX Type

    docker run --rm -v $(pwd):/var/www/app/ -w /var/www/app -p 8081:8081 --name=chamel chamel

Or in Windows PowerShell type

    docker run --rm -v ${PWD}:/var/www/app/ -w /var/www/app -p 8081:8081 --name=chamel chamel
    
Or in the Widnows Command prompt type:

    docker run --rm -v %cd%:/var/www/app/ -w /var/www/app -p 8081:8081 --name=chamel chamel
    
With the above container running, you can open a new tab/window and run tests with:

    docker exect chamel npm test 
    
### Local Node

If you would like to build the project or develop it locally then follow these steps. 

First make sure you have the latest version of node installed and working locally: https://nodejs.org

#### 1. Open your terminal or command prompt and go to the demo subdirectory

    cd demo

#### 2. Install node dependencies
    
    npm install
    

###$ 3. Run the server

    npm start

This will start a development server that can be accessed at http://localhost:8081

### Testing
All components should have at least a basic level of unit test coverage. Unit tests are written in jasmin
and run through karma.

To run the suite and watch for changes as you work simply type:

    npm test