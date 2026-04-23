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
        $categoryId = (int) $this->category_id;
        $subType = $this->input('specifications.sub_type');
        $connectivity = $this->input('specifications.connectivity');
        $allowedFields = \App\Constants\ProductSchema::getAllowedFields($categoryId, $subType, $connectivity);

        $rules = [
            'category_id' => 'required|exists:categories,id',
            'brand' => 'required|string|max:255',
            'custom_brand' => 'required_if:brand,Other|nullable|string|max:255',
            'type' => 'required|string|max:255',
            'condition' => ['required', \Illuminate\Validation\Rule::enum(\App\Enums\ProductConditionEnum::class)],
            'is_cod' => 'nullable|boolean',
            'is_negotiable' => 'nullable|boolean',
            'price' => 'required|numeric|min:1000|max:99999999999',
            'description' => 'required|string',
            'specifications' => 'nullable|array',
            'specifications.sub_type' => 'nullable|string',
            'specifications.kelengkapan' => 'required|array',
            'specifications.kelengkapan_note' => 'nullable|string',
            'images' => 'required|array|min:1|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ];

        // Dynamic Specification Rules
        if (in_array('ram', $allowedFields)) {
            $rules['specifications.ram'] = 'required|string';
            $rules['specifications.custom_ram'] = 'required_if:specifications.ram,Other|nullable|string';
        }
        if (in_array('storage', $allowedFields)) {
            $rules['specifications.storage'] = 'required|string';
            $rules['specifications.custom_storage'] = 'required_if:specifications.storage,Other|nullable|string';
        }
        if (in_array('battery_health', $allowedFields)) {
            // Mandatory for Smartphone (ID 1)
            $rules['specifications.battery_health'] = ($categoryId === 1) ? 'required|numeric|min:0|max:100' : 'nullable|numeric|min:0|max:100';
        }
        if (in_array('screen_size', $allowedFields)) {
            $rules['specifications.screen_size'] = 'nullable|string';
        }
        if (in_array('shutter_count', $allowedFields)) {
            $rules['specifications.shutter_count'] = 'nullable|numeric|min:0';
        }
        if (in_array('connectivity', $allowedFields)) {
            $rules['specifications.connectivity'] = 'nullable|string';
        }
        if (in_array('power_source', $allowedFields)) {
            $rules['specifications.power_source'] = 'required|string';
        }
        if (in_array('switch_type', $allowedFields)) {
            $rules['specifications.switch_type'] = 'required|string';
        }
        if (in_array('cfw_status', $allowedFields)) {
            $rules['specifications.cfw_status'] = 'required|string';
        }
        if (in_array('is_battery_balanced', $allowedFields)) {
            $rules['specifications.is_battery_balanced'] = 'nullable|boolean';
        }
        if (in_array('is_drift_free', $allowedFields)) {
            $rules['specifications.is_drift_free'] = 'nullable|boolean';
        }
        if (in_array('has_original_lens', $allowedFields)) {
            $rules['specifications.has_original_lens'] = 'nullable|boolean';
        }

        return $rules;
    }

    /**
     * Handle 'Other' options and clean up data after validation.
     * This ensures the database gets the real value instead of 'Other'.
     */
    protected function passedValidation(): void
    {
        // 1. Resolve Brand
        if ($this->brand === 'Other' && $this->filled('custom_brand')) {
            $this->merge(['brand' => $this->custom_brand]);
        }

        // 2. Resolve Dynamic Specs and Clean JSON
        $specs = $this->specifications;
        if (is_array($specs)) {
            $categoryId = (int) $this->category_id;
            $allowedKeys = \App\Constants\ProductSchema::getAllowedFields(
                $categoryId, 
                $specs['sub_type'] ?? null, 
                $specs['connectivity'] ?? null
            );
            
            // Core spec keys that are always allowed if present
            $coreKeys = ['sub_type', 'kelengkapan', 'kelengkapan_note'];
            $finalAllowedKeys = array_merge($allowedKeys, $coreKeys);

            $cleanSpecs = [];
            foreach ($specs as $key => $value) {
                // Resolve 'Other' values for specific fields
                if (in_array($key, ['ram', 'storage']) && $value === 'Other') {
                    $customKey = "custom_{$key}";
                    $value = $specs[$customKey] ?? $value;
                }

                // Only keep allowed keys
                if (in_array($key, $finalAllowedKeys)) {
                    $cleanSpecs[$key] = $value;
                }
            }
            
            $this->merge(['specifications' => $cleanSpecs]);
        }
    }
}
