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

        
    /**
     * question
     * Relationship associate to question
     * @return void
     */
    public function question() {
        return $this->belongsTo(Question::class);
    }
    
    /**
     * surveyed
     * Relationship associate to surveyed
     * @return void
     */
    public function surveyed() {
        return $this->belongsTo(Surveyed::class);
    }

    public static function countByContent($content)
    {
        $count = Answer::where('content', $content)->count();

        return $count;
    }
}
