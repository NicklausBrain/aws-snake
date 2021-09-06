import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = 8080; // default port to listen

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Snake API",
            version: '1.0.0',
        },
    },
    apis: ['./dist/*.js'], // files containing annotations as above
})));

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});