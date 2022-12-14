<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSurveyedRequest;
use App\Models\Answer;
use App\Models\Surveyed;
use Illuminate\Http\Request;


class ClientSurveyedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $surveyeds = Surveyed::getAllWithRelation(['answers', 'answers.question']);

        // $message = empty($surveyeds) ? "Aucun sondé n'a été trouvé" : "Liste des sondés récupérés avec succès";

        // return $this->sendResponse($surveyeds, $message);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\StoreSurveyedRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyedRequest $request)
    {

        $countRequest = count($request->input('questions'));

        if(is_null($request->input('questions')) || $countRequest !== 20) {
            return $this->sendError('Veuillez répondre à l\'ensemble des questions du formulaire', ['error' => 'empty_form'], 400);
        }

        $email = $request->input('email');

        $checkEmail = Surveyed::getByMail($email);

        if(!empty($checkEmail)) {
            return $this->sendError("Erreur enregistrement: Vous avez déjà répondu au sondage avec une adresse email identique", [], 422);
        }

        $surveyed = Surveyed::create([
            'slug' => fake()->uuid(),
            'email' => $email
        ]);

        for($i = 0; $i < $countRequest; $i++) {

            Answer::create([
                'question_id' =>$request->input('questions')[$i]["questionId"],
                'surveyed_id' => $surveyed->id,
                'content' =>$request->input('questions')[$i]["content"]
            ]);
        }

        return $this->sendResponse($surveyed, "Sondé crée avec succès");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Surveyed  $survey
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {

        $surveyed = Surveyed::getBySlug($slug);

        if(empty($surveyed)){
            return $this->sendError('Aucun sondé n\'a été trouvé', [], 404);
        } else {
            return $this->sendResponse($surveyed, "Sondé récupéré avec succès");
        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Surveyed  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Surveyed $surveyed)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Surveyed  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Surveyed $surveyed)
    {
        //
    }
}
