<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return response()->json($request->user());
})->middleware('auth:sanctum');



// Regitration
Route::post('/register', [AuthController::class, 'register']);

//Login
Route::post('/login', [AuthController::class, 'login']);

