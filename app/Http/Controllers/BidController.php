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

        $bids = Bid::select('bids.id', 'bids.bidStampId','bids.bidderId','bids.bidTime','bids.auctionCount','bids.startDate','bids.endDate','bids.favorites','stamps.name','stamps.startingPrice','stamps.reservePrice','stamps.creationDate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageURL')
        ->join('stamps', 'stamps.id', '=', 'bids.bidStampId')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampId')
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

        $bidsPriveCount = Bid::join('stamps', 'stamps.id', '=', 'bids.bidStampId')
            ->join('stampimages', 'stamps.id', '=', 'stampimages.stampId')
            ->where('bids.bidderId', '=', $id_user_connecte)
            ->count();   
        return $bidsPriveCount;
     }

    public function getOneBid($id)
    {
        //bids,  stamps

        $bid = Bid::select('bids.id', 'bids.bidStampId','bids.bidderId','bids.bidTime','bids.auctionCount','bids.startDate','bids.endDate','bids.favorites','stamps.name','stamps.startingPrice','stamps.reservePrice','stamps.creationDate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageURL')
        ->join('stamps', 'stamps.id', '=', 'bids.bidStampId')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampId')
        ->where('bids.id', '=', $id)
        ->get();
       
        return response()->json($bid);
    }


    public function getBidsPrive()
    {
        //bids,  stamps

        $id_user_connecte = Auth::user()->id;


        
        $bids = Bid::select('bids.id', 'bids.bidStampId','bids.bidderId','bids.bidTime','bids.auctionCount','bids.startDate','bids.endDate','bids.favorites','stamps.name','stamps.startingPrice','stamps.reservePrice','stamps.creationDate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageURL')
        ->join('stamps', 'stamps.id', '=', 'bids.bidStampId')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampId')
        ->where('bids.bidderId', '=', $id_user_connecte)
        ->get();
       
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

        $query = Bid::select('bids.id', 'bids.bidStampId','bids.bidderId','bids.bidTime','bids.auctionCount','bids.startDate','bids.endDate','bids.favorites','stamps.name','stamps.startingPrice','stamps.reservePrice','stamps.creationDate','stamps.dimensions','stamps.country','stamps.conditions','stamps.status','stamps.certified','stamps.description','stamps.type', 'stampimages.imageURL')
        ->join('stamps', 'stamps.id', '=', 'bids.bidStampId')
        ->join('stampimages', 'stamps.id', '=', 'stampimages.stampId')
        ->whereIn('stamps.conditions', $selectedCategoriesConditions)
        ->whereIn('stamps.type', $selectedCategoriesTypes);
        
        if(($pays) && $pays != 'tous') {
            $query->where('stamps.country','=', $pays);
        }
        if ($maxPrix <= 0) {
            $query->where('stamps.reservePrice', '>=', $minPrix);
        } else {
            $query->where('stamps.reservePrice', '>=', $minPrix)
                  ->where('stamps.reservePrice', '<=', $maxPrix);
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
        $image->move(public_path('img\jpg\encheres'), $fileName);

        // 返回成功响应
        return response()->json(['message' => '图片上传成功', 'url' => asset('img/jpg/encheres/' . $fileName)], 200);
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
                    'startingPrice' => $request->startingPrice,
                    'reservePrice' => $request->reservePrice,
                    'creationDate' => $request->creationDate,
                    'dimensions' => $request->dimensions,
                    'country' => $request->country,
                    'conditions' => $request->conditions,
                    'status' => $request->status,
                    'certified' => $request->certified,
                    'description' => $request->description,
                    'type' => $request->type
                ]);
                $stampId = DB::table('stamps')->latest('id')->value('id');
                DB::table('bids')->insert([
                    'bidStampId' => $stampId,
                    'bidderId' => $request->bidderId,
                    'bidTime' => $request->bidTime,
                    'startDate' => $request->startDate,
                    'endDate' => $request->endDate,
                    'favorites' => $request->favorites,
                    'auctionCount' => $request->auctionCount
                ]);

                DB::table('stampimages')->insert([
                    'stampId' => $stampId,
                    'imageURL' => $request->imageURL
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
        // return response()->json($request['reservePrice']);

       
        DB::table('stamps')->where('id',Bid::find($id)['bidStampId'])->update(['reservePrice' => $request['reservePrice']]);
        $stamp = Stamp::find(Bid::find($id)['bidStampId']);

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
