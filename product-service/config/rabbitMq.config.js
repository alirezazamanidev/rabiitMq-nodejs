const amqp=require('amqplib');
let  chanel;
const connectToChanel=async()=>{
    try {
        const connection=await amqp.connect('amqp://localhost:5672');
        return (await connection.createChannel());
        
    } catch (error) {
        console.log('can not connect to rabbitMQ');
    }
}
const returnChanel=async()=>{
    if(!chanel){
        chanel=await connectToChanel();
    }
    return chanel;
}

const pushToQueue=async(queueName,data)=>{
    try {
      await chanel.assertQueue(queueName);
      return await chanel.sendToQueue(queueName,Buffer.from(JSON.stringify({data})));
    } catch (error) {
        console.log('can not push queue');
    }
}

module.exports={
    connectToChanel,
    returnChanel,
    pushToQueue
}