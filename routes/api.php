<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use Dom\Comment;

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
    // PROFILE

    //Logout
    Route::post('logout', [AuthController::class, 'logout']);

    //Update profile
    Route::put('/user/update', [AuthController::class, 'update']);

    //Delete account
    Route::delete('/user/delete', [AuthController::class, 'destroy']);


    //POSTS

    //Create post
    Route::post('/posts', [PostController::class, 'createPost']);

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


    //LIKE / COMMENTS

    // Like
    Route::post('/post/{post}/like', [LikeController::class, 'toggle']);

    // Add comment
    Route::post('/post/{post}/comment', [CommentController::class, 'createComment']);

    //Edit comment
    Route::put('/post/{post}/editComment/{comment}', [CommentController::class, 'editComment']);

    // Delet comment
    Route::delete('/post/{post}/deleteComment/{comment}', [CommentController::class, 'deleteComment']);

    // Get comments
    Route::get('/post/{post}/getComments', [CommentController::class, 'getAllComments']);
});
