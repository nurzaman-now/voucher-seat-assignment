<?php

namespace App\Services;

class SeatGeneratorService
{
    /**
     * Generate 3 unique seats based on aircraft type.
     *
     * @param string $aircraftType
     * @return array
     * @throws \Exception
     */
    public function generateUniqueSeats(string $aircraftType): array
    {
        $seats = [];
        while (count($seats) < 3) {
            $seat = $this->generateSeat($aircraftType);
            if (!in_array($seat, $seats)) {
                $seats[] = $seat;
            }
        }

        return $seats;
    }

    /**
     * Generate a single seat based on aircraft type rules.
     *
     * @param string $aircraftType
     * @return string
     * @throws \Exception
     */
    private function generateSeat(string $aircraftType): string
    {
        switch ($aircraftType) {
            case 'ATR':
                // Row 1-18, Seats A, C, D, F (no B and E)
                $row = rand(1, 18);
                $columns = ['A', 'C', 'D', 'F'];
                $col = $columns[array_rand($columns)];
                break;
            case 'Airbus 320':
            case 'Boeing 737 Max':
                // Row 1-32, Seats A, B, C, D, E, F
                $row = rand(1, 32);
                $columns = ['A', 'B', 'C', 'D', 'E', 'F'];
                $col = $columns[array_rand($columns)];
                break;
            default:
                throw new \Exception("Invalid aircraft type.");
        }

        return $row . $col;
    }
}
