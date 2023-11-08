const express = require("express");
const cors = require("cors")
const app = express();
const port = 3000;

const corsOption = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOption));

const s3Routes = require("./src/router/s3.routes");

app.use("/api/s3/buckets", s3Routes);

// send back a 404 error for any unknown api request
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `${req.method} - ${req.protocol}://${req.hostname}${
      req.hostname == "localhost" ? `:${port}` : ""
    }${req.originalUrl} - Route not found!`,
  });
});

app.listen(port, () => {
  console.log(`S3 service is running on port ${port}`);
});
