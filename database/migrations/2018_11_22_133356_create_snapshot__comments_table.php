<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSnapshotCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('snapshot__comments', function (Blueprint $table) {
            $table->increments('id');
            $table->text('comment');
            $table->unsignedInteger('snapshot_id');
            $table->unsignedInteger('user_id');
            $table->foreign('snapshot_id')->references('id')->on('articles')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('snapshot__comments');
    }
}
