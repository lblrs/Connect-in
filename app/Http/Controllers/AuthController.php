<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //Handle new user registration requests (OOP)
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required | string | max:255',
            'last_name' => 'required | string | max:255',
            'email' => 'required | string | email | max:255 | unique:users',
            'password' => 'required | string | min:8',
        ]);

        //Validation for transfer the data in database
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //data for send in database
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        //Confirmation the data 
        return response()->json([
            'message' => 'Successfully registered!',
            'user' => $user
        ], 201);
    }
}
