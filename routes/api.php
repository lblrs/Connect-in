<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

//Regitration
Route::post('/register', [AuthController::class, 'register']);

//Login
Route::post('/login', [AuthController::class, 'login']);

//Logout
Route::post('logout', [AuthController::class, 'logout'])-> middleware('auth:sanctum');

// Create post
Route::post('/posts', [PostController::class, 'createPost'])-> middleware('auth:sanctum');