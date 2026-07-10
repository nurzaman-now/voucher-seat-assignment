<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Voucher;

class VoucherApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful voucher generation.
     */
    public function test_can_generate_voucher_successfully(): void
    {
        $payload = [
            'crew_name' => 'John Doe',
            'crew_id' => 'CRW001',
            'flight_number' => 'GA102',
            'flight_date' => '2025-07-12',
            'aircraft_type' => 'Airbus 320',
        ];

        $response = $this->postJson('/api/generate', $payload);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         'id',
                         'crew_name',
                         'crew_id',
                         'flight_number',
                         'flight_date',
                         'aircraft_type',
                         'seats',
                     ],
                     'seats',
                 ]);

        $this->assertCount(3, $response->json('seats'));
        $this->assertDatabaseHas('vouchers', [
            'flight_number' => 'GA102',
            'flight_date' => '2025-07-12',
        ]);
    }

    /**
     * Test duplicate voucher generation is rejected.
     */
    public function test_cannot_generate_duplicate_voucher(): void
    {
        $payload = [
            'crew_name' => 'John Doe',
            'crew_id' => 'CRW001',
            'flight_number' => 'GA102',
            'flight_date' => '2025-07-12',
            'aircraft_type' => 'Airbus 320',
        ];

        // Generate first time
        $this->postJson('/api/generate', $payload);

        // Attempt second time
        $response = $this->postJson('/api/generate', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['flight_number']);
    }

    /**
     * Test check API endpoint.
     */
    public function test_check_api_endpoint(): void
    {
        $payload = [
            'crew_name' => 'Jane Doe',
            'crew_id' => 'CRW002',
            'flight_number' => 'GA200',
            'flight_date' => '2025-08-01',
            'aircraft_type' => 'ATR',
        ];

        // Check before creating
        $response1 = $this->postJson('/api/check', ['flight_number' => 'GA200', 'flight_date' => '2025-08-01']);
        $response1->assertStatus(200)->assertJson(['exists' => false]);

        // Create voucher
        $this->postJson('/api/generate', $payload);

        // Check after creating
        $response2 = $this->postJson('/api/check', ['flight_number' => 'GA200', 'flight_date' => '2025-08-01']);
        $response2->assertStatus(200)->assertJson(['exists' => true]);
    }
}
