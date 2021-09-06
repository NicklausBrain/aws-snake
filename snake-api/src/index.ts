import express from "express";
import swagger from './routes/swagger'

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

app.use('/swagger',  swagger);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});