import express from "express";
import multer from "multer";
import vision from "@google-cloud/vision";
import axios from "axios";

const app = express();
const upload = multer();
const client = new vision.ImageAnnotatorClient({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    projectId: process.env.GOOGLE_PROJECT_ID,
});

app.use(express.json()); // <-- IMPORTANT

app.post("/detect-logo", upload.single("image"), async (req, res) => {
    try {
        let imageBuffer;

        // CASE 1: File upload
        if (req.file) {
            imageBuffer = req.file.buffer;
        }

        // CASE 2: Image URL
        else if (req.body.imageUrl) {
            const response = await axios.get(req.body.imageUrl, {
                responseType: "arraybuffer",
            });
            imageBuffer = Buffer.from(response.data);
        }

        else {
            return res.status(400).json({
                error: "Provide either an image file or imageUrl",
            });
        }

        const [result] = await client.logoDetection({
            image: { content: imageBuffer },
        });

        res.json({
            logos: result.logoAnnotations || [],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Vision API failed" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
