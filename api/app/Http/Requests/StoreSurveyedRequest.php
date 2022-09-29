<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreSurveyedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => 'required|email',
        ];
    }

        
    /**
     * messages
     * Return custom messages if validation failed
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'email.required' => 'L\'email est obligatoire',
            'email.email' => 'Vous devez correctement formater votre email'
        ];
    }

        
    /**
     * failedValidation
     * Return json response if validator failed
     * @param  mixed $validator
     * @return void
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Erreur de validation du formulaire',
            'data'      => $validator->errors()
        ], 400));
    }
}
