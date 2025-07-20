<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\RegisterRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(RegisterRequest $request): RedirectResponse
    {
        User::create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password')),
        ]);

        return redirect()->route("login");
    }

    public function login(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->route('main');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
