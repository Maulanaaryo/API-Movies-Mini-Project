require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Swagger
// const swaggerUi = require("swagger-ui-express");
// const apiDocumentation = require("./apidocs.json");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./swagger.json");

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(apiDocumentation, {
    explorer: true,
    swaggerOptions: {
      docExpansion: "none",
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
