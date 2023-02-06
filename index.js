import * as mqtt from "async-mqtt"
const client  = mqtt.connect('mqtt://test.mosquitto.org')

const handlingMessage = async () => {
    try {
        await client.on('message', (topic, message) => {
            // the message is getting into the buffer type
            // so should convert this data into string using .toString method
            console.log(`client get message: ${message.toString()}`);
        });
    } catch (e) {
        console.log(e.stack);
    }
};

const run = async () => {
    console.log("Starting the connection...");

    try {
        await client.subscribe("presence");
        await client.publish("presence", "MQTT connection is started!");
    } catch (e) {
        console.log(e.stack);
    }
}

const bootstrap = async () => {
    await run();
    await handlingMessage();
}

bootstrap();
