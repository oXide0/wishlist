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
        $user =  User::create([
            'username' => 'nazar',
            'password' =>  Hash::make('qwest2005')
        ]);

        WishlistItem::create([
            'user_id' => $user->id,
            'title' => 'New Bicycle',
            'description' => 'A mountain bike for weekend riding.'
        ]);

        WishlistItem::create([
            'user_id' => $user->id,
            'title' => 'Book: Clean Code',
            'description' => 'A book about writing cleaner code.'
        ]);
    }
}
