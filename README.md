# Airline Voucher Seat Assignment Application

This is a comprehensive full-stack application built to randomly generate 3 unique flight seats for airline voucher winners based on specific aircraft types.

The project is structured into two main decoupled modules:
- **[Frontend (React + Vite)](./frontend/README.md)**: A modern, Material Design UI with an aviation aesthetic.
- **[Backend (Laravel 11 + SQLite)](./backend/README.md)**: A robust REST API providing business logic and strict validation.

## Core Features
- **Seat Generation Algorithm**: Dynamically assigns unique seats according to aircraft constraints:
  - **ATR**: Rows 1-18, Seats A, C, D, F.
  - **Airbus 320**: Rows 1-32, Seats A, B, C, D, E, F.
  - **Boeing 737 Max**: Rows 1-32, Seats A, B, C, D, E, F.
- **Duplicate Prevention**: A flight number and flight date combination can only be generated once. This is enforced using both frontend API checks and backend composite database constraints.
- **Premium UI/UX**: Features interactive Boarding Pass-styled tickets, error handling, and Material animations.

## Getting Started

To run this application locally, you will need to start both the backend and frontend servers independently.

### 1. Start the Backend API
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
*The API will run on `http://localhost:8000`.*
*For more detailed instructions, view the [Backend README](./backend/README.md).*

### 2. Start the Frontend UI
Open a new terminal window:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
*The UI will run on `http://localhost:5173`.*
*For more detailed instructions, view the [Frontend README](./frontend/README.md).*

### 3. Start with Docker (Recommended)
Alternatively, you can run the entire stack (both frontend and backend) simultaneously using Docker:
```bash
docker-compose up --build
```
*The backend API will run on `http://localhost:8000` and the frontend UI will run on `http://localhost:5173`.*

---

## Testing
The backend is fully equipped with feature tests covering successful generation and duplicate rejection scenarios.
```bash
cd backend
php artisan test
```
