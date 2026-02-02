import Constants from "expo-constants"

export async function detectLogo(image) {
    const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL || "https://yogo-app.onrender.com";

    console.log("API Base URL:", Constants.expoConfig.extra.API_BASE_URL);

    if (!image) throw new Error("Image is required");

    // CASE 1: Remote URL
    if (typeof image === "string" && image.startsWith("http")) {
        const res = await fetch(`${API_BASE_URL}/detect-logo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: image }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
        return data;
    }

    // CASE 2: Base64 string
    if (typeof image === "string" && image.startsWith("data:image")) {
        console.log("📤 Sending base64 request to:", `${API_BASE_URL}/detect-logo`);
        console.log("📏 Base64 length:", image.length);

        const res = await fetch(`${API_BASE_URL}/detect-logo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageBase64: image }),
        });

        console.log("📥 Response status:", res.status);
        const data = await res.json();
        console.log("📦 Response data:", data);

        if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
        return data;
    }

    // CASE 3: Local file (web - has image.file)
    if (image?.file instanceof File) {
        console.log("📤 Sending local file:", image.fileName);

        const formData = new FormData();
        formData.append("image", image.file, image.fileName || image.file.name);

        try {
            const res = await fetch(`${API_BASE_URL}/detect-logo`, {
                method: "POST",
                body: formData,
            });

            console.log("📥 Response status:", res.status);
            const data = await res.json();
            console.log("📦 Response data:", data);

            if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);

            console.log("✅ Received logos:", data.logos?.length || 0);
            return data;
        } catch (error) {
            console.error("❌ Upload error:", error);
            throw error;
        }
    }
}
