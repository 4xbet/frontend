<template>
    <div class="add-todo-form">
        <UiInput
            v-model="newTodoTitle"
            placeholder="Add a new todo..."
            @keyup.enter="handleAddTodo"
            class="flex-grow"
        />
        <UiButton @click="handleAddTodo">Add Todo</UiButton>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todoStore';
import { Button as UiButton } from '@/components/ui/button';
import { Input as UiInput } from '@/components/ui/input';

const todoStore = useTodoStore();
const newTodoTitle = ref('');

const emit = defineEmits(['todo-added']);

const handleAddTodo = () => {
    if (newTodoTitle.value.trim()) {
        todoStore.addTodo(newTodoTitle.value);
        newTodoTitle.value = ''; // Clear input after adding
        emit('todo-added'); // Emit event to notify parent
    }
};
</script>

<style scoped>
.add-todo-form {
    display: flex;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
    align-items: center;
}

.flex-grow {
    flex-grow: 1;
}
</style>
