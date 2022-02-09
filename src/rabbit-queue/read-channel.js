import amqplib from "amqplib";
import config from "../config.js";
import fileLogger from "../common/logging/file-logger.js";

/**
 * @description
 * consumes a message from a name queue and runs the message according
 * cb
 * @param {String} queueName name of the queue
 * @param {Function} cb the callback to run assuming the message was read from the queue
 * @param {Boolean} isDurable states whether the queue is durable or not
 * @returns true if the message was read or false if the message was not read
 */
const readFromChannel = async (queueName, cb, isDurable = false) => {
    let connect = await amqplib.connect(config.amqp);

    try {
        const channel = await connect.createChannel();
        channel.assertQueue(queueName, {
            durable: isDurable,
        });

        await channel.consume(queueName, (e) => cb(e), { noAck: true });
        return true;
    } catch (err) {
        fileLogger.log({
            level: "error",
            message: err.message,
        });
        return false;
    } finally {
        await connect.close();
    }
};

export default readFromChannel;
