const express = require("express");
const mainRouter = require("./Routes");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connetToDatabase = require("./Utils/db");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "views")));

app.use(
  "*",
  cors({
    origin: true,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

const PORT = process.env.APPPORT_ || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(PORT, async () => {
  await connetToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
