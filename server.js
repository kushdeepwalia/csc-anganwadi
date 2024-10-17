const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const connection = require("./startup/db");
const app = express();
const userRoutes = require("./routes/student")

app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
   );
   if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "*");

      return res.status(200).json({});
   }
   next();
});

app.use("/api/v1/user", userRoutes)

app.use("/", (req, res, next) => {
   res.status(200).json({ message: "Api Working" })
})

app.listen(process.env.PORT || 5000, function () {
   console.log(
      "Express server listening on port %d in %s mode",
      this.address().port,
      app.settings.env
   );
   connection("mongodb+srv://cscAnganWadiIIT:yBaXJTXUN0uSvvDV@csctabapp.dmjpu.mongodb.net/?retryWrites=true");
});