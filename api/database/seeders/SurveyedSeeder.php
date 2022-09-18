<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Question;
use App\Models\Surveyed;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SurveyedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = Question::all();

        Surveyed::factory(5)->create()->each(function($surveyed)  use ($questions)  {

            foreach($questions as $key => $question) {

                $relationship = [
                    'question_id' => $question->id,
                    'surveyed_id' => $surveyed->id
                ];

                switch ($question->type) {
                    case 'A':
                        $opts = json_decode($question->options);
                        $randomOption = $opts[array_rand($opts)];

                        Answer::create([
                            ...$relationship,
                            'content' => $randomOption->key
                        ]);
                        break;

                    case 'B':
                        Answer::create([
                            ...$relationship,
                            'content' => $key === 0 ? fake()->freeEmail() : fake()->sentence(3)
                        ]);
                        break;

                    case 'C':
                        Answer::create([
                            ...$relationship,
                            'content' => fake()->numberBetween(1, 5)
                        ]);
                        break;
                    
                    default:
                        # code...
                        break;
                }
            }
        });

    }
}
