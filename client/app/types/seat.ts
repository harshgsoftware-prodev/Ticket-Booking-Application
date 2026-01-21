export type SeatStatus = "AVAILABLE" | "LOCKED" | "CONFIRMED";

export interface Seat {
    _id: string;
    seatId: string;
    status: SeatStatus;
    lockedBy: string | null;
    lockedExpiresAt: string | null;
}
