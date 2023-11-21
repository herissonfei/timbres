<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stamp extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'startingPrice',
        'reservePrice',
        'creationDate',
        'dimensions',
        'country',
        'conditions',
        'status',
        'certified',
        'description',
        'type'
        ];
}
