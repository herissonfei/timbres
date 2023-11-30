<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Stamp;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class BidController extends Controller
{
    // 获取所有的Bids
    public function getAllBids()
    {
        //bids,  stamps, image的数据
        // $bids = Bid::count();
        $bids = Bid::select('bids.id', 'bids.bidstampid','bids.bidderid','bids.bidtime','bids.auctioncount','bids.startdate','bids.enddate','bids.favorites','stamps.name','stamps.startingprice','stamps.reserveprice','stamps.creationdate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageurl')
        ->join('stamps', 'stamps.id', '=', 'bids.bidstampid')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampid')
        ->get();
    
        return response()->json($bids);
    }

     // 获取Bids的数量
     public function getBidsCount()
     {
        $totalBids = Bid::count();
         return $totalBids;      
     }

     // 获取BidsPrive的数量
     public function getBidsPriveCount()
     {
        $id_user_connecte = Auth::user()->id;

        $bidsPriveCount = Bid::join('stamps', 'stamps.id', '=', 'bids.bidstampid')
            ->join('stampimages', 'stamps.id', '=', 'stampimages.stampid')
            ->where('bids.bidderid', '=', $id_user_connecte)
            ->count();   
        return $bidsPriveCount;
     }

    public function getOneBid($id)
    {
        //bids,  stamps

        $bid = Bid::select('bids.id', 'bids.bidstampid','bids.bidderid','bids.bidtime','bids.auctioncount','bids.startdate','bids.enddate','bids.favorites','stamps.name','stamps.startingprice','stamps.reserveprice','stamps.creationdate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageurl')
        ->join('stamps', 'stamps.id', '=', 'bids.bidstampid')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampid')
        ->where('bids.id', '=', $id)
        ->get();
       
        return response()->json($bid);
    }


    public function getBidsPrive()
    {
        //bids,  stamps

        $id_user_connecte = Auth::user()->id;


        
        $bids = Bid::select('bids.id', 'bids.bidstampid','bids.bidderid','bids.bidtime','bids.auctioncount','bids.startdate','bids.enddate','bids.favorites','stamps.name','stamps.startingprice','stamps.reserveprice','stamps.creationdate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageurl')
        ->join('stamps', 'stamps.id', '=', 'bids.bidstampid')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampid')
        ->where('bids.bidderid', '=', $id_user_connecte)
        ->get();
       
        return response()->json($bids);
    }

    public function filterPrive(Request $request)
    {
        //
        // return response()->json(Auth::user()->id);
        $id_user_connecte = Auth::user()->id;

        $selectedCategoriesConditions = $request->input('selectedCategoriesConditions');
        if ($selectedCategoriesConditions == []) {
            $selectedCategoriesConditions = ['Parfaite', 'Excellente', 'Bonne', 'Moyenne', 'Endommagé'];
        }
        $selectedCategoriesTypes = $request->input('selectedCategoriesTypes');
        if (empty($selectedCategoriesTypes)) {
            $selectedCategoriesTypes = ['Général', 'Courrier Aérien', 'Livret', 'Port dû', 'Carte postale', 'Semi postal', 'Entier postal'];
        }

        $pays = $request->input('selectedOption');
        
        // return response()->json($pays);

        $minPrix = $request->input('minPrix');
        $maxPrix = $request->input('maxPrix');
        
        // return response()->json($selectedCategoriesTypes);

        $query = Bid::select('bids.id', 'bids.bidstampid','bids.bidderid','bids.bidtime','bids.auctioncount','bids.startdate','bids.enddate','bids.favorites','stamps.name','stamps.startingprice','stamps.reserveprice','stamps.creationdate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageurl')
        ->join('stamps', 'stamps.id', '=', 'bids.bidstampid')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampid')
        ->whereIn('stamps.conditions', $selectedCategoriesConditions)
        ->whereIn('stamps.type', $selectedCategoriesTypes)
        ->where('bids.bidderid', '=', $id_user_connecte);
        
        
        if(($pays) && $pays != 'tous') {
            $query->where('stamps.country','=', $pays);
        }
        if ($maxPrix <= 0) {
            $query->where('stamps.reserveprice', '>=', $minPrix);
        } else {
            $query->where('stamps.reserveprice', '>=', $minPrix)
                  ->where('stamps.reserveprice', '<=', $maxPrix);
        }
        
        $bids = $query->get();
        
        
        return response()->json($bids);

    }


    public function filter(Request $request)
    {
        //
        

        $selectedCategoriesConditions = $request->input('selectedCategoriesConditions');
        if ($selectedCategoriesConditions == []) {
            $selectedCategoriesConditions = ['Parfaite', 'Excellente', 'Bonne', 'Moyenne', 'Endommagé'];
        }
        $selectedCategoriesTypes = $request->input('selectedCategoriesTypes');
        if (empty($selectedCategoriesTypes)) {
            $selectedCategoriesTypes = ['Général', 'Courrier Aérien', 'Livret', 'Port dû', 'Carte postale', 'Semi postal', 'Entier postal'];
        }

        $pays = $request->input('selectedOption');
        
        // return response()->json($pays);

        $minPrix = $request->input('minPrix');
        $maxPrix = $request->input('maxPrix');
        
        // return response()->json($selectedCategoriesTypes);

        $query = Bid::select('bids.id', 'bids.bidstampid','bids.bidderid','bids.bidtime','bids.auctioncount','bids.startdate','bids.enddate','bids.favorites','stamps.name','stamps.startingprice','stamps.reserveprice','stamps.creationdate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageurl')
        ->join('stamps', 'stamps.id', '=', 'bids.bidstampid')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampid')
        ->whereIn('stamps.conditions', $selectedCategoriesConditions)
        ->whereIn('stamps.type', $selectedCategoriesTypes);
        
        if(($pays) && $pays != 'tous') {
            $query->where('stamps.country','=', $pays);
        }
        if ($maxPrix <= 0) {
            $query->where('stamps.reserveprice', '>=', $minPrix);
        } else {
            $query->where('stamps.reserveprice', '>=', $minPrix)
                  ->where('stamps.reserveprice', '<=', $maxPrix);
        }
        
        $bids = $query->get();
        
        
        return response()->json($bids);

    }

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

    public function uploadImage(Request $request)
    { 
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $fileName = $image->getClientOriginalName(); 

        // 将上传的图片保存到 img\jpg\encheres/ 目录
        $image->move(public_path('\img\jpg\encheres'), $fileName);

        // 返回成功响应
        return response()->json(['message' => '图片上传成功', 'url' => asset('/img/jpg/encheres/' . $fileName)], 200);
    }

    // 返回失败响应
    return response()->json(['message' => '图片上传失败'], 400);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { 
        // return response()->json($request);
                // return $request->json()->all(); 
                DB::table('stamps')->insert([
                    'name' => $request->name,
                    'startingprice' => $request->startingprice,
                    'reserveprice' => $request->reserveprice,
                    'creationdate' => $request->creationdate,
                    'dimensions' => $request->dimensions,
                    'country' => $request->country,
                    'conditions' => $request->conditions,
                    'status' => $request->status,
                    'certified' => $request->certified,
                    'description' => $request->description,
                    'type' => $request->type
                ]);
                $stampid = DB::table('stamps')->latest('id')->value('id');
                DB::table('bids')->insert([
                    'bidstampid' => $stampid,
                    'bidderid' => $request->bidderid,
                    'bidtime' => $request->bidtime,
                    'startdate' => $request->startdate,
                    'enddate' => $request->enddate,
                    'favorites' => $request->favorites,
                    'auctioncount' => $request->auctioncount
                ]);

                DB::table('stampimages')->insert([
                    'stampid' => $stampid,
                    'imageurl' => $request->imageurl
                ]);
   
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bid  $bid
     * @return \Illuminate\Http\Response
     */
    public function show(Bid $bid)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bid  $bid
     * @return \Illuminate\Http\Response
     */
    public function edit(Bid $bid)
    {
        //
        

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Bid  $bid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stamp $stamp, Bid $bid, $id)
    {
        //
        // return response()->json($request['reserveprice']);

       
        DB::table('stamps')->where('id',Bid::find($id)['bidstampid'])->update(['reserveprice' => $request['reserveprice']]);
        $stamp = Stamp::find(Bid::find($id)['bidstampid']);

        return response()->json($stamp);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bid  $bid
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bid $bid, $id)
    {
        //
        DB::table('bids')->where('id', $id)->delete();
        // return response()->json($id);

        return true;
    }
}
