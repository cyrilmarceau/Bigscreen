<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surveyed extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'slug',
        'email',
        'created_at',
        'updated_at'
    ];

    
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

        if($surveyeds->isEmpty()) {
            return null;
        }

        $surveyedsWithRelations = $surveyeds->toQuery()->with($relationships)->get();

        return $surveyedsWithRelations;
    }

        
    /**
     * getBySlug
     * Get surveyed and his relation from slug
     * @param  mixed $slug <uuid>
     * @return void
     */
    public static function getBySlug($slug)
    {
        return Surveyed::with(['answers', 'answers.question'])->where('slug', $slug)->first();
    }

        
    /**
     * getByMail
     * Get surveyed by email
     * @param  mixed $email
     * @return void
     */
    public static function getByMail($email)
    {
        return Surveyed::where('email', $email)->first();
    }
}
