<?php

namespace App\Http\Controllers;

use App\Models\Group;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class GroupController extends Controller
{
     public function createGroup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $group = Group::create([
            'name' => $request->name,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Group created!',
            'group' => $group
        ], 201);
    }


    public function getGroups(Request $request)
    {
        $groups = Group::get()
        ->where('user_id', $request->user()->id);

        return response()->json($groups);
    }


    public function getGroup (Group $group)
    {
        return response()->json($group);
    }
}
