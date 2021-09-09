import express from "express";
import swagger from './routes/swagger'
import scores from './routes/scores'

const app = express();
const port = 8080; // default port to listen

app.use('/swagger',  swagger);
app.use('/scores',  scores);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});