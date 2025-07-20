<script setup lang="ts">
import InputError from '@/components/input-error.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle, Trash } from 'lucide-vue-next';

const props = defineProps<{
    groups: { id: number; name: string; admin_id: string }[];
    role: string;
}>();

const form = useForm({
    name: '',
    users: [{ username: '', password: '' }],
});

const addUser = () => {
    form.users.push({ username: '', password: '' });
};

const removeUser = (index: number) => {
    form.users.splice(index, 1);
};

const submit = () => {
    form.post(route('groups.store'), {
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <div class="mx-auto mt-10 max-w-2xl space-y-8 rounded-xl border p-8 shadow">
        <Head title="Your Groups" />
        <div>
            <h1 class="text-2xl font-bold">Your Groups</h1>
            <div v-if="props.groups.length" class="mt-2 text-base text-muted-foreground">
                You are a member of:
                <ul class="mt-2 list-disc pl-6">
                    <li v-for="group in props.groups" :key="group.id" class="text-foreground">
                        {{ group.name }}
                    </li>
                </ul>
            </div>
            <div v-else class="mt-2 text-red-600">You are not assigned to any group.</div>
        </div>

        <hr class="border-muted" />

        <form @submit.prevent="submit" class="space-y-6">
            <div class="space-y-2">
                <h2 class="text-lg font-semibold">Create New Group</h2>
                <div class="space-y-1">
                    <Input id="group-name" type="text" v-model="form.name" placeholder="Group name" />
                    <InputError :message="form.errors.name" />
                </div>
            </div>

            <div>
                <h3 class="text-md mb-2 font-semibold">Users</h3>
                <div v-for="(user, index) in form.users" :key="index" class="mb-4 grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                    <div>
                        <Input :id="`username-${index}`" v-model="user.username" type="text" placeholder="Username" />
                        <InputError :message="form.errors[`users.${index}.username` as 'users']" />
                    </div>
                    <div>
                        <Input :id="`password-${index}`" v-model="user.password" type="password" placeholder="Password" />
                        <InputError :message="form.errors[`users.${index}.password` as 'users']" />
                    </div>
                    <Button
                        v-if="form.users.length > 1"
                        type="button"
                        variant="ghost"
                        size="icon"
                        @click="removeUser(index)"
                        class="text-red-600 hover:bg-red-50"
                    >
                        <Trash class="h-4 w-4" />
                    </Button>
                </div>

                <Button type="button" variant="link" size="sm" @click="addUser" class="text-sm text-blue-600"> + Add another user </Button>
            </div>

            <Button type="submit" class="w-full" :disabled="form.processing">
                <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                {{ form.processing ? 'Creating...' : 'Create Group' }}
            </Button>
        </form>
    </div>
</template>
