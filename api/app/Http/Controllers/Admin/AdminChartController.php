<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

use function PHPSTORM_META\type;

class AdminChartController extends Controller
{
    public function charts()
    {

        $questionSix = self::getQuestionSix();
        $questionSeven = self::getQuestionSeven();
        $questionTen = self::getQuestionTen();
        $questionElevenToFifteen = self::getQuestionElevenToFifteen();

        $result = [$questionSix, $questionSeven, $questionTen, $questionElevenToFifteen];

        return $this->sendResponse($result, null);
    }
    
    /**
     * removeDupplicateValue
     * Remove dupplicate value from collection
     * @param  mixed $answers
     * @return array
     */
    private static function removeDupplicateValue(Collection $answers): array
    {
        $contents = [];

        foreach ($answers as $value) {
            $contents[] = $value->content;
        }
        
        $uniqueContent = array_unique($contents);

        return $uniqueContent;
    }

    /**
     * getAnswerStats
     * return an array of count value
     * @param  mixed $answers
     * @return array
     */
    private static function getAnswerStats(array $answers, Question $question): array
    {
        // dd($question->options);
        $options = json_decode($question->options);

        $values = [];
        foreach ($answers as $answer) {
            $contentCount = Answer::countByContent($answer);
            
            if($question->type === 'A'){

                foreach ($options as $option) {
                    if($option->key === $answer){
                        $values[$option->value] = $contentCount;  
                    }
                }

            } else {
                $values[$answer] = $contentCount;  
            }
        }

        return $values;
    }
    
    /**
     * getQuestionSix
     * Get all answers from question six
     * @return void
     */
    private static function getQuestionSix()
    {
        $question = Question::getByID(6);
        $answers = $question->answers()->get();
        
        $uniqueAnswer = self::removeDupplicateValue($answers);

        $stats = self::getAnswerStats($uniqueAnswer, $question);

        // dd($question->options);
        // dd(array_search('occulus_rift/s', json_decode($question->options)));
        $response = [
            "content" => $question->content,
            "stats" => $stats,
            "type" => "pie"
        ];

        return $response;
       
    }
    
    /**
     * questionSeven
     * get all answers from question seven
     * @return void
     */
    private static function getQuestionSeven()
    {
        $question = Question::getByID(7);
        $answers = $question->answers()->get();
        
        $uniqueAnswer = self::removeDupplicateValue($answers);

        $stats = self::getAnswerStats($uniqueAnswer, $question);


        $response = [
            "content" => $question->content,
            "stats" => $stats,
            "type" => "pie"
        ];

        return $response;
    }
    
    /**
     * questionTen
     * Get all anwers from question ten
     * @return void
     */
    private static function getQuestionTen()
    {
        $question = Question::getByID(10);
        $answers = $question->answers()->get();
        
        $uniqueAnswer = self::removeDupplicateValue($answers);

        $stats = self::getAnswerStats($uniqueAnswer, $question);


        $response = [
            "content" => $question->content,
            "stats" => $stats,
            "type" => "pie"
        ];

        return $response;
    }
    
    /**
     * questionElevenToFifteen
     * Get all answer from question Eleven to fifteen
     * @return void
     */
    private static function getQuestionElevenToFifteen()
    {
        $stats = [];

        for($i = 11; $i < 15; $i++)
        {
            $total = 0;
            $question = Question::getByID($i);
            $answers = $question->answers()->get();

            foreach($answers as $answer) {
                $total += $answer->content;
            }

            array_push($stats, ["content" => $question->content, "average" => round($total / count($answers), 2)]);
        }

        $response = [
            "stats" => $stats,
            "type" => "radar"
        ];

        return $response;
    }
}
