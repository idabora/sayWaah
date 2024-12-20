const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http').Server(app);
require('./DB/connection')
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const cookieParser=require('cookie-parser')
const bodyparser = require('body-parser')

const io = new Server(http)

const staticPath = path.join(__dirname, './public');
const partilaPath = path.join(__dirname, './views/partials')
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());  // In case you want to accept JSON dataapp.use(express.static(staticPath));
app.use(express.static(staticPath));

hbs.registerPartials(partilaPath);

app.set('view engine', '.hbs')
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 5 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    // TODO:store feature to be implement
    store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/sayWaahSession', ttl: 60 * 2 }),
    // secure:false
}))

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('setup', (msg) => {
        console.log("message:", msg);

    });

    socket.on('join chat',(room)=>{
        // room.join(room);
        // console.log('room joined-',room);
        socket.join(room);
        console.log("User Joined Room: " + room);
    })
});

// app.use(express.json());
const PORT = process.env.PORT || 2020;

app.get('/', async (req, res) => {
    res.status(200).json({
        message: "Server Runnning fine."
    })
})

app.use('/auth', require('./routes/authRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/help', require('./routes/helpRoutes'));
app.use('/chat', require('./routes/chatRoutes'));


http.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}/auth`)
});
