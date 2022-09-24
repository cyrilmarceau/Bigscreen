<?php

use App\Http\Controllers\Admin\AdminQuestionController;
use App\Http\Controllers\Admin\AdminSurveyedController;
use App\Http\Controllers\Admin\AdminChartController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Client\ClientQuestionController;
use App\Http\Controllers\Client\ClientSurveyedController;
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

/** NON AUTHENTICATED ROUTE */
Route::controller(AuthController::class)->group(function(){
    Route::post('login', 'login');
});

Route::apiResource('client/questions', ClientQuestionController::class);
Route::apiResource('client/surveyeds', ClientSurveyedController::class);


/** AUTHENTICATED ROUTE */
Route::middleware(['auth:sanctum'])->group( function () {

    Route::controller(AuthController::class)->group(function(){
        Route::post('admin/logout', 'logout');
    });

    Route::controller(AdminChartController::class)->group(function(){
        Route::get('admin/charts', 'charts');
    });

    Route::apiResource('admin/questions', AdminQuestionController::class);

    Route::apiResource('admin/surveyeds', AdminSurveyedController::class);

});