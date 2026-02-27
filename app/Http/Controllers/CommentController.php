<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function createComment(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:280',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $userId = auth()->id();

        $comment = Comment::create([
        $comment = Comment::create([
            'user_id' => $userId,
            'post_id' => $id,
            'post_id' => $id,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Commentaire ajouté', 'comment' => $comment]);
    }


    // Get comments
    public function getAllComments(Post $post)
    {
        $comments = Comment::where('post_id', $post->id)->with('user')->get();
        return response()->json($comments);
    }


    // Edit comment
    public function editComment(Request $request, Post $post, Comment $comment)
    {
        $this->authorize('edit', $comment);
        $request->validate(['content' => 'required|string|max:280']);
        $comment->fill($request->only(['content']));
        $comment->save();
        return response()->json(['message' => 'commentaire modifié', $comment]);
    }


    // Delete comment
    public function deleteComment(Post $post, Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();

        return response()->json(['message' => 'Commentaire supprimé avec succès']);
    }
}
