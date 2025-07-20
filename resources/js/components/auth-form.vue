<script setup lang="ts">
import InputError from '@/components/input-error.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InertiaForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';

interface Props {
    form: InertiaForm<{ username: string; password: string }>;
    submit: () => void;
}

defineProps<Props>();
</script>

<template>
    <form @submit.prevent="submit" class="flex flex-col gap-6">
        <div class="grid gap-6">
            <div class="grid gap-2">
                <Label for="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    required
                    autofocus
                    :tabindex="1"
                    autocomplete="username"
                    v-model="form.username"
                    placeholder="Username"
                />
                <InputError :message="form.errors.username" />
            </div>

            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    required
                    :tabindex="2"
                    autocomplete="current-password"
                    v-model="form.password"
                    placeholder="Password"
                />
                <InputError :message="form.errors.password" />
            </div>

            <Button type="submit" class="mt-4 w-full" :tabindex="3" :disabled="form.processing">
                <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                Log in
            </Button>
        </div>
    </form>
</template>
