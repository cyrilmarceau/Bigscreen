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

        $questionSix = $this->getPieStats(6);
        $questionSeven = $this->getPieStats(7);
        $questionTen = $this->getPieStats(10);
        $questionElevenToFifteen = $this->getRadarStats();
        
        $result = [$questionSix, $questionSeven, $questionTen, $questionElevenToFifteen];

        if(in_array(null, $result)){
            return $this->sendResponse([], 'Aucune donnée trouvée');
        }

        return $this->sendResponse($result, 'Graphiques retournés avec succès');
    }
    
    /**
     * removeDupplicateAnswers
     * Remove dupplicate answers from collection
     * @param  mixed $answers
     * @return array
     */
    private function removeDupplicateAnswers(Collection $answers): array
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
    private function getAnswerCount(array $answers, Question $question): array
    {

        $options = json_decode($question->options);

        $values = [];

        foreach ($answers as $answer) {
            $contentCount = Answer::countByContent($answer);
            
            if($question->type === 'A'){

                foreach ($options as $option) {
                    if($option->key === $answer){
                         
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
     * getPieStats
     * Get pie stats from selected question
     * @param  $id
     * @return $response
     */
    private function getPieStats($id)
    {
        $question = Question::getById($id);
        
        $answers = $question->answers()->get();
        
        if($answers->isEmpty()){
            return null;
        }
        
        $uniqueAnswer = $this->removeDupplicateAnswers($answers);

        $stats = $this->getAnswerCount($uniqueAnswer, $question);

        $response = [
            "content" => $question->content,
            "stats" => $stats,
            "type" => "pie"
        ];

        return $response;
       
    }
    
    /**
     * getRadarStats
     * Get radar stats from questions eleven to fifteen
     * @return void
     */
    private function getRadarStats()
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
