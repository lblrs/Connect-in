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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
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



    //Login

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required | string | email',
            'password' => 'required | string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //find the users form the email 
        $user = User::where('email', $request->email)->first();

        //Checking the existence of the user and the correctness of the password

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The information entred is incorrct'
            ], 401);
        }
        //Creating a security token

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Welcome',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
        //Logout
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'Logged out successfully'
            ]);
            return response()->json([
                'message' => 'No active session found'
            ], 401);
        }
    }
        // Update profile
    public function update(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->fill($request->only(['first_name', 'last_name', 'email']));

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
}
