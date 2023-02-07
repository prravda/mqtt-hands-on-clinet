import { connect } from 'async-mqtt';

const brokerUrl = 'mqtt://test.mosquitto.org';
const client = connect(brokerUrl);

const exampleTopic = 'elice';

const bootstrapFunction = async () => {
    try {
        console.log('Starting...');

        // subscribe a topic using wildcard(#)
        await client.subscribe(`${exampleTopic}/#`);

        // publish a message with various topics
        await client.publish(`${exampleTopic}/coding`, `Elice coding: IoT`);
        await client.publish(exampleTopic, `Elice coding: SWE`);
        await client.publish(
            `${exampleTopic} in wonderland`,
            'Not related with coding'
        );

        // end this client
        await client.end();

        console.log('Fin');
    } catch (e) {
        console.error(e);
    }
};

const messageHandler = async (topic, message) => {
    try {
        // the message type is Buffer,
        // so this should be converted as a string using toString() method
        console.log(`Got a message from ${topic}: ${message.toString()}`);
    } catch (e) {
        console.error(e);
    }
};

client.on('connect', bootstrapFunction);
client.on('message', messageHandler);
