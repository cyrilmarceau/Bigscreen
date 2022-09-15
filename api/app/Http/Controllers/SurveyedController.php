<?php

namespace App\Http\Controllers;

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
        $surveyeds = Surveyed::getAllWithRelation(['answers']);

        $message = empty($surveyeds) ? "Aucun sondé n'a été trouvé" : "Liste des sondés récupérés avec succès";

        return $this->sendResponse($surveyeds, $message);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $checkEmail = Surveyed::where('email', $request[0]["content"])->first();

        if(!empty($checkEmail)) {

            return $this->sendError("Erreur enregistrement: Vous avez déjà répondu au sondage avec une adresse email identique", [], 405);
        }

        $surveyed = Surveyed::create([
            'slug' => fake()->uuid(),
            'email' => $request[0]["content"]
        ]);

        for($i = 0; $i < 20; $i++) {

            Answer::create([
                'question_id' => $request[$i]["questionId"],
                'surveyed_id' => $surveyed->id,
                'content' => $request[$i]["content"]
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

        $message = empty($surveyed) ? "Aucun sondé n'a été trouvé" : "Sondé récupéré avec succès";

        return $this->sendResponse($surveyed, $message);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Surveyed  $survey
     * @return \Illuminate\Http\Response
     */
    public function edit(Surveyed $surveyed)
    {
        //
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
