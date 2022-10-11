require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
//const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")
const noteRoutes = require("./routes/notes")

//EXPRESS APP
const app = express()

//MIDDLEWARE
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//ROUTERS
//app.use("/api/workouts/", workoutRoutes)
app.use("/api/user/", userRoutes)
app.use("/api/notes/", noteRoutes)

// CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //SETUP APP ONCE DB HAS LOADED
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}...`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
