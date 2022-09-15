<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'question_id',
        'surveyed_id',
        'content',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'question_id',
        'surveyed_id'
    ];

    public function question() {
        return $this->belongsTo(Question::class);
    }

    public function surveyed() {
        return $this->belongsTo(Surveyed::class);
    }
}
