"use client";

import { useState, useEffect } from "react";
import { Box, Grid, Card, Text, Button, Flex, Badge } from "@radix-ui/themes";

import { Seat as SeatType } from "../types/seat";
import Seat from "./Seat";
import Timer from "./Timer";
import { confirmSeat, fetchSeats, lockSeat } from "../lib/api";

const USER_ID = "demo-user";

export default function SeatGrid() {
    const [seats, setSeats] = useState<SeatType[]>([]);
    const [lockedSeat, setLockedSeat] = useState<SeatType | null>(null);

    async function loadSeats() {
        const data = await fetchSeats();
        setSeats(data);
    }

    useEffect(() => {
        loadSeats();
        const interval = setInterval(loadSeats, 3000);
        return () => clearInterval(interval);
    }, []);

    async function handleLock(seatId: string) {
        try {
            const seat = await lockSeat(seatId, USER_ID);
            setLockedSeat(seat);
            loadSeats();
        } catch {
            alert("Seat not available");
        }
    }

    async function handleConfirm() {
        if (!lockedSeat) return;
        await confirmSeat(lockedSeat.seatId, USER_ID);
        setLockedSeat(null);
        loadSeats();
    }

    return (
        <Flex direction="column" gap="4">
            {/* Legend */}
            <Flex gap="3">
                <Badge color="green">Available</Badge>
                <Badge color="yellow">Locked</Badge>
                <Badge color="gray">Confirmed</Badge>
            </Flex>

            {/* Seat Grid */}
            <Card>
                <Grid columns="5" gap="3">
                    {seats.map((seat) => (
                        <Seat
                            key={seat.seatId}
                            seat={seat}
                            onClick={() => handleLock(seat.seatId)}
                        />
                    ))}
                </Grid>
            </Card>

            {/* Confirmation Panel */}
            {lockedSeat && (
                <Card>
                    <Flex direction="column" gap="3">
                        <Text weight="bold">
                            Seat {lockedSeat.seatId} locked for you
                        </Text>

                        {lockedSeat.lockedExpiresAt && (
                            <Timer expiresAt={lockedSeat.lockedExpiresAt} />
                        )}

                        <Flex gap="3">
                            <Button color="green" onClick={handleConfirm}>
                                Confirm Booking
                            </Button>

                            <Button
                                color="gray"
                                variant="soft"
                                onClick={() => setLockedSeat(null)}
                            >
                                Cancel
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            )}
        </Flex>
    );
}
