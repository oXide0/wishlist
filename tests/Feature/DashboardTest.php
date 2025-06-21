<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/main')->assertRedirect('/login');
});

test('authenticated users can visit the main', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/main')->assertOk();
});
