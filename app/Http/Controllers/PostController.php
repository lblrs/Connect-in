<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function createPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:280',
        ]);

        if ($validator -> fails()) {
            return response()->json($validator->errors(), 422);
        }

        $post = Post::create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
        ]);

        return response()->json([
            "message" => "Post created",
            "post" => $post
        ]);
    }
}
