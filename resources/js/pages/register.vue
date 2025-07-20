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
    form.post(route('register'));
};
</script>

<template>
    <AuthLayout title="Create new account" description="Enter your name and password below to register">
        <Head title="Register" />

        <AuthForm :form="form" :submit="submit" />
        <div class="text-center text-sm text-muted-foreground">
            Already have an account?
            <TextLink :href="route('login')"> Log in</TextLink>
        </div>
    </AuthLayout>
</template>
