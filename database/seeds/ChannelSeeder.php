<?php

use Illuminate\Database\Seeder;
use App\Channel;

class ChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Channel::truncate();

        $channel = [
            2021,
            2122,
            2022,
        ];

        foreach ($channel as $name) {
            Channel::forceCreate(['name' => $name]);
        }
    }
}
