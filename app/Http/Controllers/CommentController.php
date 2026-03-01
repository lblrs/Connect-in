<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use SebastianBergmann\CodeCoverage\Report\PHP;

class CommentController extends Controller
{
    public function createComment($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:280',
        ]);

        if($validator -> fails()) {
            return response()->json($validator->errors(), 422);
        }

        $userId = auth()->id();

        $comment = Comment::create([
            'user_id' => $userId,
            'post_id' => $id,
            'content' => $request->content,
        ]);

        return response()->json([
        'message' => 'Commentaire ajouté', 
        'comment' => $comment->load('user')
        ]);
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

        public function deleteComment($post_id, $comment_id) 
        {
    
        $comment = Comment::find($comment_id);
        if (!$comment) {
            return response()->json(['message' => 'Commentaire non trouvé'], 404);
        }
        if ($comment->user_id !== auth()->id()) {
            return response()->json([
                'message' => ''
            ], 403);
        }
        $comment->delete();

        return response()->json(['message' => 'Commentaire supprimé avec succès']);
    }
}
