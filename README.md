## Ticket Booking System

- A demo ticket booking system inspired by IRCTC / RedBus that implements time-based seat locking to handle concurrent bookings safely.

### Features

- Temporary seat locking with expiry timer

- Multiple seat can select, lock, confirm and cancel

- Single seat can cancel by click on that particular seat

- Only lock owner can confirm booking

- Automatic release of expired locks

- JWT-based authentication

- Real-time seat status updates via polling

- Frontend built with Next.js + Radix UI

- Backend built with Node.js, Express, MongoDB

### Logic

- Seats are locked for a fixed duration during booking

- If not confirmed in time, seats are automatically released

- Other users cannot confirm or override locked seats

- User who confirm seat can cancel it

### Demo

Dashboard
![alt text](./ss/dashboard.png)

Login
![image](./ss/login.png)

Register
![image](./ss/register.png)

Trip
![imag](./ss/trip.png)

Seat
![image](./ss/seat.png)

Seat Selection

Before 30 sec
![image](./ss/seatSelection1.png)

After 30 sec
![image](./ss/seatSelection2.png)
