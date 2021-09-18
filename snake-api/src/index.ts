import express from "express";
import swagger from './routes/swagger'
import scores from './routes/scores'

const app = express();

app.use('/swagger',  swagger);
app.use('/api/scores',  scores);

// start the Express server
const port = 8080; // default port to listen
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;