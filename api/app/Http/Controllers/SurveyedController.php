<?php

namespace App\Http\Controllers;

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

        $message = $surveyeds->isEmpty() ? "Aucun sondé n'a été trouvé" : "Liste des sondés récupérés avec succès";

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
        //
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
