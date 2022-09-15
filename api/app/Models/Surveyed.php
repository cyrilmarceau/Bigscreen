<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surveyed extends Model
{
    use HasFactory;

    public function answers() {
        return $this->hasMany(Answer::class);
    }


    /**
     * getAll
     * Get all Surveyed
     * @return object
     */
    public static function getAll(): object
    {
        $surveyeds = Surveyed::all();
        
        return $surveyeds;
    }
    
    /**
     * getAllWithRelation
     * Get all surveyeds and his relationship
     * @param  mixed $relationships
     * @return void
     */
    public static function getAllWithRelation(array $relationships)
    {
        $surveyeds = self::getAll();

        $surveyedsWithRelations = $surveyeds->toQuery()->with($relationships)->get();

        return $surveyedsWithRelations;
    }

    public static function getBySlug($slug) {
        return Surveyed::with(['answers', 'answers.question'])->where('slug', $slug)->first();
    }
}
