import { notAvailableImage } from "./app";

export const getImg = async (name) => {

    try {
        const res = await fetch("http://localhost:8001/getImg", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ countryName: name }),
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error", error);
        return notAvailableImage;
    }

};
