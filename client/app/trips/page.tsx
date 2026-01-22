"use client";

import api from "../lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "../components/Topbar";
import { Card, Text, Flex } from "@radix-ui/themes";

export default function page() {
    const [trips, setTrips] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        api.get("/trips").then((res) => setTrips(res.data));
    });
    return (
        <div style={{ padding: 40 }}>
            <TopBar />

            <Flex direction="column" gap="4" maxWidth="500px">
                {trips.map((trip) => (
                    <Card
                        key={trip._id}
                        style={{ cursor: "pointer" }}
                        onClick={() => router.push(`/booking/${trip._id}`)}
                    >
                        <Text weight="bold">
                            {trip.source} → {trip.destination}
                        </Text>
                        <Text size="2" color="gray">
                            {new Date(trip.date).toLocaleString()}
                        </Text>
                    </Card>
                ))}
            </Flex>
        </div>
    );
}
