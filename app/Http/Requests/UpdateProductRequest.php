<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
        $product = $this->route('product');
        $categoryId = (int) ($this->category_id ?? $product->category_id);
        $subType = $this->input('specifications.sub_type');
        $connectivity = $this->input('specifications.connectivity');
        $allowedFields = \App\Constants\ProductSchema::getAllowedFields($categoryId, $subType, $connectivity);

        $rules = [
            'brand' => 'required|string|max:255',
            'custom_brand' => 'required_if:brand,Other|nullable|string|max:255',
            'type' => 'required|string|max:255',
            'condition' => ['required', \Illuminate\Validation\Rule::enum(\App\Enums\ProductConditionEnum::class)],
            'is_cod' => 'nullable|boolean',
            'is_negotiable' => 'nullable|boolean',
            'price' => 'required|numeric|min:1000|max:99999999999',
            'description' => 'required|string',
            'availability' => 'required|in:available,sold',
            'specifications' => 'nullable|array',
            'specifications.sub_type' => 'nullable|string',
            'specifications.kelengkapan' => 'required|array',
            'specifications.kelengkapan_note' => 'nullable|string',
            'images' => 'nullable|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
            'delete_images' => 'nullable|array',
            'delete_images.*' => 'exists:product_images,id',
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
            $rules['specifications.battery_health'] = 'nullable|numeric|min:0|max:100';
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
}
