<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupPost extends Model
{
    protected $fillable = [
        'user_id',
        'group_id',
        'content',
        'image'
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
