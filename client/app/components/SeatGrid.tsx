import { useState, useMemo, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import api from "../lib/api";
import Timer from "./Timer";
import Seat from "./Seat";
import { getCurrentUserId } from "../lib/auth";

export default function SeatGrid({ seats, refresh }: any) {
    const currentUserId = getCurrentUserId();
    const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

    useEffect(() => {
        return () => {
            api.post("/seats/cancel-my-locked").catch(() => {});
        };
    }, []);

    useEffect(() => {
        const handleUnload = () => {
            navigator.sendBeacon("/seats/cancel-my-locked");
        };

        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, []);

    const myLockedSeats = useMemo(
        () =>
            seats.filter(
                (s: any) =>
                    s.status === "LOCKED" && s.lockedBy === currentUserId,
            ),
        [seats, currentUserId],
    );

    const myConfirmedSeats = useMemo(
        () =>
            seats.filter(
                (s: any) =>
                    s.status === "CONFIRMED" && s.confirmedBy === currentUserId,
            ),
        [seats, currentUserId],
    );

    const expiresAt = myLockedSeats[0]?.lockedExpiresAt;

    const onSeatSelect = (seat: any) => {
        setSelectedSeats((prev) => {
            if (prev.find((s) => s._id === seat._id)) return prev;
            return [...prev, seat];
        });
    };

    const confirmSeats = async () => {
        await api.post("/seats/confirm-multiple", {
            seatIds: myLockedSeats.map((s: any) => s._id),
        });
        setSelectedSeats([]);
        refresh();
    };

    const cancelSeats = async () => {
        await api.post("/seats/cancel-multiple", {
            seatIds: myConfirmedSeats.map((s: any) => s._id),
        });
        setSelectedSeats([]);
        refresh();
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "70vh",
                    width: "100%",
                    gap: 16,
                }}
            >
                {/* SEAT GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: 12,
                        maxWidth: 420,
                        width: "100%",
                    }}
                >
                    {seats.map((seat: any) => (
                        <Seat
                            key={seat._id}
                            seat={seat}
                            refresh={refresh}
                            onSelect={onSeatSelect}
                        />
                    ))}
                </div>

                {/* TIMER */}
                {myLockedSeats.length > 0 && expiresAt && (
                    <Timer
                        expiresAt={expiresAt}
                        onExpire={() => {
                            refresh();
                        }}
                    />
                )}

                {/* CONFIRM / CANCEL */}
                <div style={{ display: "flex", gap: 12 }}>
                    {myLockedSeats.length > 0 && (
                        <Button color="green" onClick={confirmSeats}>
                            Confirm {myLockedSeats.length} Seats
                        </Button>
                    )}
                    {myConfirmedSeats.length > 0 && (
                        <Button
                            color="red"
                            variant="soft"
                            onClick={cancelSeats}
                        >
                            Cancel {myConfirmedSeats.length} Seats
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
