<script setup lang="ts">
import { cn } from '@/lib/utils';
import { InertiaLinkProps, Link } from '@inertiajs/vue3';

const props = defineProps<InertiaLinkProps>();
</script>

<template>
    <Link
        v-bind="props"
        :class="
            cn(
                'text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500',
            )
        "
    >
        <slot />
    </Link>
</template>
