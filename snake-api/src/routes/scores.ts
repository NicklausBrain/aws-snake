import express from "express";

const router = express.Router();
const scores: any[] = [];

/**
 * @openapi
 * /scores:
 *   get:
 *     description: Get all scores
 *     responses:
 *       200:
 *         description: scores array
 */
router.get("/", (req, res) => {
    res.send(scores);
});

/**
 * @openapi
 * /scores/{score}:
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
router.post("/:score", (req, res) => {
    const { score } = req.params;
    scores.push(score);
    res.send(score);
});

export default router