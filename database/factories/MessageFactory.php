<?php

use Faker\Generator as Faker;

$factory->define(App\Message::class, function (Faker $faker) {
    return [
        'channel_id' => 3,
        'name' => $faker->name,
        'body' => $faker->paragraph,
    ];
});
