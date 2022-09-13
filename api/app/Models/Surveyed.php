<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surveyed extends Model
{
    use HasFactory;

    public function answers() {
        return $this->hasMany(Answer::class);
    }

    public static function getAll() {

        return Surveyed::with(['answers'])->get();
    }

    public static function get($slug) {

        return Surveyed::with(['answers'])->where('slug', $slug)->first();
    }
}
