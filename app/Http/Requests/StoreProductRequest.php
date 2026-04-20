<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('price')) {
            $this->merge([
                'price' => preg_replace('/[^0-9]/', '', $this->price),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'brand' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'condition' => 'required|string|max:255',
            'is_cod' => 'nullable|boolean',
            'is_negotiable' => 'nullable|boolean',
            'price' => 'required|numeric|min:1000|max:99999999999',
            'description' => 'required|string',
            'specifications' => 'nullable|array',
            'specifications.battery_health' => 'nullable|numeric|min:0|max:100',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}
