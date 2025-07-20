<?php

namespace App\Http\Controllers;

use App\Http\Requests\Group\StoreRequest;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        return Inertia::render('groups', [
            'groups' => $user->groups,
            'role' => $user->hasRole('admin') ? 'admin' : 'user',
        ]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $group = Group::create(['name' => $request->input('name'), 'admin_id' => $request->user()->id]);

        $users = $request->input('users', []);
        foreach ($users as $userData) {
            $user = User::create([
                'username' => $userData['username'],
                'password' => Hash::make($userData['password']),
            ]);

            $group->users()->attach($user->id);
        }

        return back()->with('success', 'Group created successfully.');
    }

    public function update(Group $group, Request $request): void
    {
        $group->update([
            'name' => $request->input('name'),
        ]);
    }

    public function delete(int $id): void
    {
        $group = Group::findOrFail($id);
        $group->delete();
    }
}
