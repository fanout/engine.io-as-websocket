# Engine.IO-as-WebSocket

Author: Katsuyuki Ohmuro <harmony7@pex2.jp>  

Engine.IO-as-WebSocket is a small library that wraps [engine.io-client](https://github.com/socketio/engine.io-client) to provide an interface similar to the browser `WebSocket` class. This makes it easy to use Engine.IO in otherwise pure-WebSocket code via dependency injection.

Apparently the Engine.IO client [originally did mimic the WebSocket interface](http://www.devthought.com/2012/07/07/the-realtime-engine/) but for whatever reason its interface has drifted since then.

## License

Engine.IO-as-WebSocket is offered under the MIT license. See the COPYING file.

## Installation

### Browsers

For use in a browser script tag, clone this repository and build it:

```
git clone https://github.com/fanout/engine.io-as-websocket.git
cd engine.io-as-websocket
npm install
npm run build
```

The resulting file will be available at `dist/engine.io-as-websocket.js` (and `dist/engine.io-as-websocket.min.js` for a minified version).

or get the npm package:

```
npm install engine.io-as-websocket
```

The file will be available at `node_modules/engine.io-as-websocket/dist/engine.io-as-websocket.js` (and `node_modules/engine.io-as-websocket/dist/engine.io-as-websocket.min.js` for a minified version).

Engine.IO-as-WebSocket will become available through the `EngineIoSocket` global variable.

### Node.js (and Browserify/Webpack/etc)

Add to your project using npm:

```
npm install engine.io-as-websocket --save
```

And then reference Engine.IO-as-WebSocket from your code file:

```javascript
import EngineIoSocket from "engine.io-as-websocket";
```

or

```javascript
const EngineIoSocket = require("engine.io-as-websocket").default;
```

## Usage

Simply substitute `WebSocket` with `EngineIoSocket` in your code:

```html
<script src="/path/to/engine.io-as-websocket.js"></script>
<script>
  var socket = new EngineIoSocket('ws://localhost');
  socket.onopen = function () {
    socket.onmessage = function (event) {
      console.log('received message: ' + event.data);
    };
    socket.onclose = function (event) {};
  };
</script>
```

## Caveats

The `onclose` callback provides an event containing `code` and `wasClean`, however `code` is bogus and `wasClean` is always `false`. This is because the Engine.IO client doesn't bubble up the values reported by its underlying WebSocket. Do not rely on clean closing at the transport level when using Engine.IO.
