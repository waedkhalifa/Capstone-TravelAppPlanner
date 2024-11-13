export const getCountryInfo = async (name) => {
    try {
        const res = await fetch("http://localhost:8001/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
            })
        });
        const data = await res.json();
        console.log("data= "+data);
        return data;
    }
    catch (error) {
        console.error("Error", error);
        return { error: error.message };
    }
};
