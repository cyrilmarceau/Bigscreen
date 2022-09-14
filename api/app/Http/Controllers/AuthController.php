<?php
   
namespace App\Http\Controllers;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
   
class AuthController extends Controller
{
  
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->plainTextToken; 
            $success['name'] =  $user->name;
   
            return $this->sendResponse($success, 'Bienvenue ' . $user->name);
        } 
        else{ 
            return $this->sendError('Identifiant incorrect', ['error' => 'unauthorised']);
        } 
    }

    /**
     * Logout
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {

        $isTokenDelete = $request->user()->tokens()->delete();

        if($isTokenDelete){
            $result = ['data' => null];

            return $this->sendResponse($result, 'Utilisateur déconnecté');
        } else {
            return $this->sendError('Problème lors de la déconnexion.', null);
        }


    }
}