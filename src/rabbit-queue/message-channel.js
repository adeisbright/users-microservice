import amqplib from "amqplib";
import config from "../config.js";
import fileLogger from "../common/logging/file-logger.js";

/**
 * @description
 * Sends a message to a name queue
 * @param {Any} message the message to be sent to the queue
 * @param {String} queueName  the queue name
 * @returns
 * true if message was sent or false if no message was sent
 */

const messageChannel = async (queueName, message, isDurable = false) => {
    let connect = await amqplib.connect(config.amqp);

    try {
        const messageTypes = ["number", "string", "boolean"];
        const channel = await connect.createChannel();
        channel.assertQueue(queueName, {
            durable: isDurable,
        });
        let msg = messageTypes.includes(typeof message)
            ? message
            : JSON.stringify(message);
        channel.sendToQueue(queueName, Buffer.from(msg));
        return true;
    } catch (err) {
        fileLogger.log({
            level: "error",
            message: err.message,
        });
        return false;
    } finally {
        setTimeout(async () => {
            await connect.close();
        }, 500);
    }
};

export default messageChannel;
