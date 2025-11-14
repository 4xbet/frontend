<template>
    <header class="border-b bg-background">
        <div class="container mx-auto flex h-16 items-center justify-between px-4">
            <router-link to="/" class="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6"
                >
                    <path
                        d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                    ></path>
                </svg>
                <span class="font-bold">4xBet</span>
            </router-link>

            <nav class="flex items-center gap-6 text-sm">
                <router-link
                    to="/"
                    class="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Главная
                </router-link>
                <router-link
                    to="/about"
                    class="text-muted-foreground transition-colors hover:text-foreground"
                >
                    О нас
                </router-link>
            </nav>

            <Button variant="secondary" size="sm"> Войти </Button>
        </div>
    </header>
</template>

<script setup>
import { Button } from '~/components/ui/button';
</script>
