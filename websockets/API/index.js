const express = require('express')
const { engine } = require('express-handlebars')
const { Server } = require('socket.io')
const { createServer } = require("http");
const { productos } = require('../Routes/productos')
const { ContainerSQLite } = require('../SQLite3/ContainerSQLite.js')
const { ContainerMariaDB } = require('../MariaDB/ContainerMariaDB.js')

const SQLite = new ContainerSQLite();
const MariaDB = new ContainerMariaDB()


const PORT = 3000
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer)

app.use(express.static('Public'))
app.use(express.static('Uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

io.on('connection', async (socket) => {
    console.log('Cliente conectado')
    socket.emit('fromServerDates', await MariaDB.allProducts())
    socket.emit('fromServerChat', JSON.stringify(await SQLite.allMessages()))


    socket.on('fromClient', async dates =>{
        await MariaDB.save(dates)
        io.sockets.emit('fromServerDates', await MariaDB.allProducts())
    })

    socket.on('fromClientChat', async msge => {                
        SQLite.save(msge)
        io.sockets.emit('fromServerChat', JSON.stringify( await SQLite.allMessages()))
    })        
})


/*Ruta Index API NoREST*/ 
app.get('/', (req, res) => {
    res.render('index',{
        messageSuccess: null,
        errores: null,
        prodVal: null
    })
})

app.use('/api', productos)





httpServer.listen(PORT, () => {
    console.log(`Corriendo en puerto ${PORT}`)
})

app.use('*', (req, res, next) => {
    res.status(404).json({message: "El rescurso buscado no existe"});
});

app.use((err, req, res, next) =>{
    res.status(err.statusCode ? err.statusCode : 500 ).json({
        message: err.message,
        status: err.statusCode
    })
});