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
        
    /**
     * charts
     * return a json with all charts
     * @return void
     */
    public function charts()
    {

        $questionSix = $this->getQuestionSix();
        $questionSeven = $this->getQuestionSeven();
        $questionTen = $this->getQuestionTen();
        $questionElevenToFifteen = $this->getQuestionElevenToFifteen();
        
        $result = [$questionSix, $questionSeven, $questionTen, $questionElevenToFifteen];

        if(in_array(null, $result)){
            return $this->sendResponse([], 'Aucune données trouvé');
        }

        return $this->sendResponse($result, 'Graphiques retournée avec succès');
    }
    
    /**
     * removeDupplicateValue
     * Remove dupplicate value from collection
     * @param  mixed $answers
     * @return array
     */
    private function removeDupplicateValue(Collection $answers): array
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
    private function getAnswerStats(array $answers, Question $question): array
    {

        $options = json_decode($question->options);

        $values = [];

        foreach ($answers as $answer) {
            $contentCount = Answer::countByContent($answer);
            
            if($question->type === 'A'){

                foreach ($options as $option) {
                    if($option->key === $answer){
                        
                        // $values[$option->value] = $contentCount;  
                        $res = [
                            "label" => $option->value,
                            "count" => $contentCount
                        ];
                        $values[] = $res;
                    }
                }

            } else {
                $res = [
                    "label" => $answer,
                    "count" => $contentCount
                ];
                $values = $res;
            }
        }
        
        return $values;
    }
    
    /**
     * getQuestionSix
     * Get all answers from question six
     * @return void
     */
    private function getQuestionSix()
    {
        $question = Question::getById(6);
        
        $answers = $question->answers()->get();
        
        if($answers->isEmpty()){
            return null;
        }
        // if(is_null($question->answers()->get())){
        //     return $this->sendError("Aucune réponses trouvé", [], 400);
        // }
        
        $uniqueAnswer = $this->removeDupplicateValue($answers);

        $stats = $this->getAnswerStats($uniqueAnswer, $question);

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
    private function getQuestionSeven()
    {
        $question = Question::getById(7);
        $answers = $question->answers()->get();
        
         if($answers->isEmpty()){
            return null;
        }

        $uniqueAnswer = $this->removeDupplicateValue($answers);

        $stats = $this->getAnswerStats($uniqueAnswer, $question);


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
    private function getQuestionTen()
    {
        $question = Question::getById(10);
        $answers = $question->answers()->get();
        
         if($answers->isEmpty()){
            return null;
        }

        $uniqueAnswer = $this->removeDupplicateValue($answers);

        $stats = $this->getAnswerStats($uniqueAnswer, $question);


        $response = [
            "content" => $question->content,
            "stats" => $stats,
            "type" => "pie"
        ];

        return $response;
    }
    
    /**
     * questionElevenToFifteen
     * Get all answer from question eleven to fifteen
     * @return void
     */
    private function getQuestionElevenToFifteen()
    {
        $stats = [];

        $labelList = [
            11 => "Image",
            12 => "Confort d'utilisation",
            13 => "Connexion réseau",
            14 => "Graphisme",
            15 => "Audio"
        ];

        foreach ($labelList as $key => $value) {
            $question = Question::getById($key);
            $answersAverage = $question->answers()->get()->avg('content');

            $stats[] = [
                "label" => $value,
                "count" =>  $answersAverage
            ];
        }

        $response = [
            "stats" => $stats,
            "type" => "radar"
        ];

        return $response;
    }
}
