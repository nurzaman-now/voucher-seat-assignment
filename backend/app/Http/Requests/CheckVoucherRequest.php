<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckVoucherRequest extends FormRequest
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
            'flight_number' => 'required|string',
            'flight_date' => 'required|date',
        ];
    }

    /**
     * Custom error messages
     */
    public function messages(): array
    {
        return [
            'flight_number.required' => 'Flight number is required.',
            'flight_date.required' => 'Flight date is required.',
            'flight_date.date' => 'Flight date must be a valid date.',
        ];
    }
}
