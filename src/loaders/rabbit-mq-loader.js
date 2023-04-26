import { connectToQueue , sendMessageToExchange } from "maontech-rabbitmq-wrapper"; 
import config from "../config.js";

const connectToRabbitMQ = async () => {
    try {
        const connect = await connectToQueue(config.amqp)
        if (connect.connection) {
            return connect.connection 
        }
    } catch (error) {
        return null 
    }
}
const handleRabbitError = error => console.log(error)

const publishMessage = async (data) => {
    try {
        const rabbitConnect  = await connectToRabbitMQ()
        if (!rabbitConnect) {
            handleRabbitError("Issues with Connecting to Rabbit MQ")
        } else {
            const exchangeParam = {
                connect: rabbitConnect,
                exchangeName: "es",
                message: JSON.stringify(data),
                exchangeKey: "esKey",
                exchangeType: "fanout",
                isDurable: false,
                timeout: 500
            }
            const isMessageSent = await sendMessageToExchange(exchangeParam);
            if (!isMessageSent) {
                handleRabbitError("The message was not sent to the queue")
            }
        }
    } catch (error) {
        console.log("Error Occured Within message publishing")
        console.log(error)
    }
}

export default publishMessage