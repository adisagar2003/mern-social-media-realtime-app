const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/authRoutes');
const connectDb = require('./utils/dbConn');
const checkAdmin = require('./middlewares/checkAdmin');
const conversationRouter = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const http = require('http');
const {Server} = require("socket.io");
const conversationModel = require("./models/conversationModel.js");
const messageModel = require("./models/messageModel.js");
 const server = http.createServer(app);
require('dotenv').config();


//Connecting database
connectDb();



//Passing Middlewares
app.use(cors());
app.use(express.json());

const io = new Server(server, {
    pingTimeout: 60000,
    cors:{
        origin:'*',
        methods: ["GET", "POST"]
    }
 });
 io.on("connection",(socket)=>{
    socket.on('join', (room) => {
        console.log(`Socket ${socket.id} joining ${room}`);
        socket.join(room);
     });
    socket.on("send_message",async (data)=>{
        const message = new messageModel(data);
      

        io.to(message.conversationId.toString()).emit("get_message",data);
        const resultMessage  = await message.save();
    })
 });

//Testing API
app.get('/test',(req,res)=>{
    res.json({
        test:'Working'
    });
});

app.get('/',(req,res)=>{
    res.send("<h1>Chat App Backend </h1>");
})


//Routes 
app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/conversation',conversationRouter);
app.use('/messages', messageRoutes);
server.listen(process.env.PORT||3300, ()=>{
    console.log("Listening at 😃", 3300, );
})