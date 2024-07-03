const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRouter");
const roomRoutes = require("./routes/roomRouter");
const eventRoutes = require("./routes/eventRouter");
const roomEventRoutes = require("./routes/roomEventRouter");

dotenv.config();


const PORT = Number.parseInt(process.env.PORT);
const DB_HOSTNAME = process.env.DB_HOSTNAME;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const DB_URI = `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`;

//------------------------
const app = express();
//create application

//middleware
app.use(bodyParser.urlencoded({ extended: false })); //help with parsing request body
app.use(express.json());
app.use(cors());

//connect to DB
mongoose.connect(DB_URI);

//verify connection to DB
const db = mongoose.connection;
db.on("error", () => {
    console.log("[ERROR] Failed to connect to DB!");
});
db.once("open", () => {
    console.log("[SYSTEM] Connected to MongoDB successfully!");
});


//health check endpoint
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Server is alive"
    });
})

//routes
app.use("/auth", authRoutes);
app.use("/room", roomRoutes);
app.use("/event", eventRoutes);
app.use("/roomEvent", roomEventRoutes);

//start server
app.listen(PORT, () => {
    console.log("listening on port:", PORT);
})