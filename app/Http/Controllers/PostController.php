<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    // Create post
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


    //Get all posts
    public function getAllPosts()
    {   
        $posts = Post::with('user')->get();
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
        $request->validate( ['content' => 'required|string|max:280'] );
        $post->fill($request->only(['content']));
        $post->save();
        return response()->json($post);
    }

    //Delete post
    public function deletePost($id) 
    {
        $post = Post::findOrFail($id);
        $this->authorize('delete', $post);
        $post->delete();
        return response()->json(['message' => 'Post supprimé']);

    }


    // Add comment
    

}
