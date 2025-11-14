<template>
    <li :class="{ completed: todo.completed }" class="todo-item">
        <UiCheckbox :checked="todo.completed" @update:checked="handleToggle" class="mr-3" />
        <span class="flex-grow">{{ todo.title }}</span>
        <UiButton variant="destructive" size="sm" @click="handleDelete"> Delete </UiButton>
    </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Checkbox as UiCheckbox } from '@/components/ui/checkbox';
import { Button as UiButton } from '@/components/ui/button';
import { useTodoStore } from '@/stores/todoStore';

interface Props {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    };
}

const props = defineProps<Props>();
const emit = defineEmits(['toggle', 'delete']);

const todoStore = useTodoStore();

const handleToggle = () => {
    todoStore.toggleTodo(props.todo.id);
    emit('toggle', props.todo.id);
};

const handleDelete = () => {
    todoStore.deleteTodo(props.todo.id);
    emit('delete', props.todo.id);
};
</script>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    padding: 0.8rem 0;
    border-bottom: 1px solid #eee;
    gap: 0.75rem;
}

.todo-item:last-child {
    border-bottom: none;
}

.todo-item.completed span {
    text-decoration: line-through;
    color: #999;
}

.flex-grow {
    flex-grow: 1;
}
</style>
