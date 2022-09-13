<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'content',
        'type',
        'options',
        'created_at',
        'updated_at'
    ];

    public function answers() {
        return $this->hasMany(Answer::class);
    }
        
    /**
     * getAll
     * return a list of questions
     * @return void
     */
    public static function getAll()
    {
        $questions = Question::all();

        return $questions;
    }
}
