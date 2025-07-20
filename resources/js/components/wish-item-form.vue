<script setup lang="ts">
import InputError from '@/components/input-error.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';

const form = useForm({
    title: '',
    description: '',
});

const submit = () => {
    form.post(route('wishlist-items.store'), {
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="space-y-6">
        <div class="space-y-2">
            <Label for="title">Title</Label>
            <Input id="title" v-model="form.title" type="text" placeholder="Item title" required autofocus />
            <InputError :message="form.errors.title" />
        </div>

        <div class="space-y-2">
            <Label for="description">Description</Label>
            <Input id="description" v-model="form.description" type="text" placeholder="Optional description" />
            <InputError :message="form.errors.description" />
        </div>

        <Button type="submit" class="w-full" :disabled="form.processing">
            <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
            {{ form.processing ? 'Adding...' : 'Add to Wishlist' }}
        </Button>
    </form>
</template>
