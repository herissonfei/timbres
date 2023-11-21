<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController ;
use App\Http\Controllers\BidController ;
use App\Http\Controllers\UserController ;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();
// =================================================================================================
Route::get('/', function () {
    return view('home');
});

Route::get('/home', function () {
    return view('home');
});

Route::get('/catalogue', function () {
    return view('catalogue');
});

Route::get('/publish', function () {
    return view('publish');
});

// 跳转到mes enchères页面
Route::get('/listePrive', function () {
    return view('listePrive');
});


Route::get('/logout', [HomeController::class, 'logout'])->name('logout');


// ----------------------------------------------------------------------------------------Bids
// 获取所有的竞拍Bid
Route::get('/getAllBids', [BidController::class, 'getAllBids']);

// 获取一个的竞拍Bid
Route::get('enchere/{id}', function ($id) {
    return view('enchere');
});
// 获取一个的竞拍Bid，stamp, image的数据 
Route::get('/getOneBid/{id}', [BidController::class, 'getOneBid']);

// 获取当前登录用户所拥有的所有拍卖bid
Route::get('/getBidsPrive', [BidController::class, 'getBidsPrive']);

// bids的筛选
Route::post("/enchere/filter", [BidController::class,'filter']);
// 获取bids的数量
Route::get('/getBidsCount', [BidController::class, 'getBidsCount']);
// 获取bidsPrive的数量
Route::get('/getBidsPriveCount', [BidController::class, 'getBidsPriveCount']);
// 进行拍卖 加注 miser
Route::patch("/enchere/miser/{id}", [BidController::class,'update']);



// ----------------------------------------------------------------------------发布竞拍
Route::get('/getUser', [UserController::class, 'index']);
Route::get('/checkUser', [UserController::class, 'checkUser']);
Route::post('/uploadImage', [BidController::class, 'uploadImage']);
Route::post('/uploadFormData', [BidController::class, 'store']);
Route::delete('/deleteBid/{id}' , [BidController::class, 'destroy']);


// http://127.0.0.1:8000/register
    







