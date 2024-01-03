const amqp=require('amqplib');
const { OrderModel } = require('../model/order');
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
const createQueue=async(queueName)=>{
    const chanel=await returnChanel();
    await chanel.assertQueue(queueName);
}
const createOrderWithQueue=async(queueName)=>{
    await createQueue(queueName);
    chanel.consume(queueName,async msg=>{
        if(msg.content){
            const {products,email}=JSON.parse(msg.content.toString());
            const newOrder=await OrderModel.create({products:products,email,totalPrice:(products.map(p=>+p.price)).reduce((prev,curr)=>prev+curr,0)});
            chanel.ack(msg);
            pushToQueue('PRODUCT',newOrder);
        }
    })
}
module.exports={
    connectToChanel,
    returnChanel,
    pushToQueue,
    createOrderWithQueue
}