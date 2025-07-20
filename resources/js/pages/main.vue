<script setup lang="ts">
import { Button } from '@/components/ui/button';
import WishItemForm from '@/components/wish-item-form.vue';
import { Head, useForm } from '@inertiajs/vue3';

const logoutForm = useForm({});
const logout = () => {
    logoutForm.post(route('logout'));
};

defineProps<{ items: { id: number; title: string; description: string }[] }>();
</script>

<template>
    <Head title="Main" />

    <h1>WishList:</h1>
    <ul>
        <li v-for="item in items" :key="item.id">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
        </li>
    </ul>

    <WishItemForm />

    <Button @click="logout" :disabled="logoutForm.processing">
        {{ logoutForm.processing ? 'Logging out...' : 'Logout' }}
    </Button>
</template>
