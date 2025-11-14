<!-- src/components/Clicker.vue -->
<template>
  <div
    class="flex flex-col items-center gap-4 rounded-xl border bg-card p-8 text-card-foreground shadow"
  >
    <h2 class="text-2xl font-bold tracking-tight">Простой Кликер</h2>
    <p class="text-5xl font-mono font-extrabold text-primary">
      {{ count }}
    </p>
    <div class="flex gap-2">
      <Button @click="increment">
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
          class="mr-2 h-4 w-4"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        Увеличить
      </Button>
      <Button @click="reset" variant="destructive" :disabled="count === 0"> Сбросить </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from '~/components/ui/button';

// Реактивная переменная для счетчика
const count = ref(0);

// Функция для увеличения счетчика
const increment = () => {
  count.value++;
};

// Функция для сброса
const reset = () => {
  count.value = 0;
};
</script>
