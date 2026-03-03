<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
class LikeController extends Controller
{
    public function toggle(Post $post)
    {
        $userId = auth()->id();

        $likeExiste = Like::where('post_id', $post->id)
            ->where('user_id', $userId)
            ->first();

        if ($likeExiste) {
            $likeExiste->delete();
            return response()->json(['message' => 'Like supprimé']);
        }

        Like::create([
            'post_id' => $post->id,
            'user_id' => $userId
        ]);

        return response()->json(['message' => 'Like ajouté']);
    }
}
