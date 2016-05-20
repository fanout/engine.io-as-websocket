import EngineIoClient from "engine.io-client";

export default class EngineIoSocket {
    constructor(url) {
        this.onopen = null;
        this.onclose = null;
        this.onmessage = null;
        this.onerror = null;
        this.eioSocket = new EngineIoClient(url);
        this.url = url;
        this.extensions = "";
        this.protocol = "";
        this.bufferedAmount = "";

        this.readyState = this.eioSocket.readyState;

        this.eioSocket.on('open', () => {
            this.readyState = this.eioSocket.readyState;
            if (this.onopen != null) {
                const event = new Event("open");
                this.onopen.call(this, event);
            }
        });

        this.eioSocket.on('close', (reason, desc) => {
            this.readyState = this.eioSocket.readyState;
            if (this.onclose != null) {
                const event = new Event("close");
                event.reason = reason;
                
                // NOTE: eioSocket doesn't have a really clean way of
                // telling us why it disconnected and whether it was clean
                event.code = 1001;
                event.wasClean = false;

                this.onclose.call(this, event);
            }
        });
        
        this.eioSocket.on('message', (data) => {
            this.readyState = this.eioSocket.readyState;
            if (this.onmessage != null) {
                const event = Object.assign(new Event("message"), { data });
                this.onmessage.call(this, event);
            }
        });

        this.eioSocket.on('error', () => {
            this.readyState = this.eioSocket.readyState;
            if (this.onerror != null) {
                const event = new Event("error");
                this.onerror.call(this, event);
            }
        });
    }
    send(message) {
        this.eioSocket.send(message);
        this.readyState = this.eioSocket.readyState;
    }
    close() {
        this.eioSocket.close();
        this.readyState = this.eioSocket.readyState;
    }
}
