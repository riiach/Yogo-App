import express from "express";
import multer from "multer";
import vision from "@google-cloud/vision";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "https://darkslateblue-meerkat-555658.hostingersite.com",
    methods: ["GET","POST","OPTIONS"],
}));

const upload = multer();

let client;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    // PRODUCTION: Use JSON credentials from environment variable
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    client = new vision.ImageAnnotatorClient({ credentials });
    console.log('✅ Vision API initialized with JSON credentials (production)');
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // LOCAL: Use file path
    client = new vision.ImageAnnotatorClient({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
    console.log('✅ Vision API initialized with file path (local)');
} else {
    // FALLBACK: Default credentials
    client = new vision.ImageAnnotatorClient();
    console.log('✅ Vision API initialized with default credentials');
}

app.use(express.json()); // <-- IMPORTANT

app.post("/detect-logo", upload.single("image"), async (req, res) => {
    try {
        let imageBuffer;

        // CASE 1: File upload
        if (req.file) {
            imageBuffer = req.file.buffer;
        }

        // CASE 2: Base64 string
        else if (req.body.imageBase64) {
            // Remove data URL prefix if present (data:image/png;base64,)
            const base64Data = req.body.imageBase64.replace(/^data:image\/\w+;base64,/, '');
            imageBuffer = Buffer.from(base64Data, 'base64');
            console.log("✅ Received base64 image");
        }

        // CASE 3: Image URL
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
