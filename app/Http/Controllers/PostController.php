<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    // Create post
    public function createPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:280',
            'image' => 'nullable|max:2048'
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
            'image' => $imagePath
        ]);


        return response()->json([
            "message" => "Post created",
            "post" => $post
        ]);
    }


    //Get all posts
    public function getAllPosts()
    {
        $posts = Post::with(['user', 'comments.user'])->latest()->get();
        return response()->json($posts);
    }


    //Get user post
    public function getUserPosts(Request $request)
    {
        $posts = Post::with('user')->where('user_id', $request->user()->id)->get();
        return response()->json($posts);
    }


    // Edit post
    public function editPost(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $this->authorize('update', $post);
        $request->validate(['content' => 'required|max:280']);
        $request->validate(['image' => 'nullable|max:2048']);
        $post->fill($request->only(['content', 'image']));
        $post->save();
        return response()->json($post);
    }

    //Delete post
public function deletePost($id)
{
    $post = Post::findOrFail($id);

    if ($post->user_id !== auth()->id()) {
        return response()->json([
            'message' => ''
        ], 403);
    }
    $post->comments()->delete();
    $post->delete();

    return response()->json([
        'message' => 'Post et ses commentaires supprimés avec succès'
    ]);
}
}
