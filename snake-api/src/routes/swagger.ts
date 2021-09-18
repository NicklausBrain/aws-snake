import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Snake API",
            version: '1.0.0',
        },
    },
    apis: ['./routes/**/*.js'], // files containing annotations as above
})));

export default router;