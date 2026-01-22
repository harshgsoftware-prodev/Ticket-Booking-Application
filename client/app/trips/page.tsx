"use client";

import api from "../lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "../components/Topbar";
import { Card, Text, Flex, Heading, Badge, Separator } from "@radix-ui/themes";

export default function page() {
    const [trips, setTrips] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        api.get("/trips").then((res) => setTrips(res.data));
    });
    return (
        <Flex direction="column" style={{ minHeight: "100vh" }}>
            <TopBar />
            <Flex
                direction="column"
                gap="6"
                px="6"
                py="5"
                maxWidth="800px"
                mx="auto"
            >
                <Heading size="7">Available Trips</Heading>

                {trips.length === 0 && (
                    <Text color="gray">No trips available at the moment.</Text>
                )}

                <Flex direction="column" gap="4" width="100%">
                    {trips.map((trip) => (
                        <Card
                            key={trip._id}
                            size="4"
                            style={{
                                width: "100%",
                                cursor: "pointer",
                                transition:
                                    "transform 0.15s ease, box-shadow 0.15s ease",
                            }}
                            onClick={() => router.push(`/booking/${trip._id}`)}
                        >
                            <Flex direction="column" gap="4" width="100%">
                                <Flex
                                    align="center"
                                    justify="between"
                                    width="100%"
                                >
                                    <Text
                                        weight="bold"
                                        size="4"
                                        style={{
                                            maxWidth: "70%",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {trip.source} → {trip.destination}
                                    </Text>

                                    <Badge color="blue">
                                        {trip.vehicleType ?? "Bus"}
                                    </Badge>
                                </Flex>

                                <Separator size="4" />

                                <Flex
                                    justify="between"
                                    align="center"
                                    width="100%"
                                >
                                    <Text size="2" color="gray">
                                        Departure
                                    </Text>
                                    <Text size="2">
                                        {new Date(
                                            trip.date,
                                        ).toLocaleDateString()}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}
