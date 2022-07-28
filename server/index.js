const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", require("./routers/auth"));

mongoose.connect("mongodb://localhost:27017/users", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(db => {console.log(`DB is connected`)
    app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})
})
.catch(err => console.log(err));





