export const getCountry = async (country) => {

    try {
        const res = await fetch("http://localhost:8001/getLocation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ countryName: country }),
        });
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error("Error", error);
        return { error: error.message };
    }
};
