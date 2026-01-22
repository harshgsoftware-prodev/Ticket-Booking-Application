"use client";

import api from "../../lib/api";
import SeatGrid from "../../components/SeatGrid";
import { useEffect, useState } from "react";
import TopBar from "../../components/Topbar";
import { getToken } from "../../lib/auth";
import { useParams, useRouter } from "next/navigation";

export default function page() {
    const [seats, setSeats] = useState([]);

    const router = useRouter();
    const params = useParams();

    const tripId = params.tripId as string;

    const fetchSeats = async () => {
        if (!tripId) return;
        const res = await api.get(`/seats/${tripId}`);
        setSeats(res.data);
    };

    useEffect(() => {
        fetchSeats();
        const interval = setInterval(fetchSeats, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!getToken()) {
            router.replace("/login");
        }
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <TopBar />
            <SeatGrid seats={seats} refresh={fetchSeats} />
        </div>
    );
}
