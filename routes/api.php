<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


use App\Http\Controllers\AuthController;

// Regitration
Route::post('/register', [AuthController::class, 'register']);

//Login
Route::post('/login', [AuthController::class, 'login']);

