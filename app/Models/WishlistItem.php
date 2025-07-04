<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishlistItem extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'description', 'reserved_by'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
