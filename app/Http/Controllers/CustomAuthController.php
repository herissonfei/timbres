<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;


class CustomAuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

    public function authentication(Request $request){

        //  return response()->json($request);
        $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:4|max:20'
        ]);
        $credentials = $request->only('email', 'password');
        // return response()->json(Auth::getProvider()->retrieveByCredentials($credentials));
        

        
            $user = Auth::getProvider()->retrieveByCredentials($credentials);
            
            Auth::login($user, $request->get('remember'));
            // return response()->json(Auth::check());
            // return response()->json(Auth::user()->UserName);
            // return response()->json(Auth::user());
            $name = 'Guest';
            if(Auth::check()){
                $name = Auth::user()->UserName;
                }
                // return view('home');
        // Session::flush();

                return response()->json($name);
              
            // return redirect()->intended('catalogue')->withSuccess('Signed in');
    }
      
    public function dashboard(){
        return response()->json(Auth::check());
        // $name = 'Guest';
        // if(Auth::check()){
        // $name = Auth::user()->name;
        // }
        // return response()->json(Auth::user());

        // return view('home', ['name' =>$name]);
        }      
       
}
