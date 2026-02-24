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

    //Update profile
    Route::put('/user/update', [AuthController::class, 'update']);
    
    //Create post
    Route::post('/posts', [PostController::class, 'createPost']);

    //Delete account
    Route::delete('/user/delete',[AuthController::class, 'destroy']);
    // Create post
    Route::post('/createPost', [PostController::class, 'createPost']);

    //Get all posts
    Route::get('/getAllPosts', [PostController::class, 'getAllPosts']);

    //Get user posts
    Route::get('/getUserPosts', [PostController::class, 'getUserPosts']);

    //Edit post
    Route::put('/editPost/{id}', [PostController::class, 'editPost']);

    //Delete post
    Route::delete('/deletePost/{id}', [PostController::class, 'deletePost']);
});

