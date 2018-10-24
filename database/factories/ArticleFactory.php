<?php

use Faker\Generator as Faker;

$factory->define(App\Article::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'body' => $faker->text($maxNbChars = 2000),
        'user_id' => $faker->numberBetween($min = 1, $max = 21),
    ];
});
