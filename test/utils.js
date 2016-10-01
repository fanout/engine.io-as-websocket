import test from "tape";

import * as utils from "../src/utils";

test("utils:splitHref", t => {
    {
        const { uri, path } = utils.splitHref("ws://localhost:3000");

        t.equals(uri, "ws://localhost:3000");
        t.equals(path, "/");
    }
    {
        const { uri, path } = utils.splitHref("ws://localhost:3000/test");

        t.equals(uri, "ws://localhost:3000");
        t.equals(path, "/test");
    }
    t.end();
});
