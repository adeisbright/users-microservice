import amqplib from "amqplib";
import config from "../config.js";
import fileLogger from "../common/logging/file-logger.js";

/**
 * @description
 * sends a message to an  exchange
 * @param {Any} message the message to send to the exchange
 * @param {String} key the key for routing the message
 * @param {String} exchange the exchange name
 * @param {String} type the type of exchange
 * @param {Boolean} isDurable the durability of the exchange
 * @returns true if the message was sent or false if the message fails
 */

const messageExchange = async (
    message,
    exchange,
    type = "direct",
    key = "user.signup",
    isDurable = false
) => {
    let connect = await amqplib.connect(config.amqp);
    try {
        const messageTypes = ["number", "string", "boolean"];
        const exchangeTypes = ["direct", "topic", "fanout", "headers"];

        if (!exchangeTypes.includes(type)) {
            throw new Error("Unsupported exchange type provided");
        }
        const channel = await connect.createChannel();
        channel.assertExchange(exchange, type, { durable: isDurable });
        let msg = messageTypes.includes(typeof message)
            ? message
            : JSON.stringify(message);
        channel.publish(exchange, key, Buffer.from(msg));
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

export default messageExchange;
