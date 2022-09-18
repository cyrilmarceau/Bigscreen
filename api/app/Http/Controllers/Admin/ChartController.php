<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

use function PHPSTORM_META\type;

class ChartController extends Controller
{
    public function charts()
    {

        $questionSix = self::getQuestionSix();
        $questionSeven = self::questionSeven();
        $questionTen = self::questionTen();

        $results = [
            'six' => $questionSix,
            'seven' => $questionSeven,
            'ten' => $questionTen
        ];

        return $this->sendResponse($results, null);
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
     * getAnswerCount
     * return an array of count value
     * @param  mixed $answers
     * @return array
     */
    private static function getAnswerCount(array $answers): array
    {
        $values = [];
        foreach ($answers as $answer) {
            $contentCount = Answer::countByContent($answer);
            $values[$answer] = $contentCount;
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

        $count = self::getAnswerCount($uniqueAnswer);

        return $count;
       
    }
    
    /**
     * questionSeven
     * get all answers from question seven
     * @return void
     */
    private static function questionSeven()
    {
        $question = Question::getByID(7);
        $answers = $question->answers()->get();
        
        $uniqueAnswer = self::removeDupplicateValue($answers);

        $count = self::getAnswerCount($uniqueAnswer);

        return $count;
    }
    
    /**
     * questionTen
     * Get all anwers from question ten
     * @return void
     */
    private static function questionTen()
    {
        $question = Question::getByID(10);
        $answers = $question->answers()->get();
        
        $uniqueAnswer = self::removeDupplicateValue($answers);

        $count = self::getAnswerCount($uniqueAnswer);

        return $count;
    }
    
    /**
     * questionElevenToFifteen
     * Get all answer from question Eleven to fifteen
     * @return void
     */
    private static function questionElevenToFifteen()
    {
        
    }
}
