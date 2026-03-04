<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GroupPostController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:255',
            'image' => 'nullable|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('group_posts', 'public');
        }

        $groupPost = GroupPost::create([
            'user_id' => $request->user()->id,
            'group_id' => $request->group_id,
            'content' => $request->content,
            'image' => $imagePath
        ]);

        return response()->json([
            'message' => 'Post created',
            'post' => $groupPost
        ]);
    }
}
