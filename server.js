const express = require("express");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/users-api-routes.js")(app);
require("./routes/expenses-api-routes.js")(app);
require("./routes/accounts-api-routes.js")(app);
require("./routes/html-routes.js")(app);

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});