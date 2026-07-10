<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GenerateVoucherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'crew_name' => 'required|string|max:255',
            'crew_id' => 'required|string|max:255',
            'flight_date' => 'required|date',
            'aircraft_type' => 'required|in:ATR,Airbus 320,Boeing 737 Max',
            'flight_number' => [
                'required',
                'string',
                Rule::unique('vouchers')->where(function ($query) {
                    return $query->where('flight_date', $this->flight_date);
                }),
            ],
        ];
    }

    /**
     * Custom error messages
     */
    public function messages(): array
    {
        return [
            'crew_name.required' => 'Please enter the Crew Name.',
            'crew_id.required' => 'Please enter the Crew ID.',
            'flight_number.required' => 'Please enter the Flight Number.',
            'flight_number.unique' => 'A voucher has already been generated for this flight on the selected date.',
            'flight_date.required' => 'Please select the Flight Date.',
            'aircraft_type.required' => 'Please select the Aircraft Type.',
            'aircraft_type.in' => 'Invalid Aircraft Type selected.',
        ];
    }
}
