import express from "express";
import {saveScore, getScores} from "../services/ddbClient";

const router = express.Router();
const scores: any[] = [];

/**
 * @openapi
 * /api/scores:
 *   get:
 *     description: Get all scores
 *     responses:
 *       200:
 *         description: scores array
 */
router.get("/", async (req, res) => {
    try {
        const result = await getScores();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

/**
 * @openapi
 * /api/scores/{score}:
 *   post:
 *     description: Create a new score record
 *     parameters:
 *       - name: score
 *         description: achieved score.
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: added score item
 */
router.post("/:score", async (req, res) => {
    const { score } = req.params;
    const { remoteAddress: ipAddress } = req.socket;

    try {
        const result = await saveScore(ipAddress, parseInt(score, 10));
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

export default router