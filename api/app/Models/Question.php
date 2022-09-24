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
     * @return object
     */
    public static function getAll()
    {
        $questions = Question::all();
        return $questions;
    }

    /**
     * getAll
     * return question by ID
     * @return object
     */
    public static function getById($id)
    {
        // $question = Question::find($id);
        $question = Question::with(['answers'])->where('id', $id)->first();
        return $question;
    }

    /**
     * getAllWithExcludedColumns
     * return question with excluded column(s)
     * @return object
     */
    public static function getAllWithExcludedColumns(array $columnToExclude)
    {
        $datas = self::getAll();

        $questions = $datas->makeHidden($columnToExclude);
        return $questions;
    }
}
