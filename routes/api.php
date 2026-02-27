<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
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
    // PROFILE

    //Update profile
    Route::put('/user/update', [AuthController::class, 'update']);

    //Delete account
    Route::delete('/user/delete', [AuthController::class, 'destroy']);


    //POSTS

    //Create post
    Route::post('/posts', [PostController::class, 'createPost']);

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
    Route::post('/post/{id}/like', [LikeController::class, 'toggle']);
    Route::post('/post/{id}/like', [LikeController::class, 'toggle']);

    // Add comment
    Route::post('/post/{id}/comment', [CommentController::class, 'createComment']);

    // Get comments
    Route::get('/post/{id}/getComments', [CommentController::class, 'getAllComments']);
    Route::post('/post/{id}/comment', [CommentController::class, 'createComment']);

    // Get comments
    Route::get('/post/{id}/getComments', [CommentController::class, 'getAllComments']);

    //Edit comment
    Route::put('/post/{post_id}/editComment/{comment_id}', [CommentController::class, 'editComment']);
    Route::put('/post/{post_id}/editComment/{comment_id}', [CommentController::class, 'editComment']);

    // Delet comment
    Route::delete('/post/{post_id}/deleteComment/{comment_id}', [CommentController::class, 'deleteComment']);
});
