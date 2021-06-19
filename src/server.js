require('dotenv').config()
import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRoutes from "./routes/web"
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import session from "express-session"
import connectFlash from "connect-flash"
import passport from "passport"

let app = express()
let http = require('http')
let server = http.createServer(app)

//cookie parser
app.use(cookieParser('secret'))

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}))

// Enable body parser post data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Config view engine
configViewEngine(app)

//Enable flash message
app.use(connectFlash())

//Config passport middleware
app.use(passport.initialize())
app.use(passport.session())

// init all web routes
initWebRoutes(app)

let port = process.env.PORT || 8080
server.listen(port, () => console.log(`Running on port ${port}...`))
