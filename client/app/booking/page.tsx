"use client";

import api from "../lib/api";
import SeatGrid from "../components/SeatGrid";
import { useEffect, useState } from "react";

export default function page() {
    const [seats, setSeats] = useState([]);

    const tripId = "65a123456789000000000001"; // demo
    const fetchSeats = async () => {
        const res = await api.get(`/seats?tripId=${tripId}`);
        setSeats(res.data);
    };
    useEffect(() => {
        fetchSeats();
        const interval = setInterval(fetchSeats, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <h2>Seat Selection</h2>
            <SeatGrid seats={seats} refresh={fetchSeats} />
        </div>
    );
}
