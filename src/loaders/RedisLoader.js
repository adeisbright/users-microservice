import redis from "redis";
import util from "util";
import dotenv from "dotenv";

dotenv.config();

const { promisify } = util;

// Connecting to local cluster
const client = redis.createClient({
    host: "127.0.0.1",
    port: "6378",
});

try {
    // Promisify redis client to work with Async-Await
    client.getAsync = promisify(client.get).bind(client);
    client.existsAsync = promisify(client.exists).bind(client);
} catch (error) {
    console.error(error);
}

client.on("connected", (e) => {
    console.log("Connected to Redis Server");
});
client.on("error", (e) => console.error(e));
client.on("closed", (e) => console.log("Client Close"));

export default client;
