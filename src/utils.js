import url from "url";

export function splitHref(href) {

    const parsed = url.parse(href);

    const { protocol, slashes, auth, host, pathname } = parsed;

    const uri = url.format({ protocol, slashes, auth, host });

    const path = pathname != null ? pathname : "/";

    return { uri, path };
}
