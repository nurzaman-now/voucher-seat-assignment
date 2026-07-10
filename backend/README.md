# Airline Voucher Seat Assignment - Backend API

This is the backend API for the Airline Voucher Seat Assignment Application. It is built using **Laravel 11** and serves as the core logic engine for generating unique flight seats based on aircraft types and preventing duplicates.

## Features
- **Seat Generator Service**: Contains business logic to dynamically generate 3 unique random seats based on the selected aircraft (ATR, Airbus 320, Boeing 737 Max).
- **Validation**: Strict API validation using Laravel Form Requests.
- **Duplicate Prevention**: Enforces a composite unique key (`flight_number` + `flight_date`) at the database level to ensure a flight voucher is only generated once per day.
- **RESTful API**: Standardized JSON responses utilizing Laravel API Resources.
- **Feature Tests**: PHPUnit tests to verify success and error (duplicate) scenarios.

## API Endpoints

### 1. Check Voucher Existence
`POST /api/check`
Checks if a voucher has already been generated for the given flight.

**Request Body:**
```json
{
  "flight_number": "GA102",
  "flight_date": "2025-07-12"
}
```

**Response:**
```json
{
  "exists": true
}
```

### 2. Generate Voucher
`POST /api/generate`
Generates 3 unique seats and saves the voucher to the database.

**Request Body:**
```json
{
  "crew_name": "John Doe",
  "crew_id": "CRW001",
  "flight_number": "GA102",
  "flight_date": "2025-07-12",
  "aircraft_type": "Airbus 320"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "crew_name": "John Doe",
    "crew_id": "CRW001",
    "flight_number": "GA102",
    "flight_date": "2025-07-12",
    "aircraft_type": "Airbus 320",
    "seats": ["3B", "7C", "14D"],
    "created_at": "2025-07-10 12:00:00"
  },
  "seats": ["3B", "7C", "14D"]
}
```

## Setup Instructions
1. Navigate to this `backend/` directory.
2. Install dependencies: `composer install`
3. Copy `.env.example` to `.env` and configure `DB_CONNECTION=sqlite`.
4. Generate app key: `php artisan key:generate`
5. Run migrations: `php artisan migrate` (creates `database.sqlite`).
6. Serve the application: `php artisan serve`

## Running Tests
```bash
php artisan test
```
