<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function createComment(Post $post, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:280',
        ]);

        if($validator -> fails()) {
            return response()->json($validator->errors(), 422);
        }

        $userId = auth()->id();

        Comment::create([
            'user_id' => $userId,
            'post_id' => $post->id,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Commentaire ajouté']);
    }

    public function editPost(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $this->authorize('update', $comment);
        $request->validate(['content' => 'required|string|max:280']);
        $comment->fill($request->only(['content']));
        $comment->save();
        return response()->json(['message' => 'commentaire modifié', $comment]);
    }
}
