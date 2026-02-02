import Constants from "expo-constants"

export async function detectLogo(image) {
    const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL || "https://yogo-app.onrender.com" || 'http://115.22.219.116:5000';

    console.log("API Base URL:", process.env.EXPO_PUBLIC_API_BASE_URL);

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

    // CASE 3: File URI (local file)
    if (image?.uri || image instanceof File) {
        console.log("📤 Sending local file to backend:", image);

        const formData = new FormData();

        // On web, 'image' is a File object
        if (image instanceof File) {
            formData.append("image", image, image.name);
        }
        // On native, 'image' has a uri property
        else {
            formData.append("image", { uri: image.uri, name: "photo.jpg", type: "image/jpeg" });
        }

        const res = await fetch(`${API_BASE_URL}/detect-logo`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);

        console.log("📥 Received logos from backend:", data);
        return data;
    }
}
