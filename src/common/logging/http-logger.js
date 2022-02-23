import morgan from "morgan";
import streamLogger from "./stream-logger.js";

const customFormat = (token, req, res) => {
    return [
        token["remote-addr"](req, res),
        token.date(req, res),
        token.method(req, res),
        "HTTP/",
        token["http-version"](req, res),
        token.url(req, res),
        token.status(req, res),
        "TTM",
        token["response-time"](req, res),
        "ms",
        "TRT",
        token["total-time"](req, res),
        "ms",
        token.res(req, res, "Content-length"),
        token["user-agent"](req, res),
    ].join(" ");
};

const httpLogger = morgan(customFormat, {
    immediate: false,
    stream: streamLogger.stream,
});

export default httpLogger;
