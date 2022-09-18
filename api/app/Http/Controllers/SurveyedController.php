<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyedRequest;
use App\Models\Answer;
use App\Models\Surveyed;
use Illuminate\Http\Request;


class SurveyedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $surveyeds = Surveyed::getAllWithRelation(['answers', 'answers.question']);

        $message = empty($surveyeds) ? "Aucun sondé n'a été trouvé" : "Liste des sondés récupérés avec succès";

        return $this->sendResponse($surveyeds, $message);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\StoreSurveyedRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyedRequest $request)
    {

        $email = $request->input('email');

        $checkEmail = Surveyed::getByMail($email);

        if(!empty($checkEmail)) {
            return $this->sendError("Erreur enregistrement: Vous avez déjà répondu au sondage avec une adresse email identique", [], 405);
        }

        $surveyed = Surveyed::create([
            'slug' => fake()->uuid(),
            'email' => $email
        ]);


        $countRequest = count($request->input('questions'));

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
            return $this->sendError('Aucun sondé n\'a été trouvé', null, 404);
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
