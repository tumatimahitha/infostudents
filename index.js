const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const Detail = require("./models/details.js"); //imp
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/studentdetails");
}

// Routes
app.get("/details", async (req, res) => {
  let details = await Detail.find();
  res.render("index.ejs", { details });
});

//edit route
app.get("/edit/:id", async (req, res) => {
  let { id } = req.params;
  let details = await Detail.findById(id);
  res.render("edit.ejs", { details });
});

//update route
app.put("/update/:id", async (req, res) => {
  let { id } = req.params;
  let { stid: newid, name: newname, email: newemail } = req.body;
  await Detail.findByIdAndUpdate(id, {
    stid: newid,
    name: newname,
    email: newemail,
  });
  res.redirect("/details");
});

//Create route
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", async (req, res) => {
  let { stid, name, email } = req.body;
  let newDetails = new Detail({
    stid: stid,
    name: name,
    email: email,
  });
  await newDetails.save();
  res.redirect("/details");
});

//delete route
app.post("/delete/:id", async (req, res) => {
  let { id } = req.params;
  await Detail.findByIdAndDelete(id);
  res.redirect("/details");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
