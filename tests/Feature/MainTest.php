<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/')->assertRedirect('/login');
});

test('authenticated users can visit the main', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/')->assertOk();
});
