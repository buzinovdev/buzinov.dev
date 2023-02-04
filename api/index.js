const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });

mongoose.set('strictQuery', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const app = express();
const mongodbUri = process.env.MONGODB_URI
const port = process.env.PORT || 8000;

// routers
const authRouter = require("./routers/authRouter")
const projectsRouter = require("./routers/projectsRouter")
const uploadRouter = require("./routers/uploadRouter")
const mailerRouter = require("./routers/mailerRouter")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// routers
app.use("/auth", authRouter)
app.use("/projects", projectsRouter)
app.use("/upload", uploadRouter)
app.use("/mailer", mailerRouter)

const start = async () => {
  try {
    await mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true})
    app.listen(port, () => console.log(`Express + TypeScript server started on port ${port} ${process.env.MONGODB_URI}`))
  } catch (e) {
    console.log(e)
  }
}

start()