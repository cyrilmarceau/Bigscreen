<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Surveyed;

class AdminSurveyedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $surveyeds = Surveyed::getAllWithRelation(['answers', 'answers.question']);

        if(empty($surveyeds)) {
            return $this->sendResponse([], 'Aucune donnée trouvée');
        }

        return $this->sendResponse($surveyeds, "Liste des sondés récupérés avec succès");
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
