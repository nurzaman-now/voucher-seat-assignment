<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckVoucherRequest;
use App\Http\Requests\GenerateVoucherRequest;
use App\Http\Resources\VoucherResource;
use App\Models\Voucher;
use App\Services\SeatGeneratorService;
use Illuminate\Http\JsonResponse;

class VoucherController extends Controller
{
    protected $seatGeneratorService;

    public function __construct(SeatGeneratorService $seatGeneratorService)
    {
        $this->seatGeneratorService = $seatGeneratorService;
    }

    /**
     * Check if a voucher already exists for the given flight number and date.
     */
    public function check(CheckVoucherRequest $request): JsonResponse
    {
        $exists = Voucher::where('flight_number', $request->flight_number)
            ->where('flight_date', $request->flight_date)
            ->exists();

        return response()->json([
            'exists' => $exists,
        ]);
    }

    /**
     * Generate a new voucher with 3 unique seats.
     */
    public function generate(GenerateVoucherRequest $request): JsonResponse
    {
        try {
            $seats = $this->seatGeneratorService->generateUniqueSeats($request->aircraft_type);

            $voucher = Voucher::create([
                'crew_name' => $request->crew_name,
                'crew_id' => $request->crew_id,
                'flight_number' => $request->flight_number,
                'flight_date' => $request->flight_date,
                'aircraft_type' => $request->aircraft_type,
                'seat1' => $seats[0],
                'seat2' => $seats[1],
                'seat3' => $seats[2],
            ]);

            return response()->json([
                'success' => true,
                'data' => new VoucherResource($voucher),
                'seats' => $seats,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate seats. ' . $e->getMessage(),
            ], 500);
        }
    }
}
