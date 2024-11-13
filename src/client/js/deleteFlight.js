import { getFlights } from "./getFlights";

export const deleteFlight = async (id) => {
    await fetch(`http://localhost:8001/flights/${id}`, {
        method: 'DELETE',
    });
    getFlights();

};
