<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\WishlistItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::create([
            'username' => 'test',
            'password' => Hash::make('password')
        ]);

        WishlistItem::create([
            'user_id' => $user1->id,
            'title' => 'New Bicycle',
            'description' => 'A mountain bike for weekend riding.'
        ]);

        WishlistItem::create([
            'user_id' => $user1->id,
            'title' => 'Book: Clean Code',
            'description' => 'A book about writing cleaner code.'
        ]);

        $user2 = User::create([
            'username' => 'nazar',
            'password' => Hash::make('password')
        ]);

        WishlistItem::create([
            'user_id' => $user2->id,
            'title' => 'New Bicycle',
            'description' => 'A mountain bike for weekend riding.'
        ]);

        WishlistItem::create([
            'user_id' => $user2->id,
            'title' => 'Book: Clean Code',
            'description' => 'A book about writing cleaner code.'
        ]);
    }
}
