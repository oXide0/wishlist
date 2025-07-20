<script setup lang="ts">
import AuthForm from '@/components/auth-form.vue';
import TextLink from '@/components/text-link.vue';
import AuthLayout from '@/layouts/auth-layout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    username: '',
    password: '',
});

const submit = () => {
    form.post(route('login'));
};
</script>

<template>
    <AuthLayout title="Log in to your account" description="Enter your name and password below to log in">
        <Head title="Log in" />

        <AuthForm :form="form" :submit="submit" />
        <div class="text-center text-sm text-muted-foreground">
            Don't have an account?
            <TextLink :href="route('register')"> Sign up</TextLink>
        </div>
    </AuthLayout>
</template>
