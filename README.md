# Engine.IO-as-WebSocket

Author: Katsuyuki Ohmuro <harmony7@pex2.jp>  
Mailing List: http://lists.fanout.io/mailman/listinfo/fanout-users

Engine.IO-as-WebSocket is a small library that wraps [engine.io-client](https://github.com/socketio/engine.io-client) to provide an interface similar to the browser `WebSocket` class. This makes it easy to use Engine.IO in otherwise pure-WebSocket code via dependency injection.

Apparently the Engine.IO client [originally did mimic the WebSocket interface](http://www.devthought.com/2012/07/07/the-realtime-engine/) but for whatever reason its interface has drifted since then.

## License

Engine.IO-as-WebSocket is offered under the MIT license. See the COPYING file.

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
