# Airline Voucher Seat Assignment - Frontend UI

This is the frontend UI for the Airline Voucher Seat Assignment Application. It is built using **React** and **Vite**, featuring a Material Design aesthetic tailored with an aviation theme.

## Features
- **Aviation & Material Design**: Incorporates standard Material Design patterns (cards, shadows, typography) layered with aviation-themed visuals (clouds, sky-blue backgrounds).
- **Responsive Layout**: Designed to work beautifully on both desktop and mobile devices.
- **Form Validation**: Client-side validation ensuring all required flight data is provided before attempting to generate seats.
- **Interactive UI/UX**: Loading states, error alerts, and a boarding-pass style ticket display for successful generations.
- **Dynamic API Config**: API Base URL can be configured using environment variables (`VITE_API_BASE_URL`).

## Technologies Used
- React 19
- Vite
- Lucide React (for beautiful SVG icons)
- Vanilla CSS (for strict adherence to project styling requirements)

## Setup Instructions
1. Navigate to this `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` if you need to override the default API endpoint (default is `http://localhost:8000/api`).
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:5173`.

*Note: Ensure the Laravel backend is also running simultaneously to allow the frontend to interact with the API.*
