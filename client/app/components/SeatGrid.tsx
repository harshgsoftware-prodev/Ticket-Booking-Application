import Seat from "./Seat";

export default function SeatGrid({ seats, refresh }: any) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 60px)",
                gap: 12,
            }}
        >
            {seats.map((seat: any) => (
                <Seat key={seat._id} seat={seat} refresh={refresh} />
            ))}
        </div>
    );
}
