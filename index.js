import * as mqtt from "mqtt"
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
    console.log('client connect: start');
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log();
    console.log(`client get message: ${message.toString()}`);
    client.end()
})