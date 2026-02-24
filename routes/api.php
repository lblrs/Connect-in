<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

//Regitration
Route::post('/register', [AuthController::class, 'register']);

//Login
Route::post('/login', [AuthController::class, 'login']);

//Logout
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


//Protected routes (requires token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    //Logout
    Route::post('logout', [AuthController::class, 'logout']);

    //Update
    Route::put('/user/update', [AuthController::class, 'update']);
    
    //Create post
    Route::post('/posts', [PostController::class, 'createPost']);

    //Delete account
    Route::delete('/user/delete',[AuthController::class, 'destroy']);
});

