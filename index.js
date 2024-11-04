const express = require("express");
require("dotenv").config();
const customError = require("./utils/customError");
const connectDB = require("./config/db");
const globalErrorHandler = require("./controllers/errorController")
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoutes");




connectDB();
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", userRouter);


app.all("*", (req, res, next) => {
    const error=new customError(`Cant find ${req.originalUrl}`,404)
    next(error)
});



app.use(globalErrorHandler)


app.listen(process.env.PORT || 3003, () =>
  console.log(`Example app is listening on port ${process.env.PORT}.`)
);
