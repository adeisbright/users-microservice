import events from "events";

const { EventEmitter } = events;

class ErrorAlert extends EventEmitter {
    constructor(msg, type) {
        super();
        this.message = msg;
        this.errorType = type;
    }

    /**
     * @description
     * Raises an alarm about the error that was raised.
     */
    notify() {
        this.addListener("error", this.sendError);
        this.emit("error");
    }
    /**
     * @description
     * Sends an error for logging purpose via the selected channel
     */
    sendError() {
        console.log(`A new ${this.errorType} : ${this.message}`);
    }
}

export default ErrorAlert;
