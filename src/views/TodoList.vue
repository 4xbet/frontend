<template>
    <div class="todo-list-container">
        <h1>Todo List</h1>

        <!-- Add Todo Form -->
        <div class="add-todo-form">
            <input
                type="text"
                v-model="newTodoTitle"
                placeholder="Add a new todo..."
                @keyup.enter="handleAddTodo"
            />
            <button @click="handleAddTodo">Add Todo</button>
        </div>

        <!-- Loading and Error Messages -->
        <div v-if="loading" class="loading-message">Loading todos...</div>
        <div v-if="error" class="error-message">Error: {{ error }}</div>

        <!-- Todo List -->
        <ul v-if="!loading && !error" class="todo-items">
            <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
                <input
                    type="checkbox"
                    :checked="todo.completed"
                    @change="handleToggleTodo(todo.id)"
                />
                <span>{{ todo.title }}</span>
                <button @click="handleDeleteTodo(todo.id)" class="delete-button">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTodoStore } from '@/stores/todoStore';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore();
const { todos, loading, error } = storeToRefs(todoStore);

const newTodoTitle = ref('');

onMounted(() => {
    todoStore.fetchTodos();
});

const handleAddTodo = () => {
    if (newTodoTitle.value.trim()) {
        todoStore.addTodo(newTodoTitle.value);
        newTodoTitle.value = ''; // Clear input after adding
    }
};

const handleToggleTodo = (id: number) => {
    todoStore.toggleTodo(id);
};

const handleDeleteTodo = (id: number) => {
    todoStore.deleteTodo(id);
};
</script>

<style scoped>
.todo-list-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    background-color: #fff;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
}

.add-todo-form {
    display: flex;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
}

.add-todo-form input[type='text'] {
    flex-grow: 1;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

.add-todo-form button {
    padding: 0.75rem 1.25rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
}

.add-todo-form button:hover {
    background-color: #0056b3;
}

.loading-message,
.error-message {
    text-align: center;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
}

.loading-message {
    color: #555;
    background-color: #f0f0f0;
}

.error-message {
    color: #d32f2f;
    background-color: #ffebee;
}

.todo-items {
    list-style: none;
    padding: 0;
    margin: 0;
}

.todo-items li {
    display: flex;
    align-items: center;
    padding: 0.8rem 0;
    border-bottom: 1px solid #eee;
    gap: 0.75rem;
}

.todo-items li:last-child {
    border-bottom: none;
}

.todo-items li input[type='checkbox'] {
    margin-right: 0.75rem;
    cursor: pointer;
    transform: scale(1.2);
}

.todo-items li span {
    flex-grow: 1;
    font-size: 1.1rem;
    color: #333;
}

.todo-items li.completed span {
    text-decoration: line-through;
    color: #999;
}

.delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s ease;
}

.delete-button:hover {
    background-color: #d32f2f;
}
</style>
