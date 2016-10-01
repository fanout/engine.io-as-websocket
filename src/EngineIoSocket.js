import EngineIoClient from "engine.io-client";

import { splitHref } from "./utils";

const readyStateStringToValue = new Map([
    [ 'opening', 0 ],
    [ 'open', 1 ],
    [ 'closing', 2 ],
    [ 'closed', 3 ]
]);

export default class EngineIoSocket {
    constructor(url) {

        const { uri, path } = splitHref(url);

        this.onopen = null;
        this.onclose = null;
        this.onmessage = null;
        this.onerror = null;
        this.eioSocket = new EngineIoClient(uri, { path });
        this.url = url;
        this.extensions = "";
        this.protocol = "";
        this.bufferedAmount = undefined;

        this.setReadyState();

        this.eioSocket.on("open", () => {
            this.setReadyState();
            if (this.onopen != null) {
                const event = new Event("open");
                this.onopen.call(this, event);
            }
        });

        this.eioSocket.on("close", (reason, desc) => {
            this.setReadyState();
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
        
        this.eioSocket.on("message", (data) => {
            this.setReadyState();
            if (this.onmessage != null) {
                const event = Object.assign(new Event("message"), { data });
                this.onmessage.call(this, event);
            }
        });

        this.eioSocket.on("error", () => {
            this.setReadyState();
            if (this.onerror != null) {
                const event = new Event("error");
                this.onerror.call(this, event);
            }
        });
    }
    setReadyState() {
        this.readyState = readyStateStringToValue.get(this.eioSocket.readyState);
    }
    send(message) {
        this.eioSocket.send(message);
        this.setReadyState();
    }
    close() {
        this.eioSocket.close();
        this.setReadyState();
    }
}
