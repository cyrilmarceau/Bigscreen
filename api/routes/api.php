<?php

use App\Http\Controllers\Admin\AdminQuestionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Client\ClientQuestionController;
use App\Http\Controllers\SurveyedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/** AUTH */
Route::controller(AuthController::class)->group(function(){
    Route::post('login', 'login');
});


Route::middleware(['auth:sanctum'])->group( function () {

    Route::controller(AuthController::class)->group(function(){
        Route::post('logout', 'logout');
    });
});



Route::apiResource('admin/questions', AdminQuestionController::class);
Route::apiResource('client/questions', ClientQuestionController::class);
Route::apiResource('surveyeds', SurveyedController::class);