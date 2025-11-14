import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios'; // Assuming axiosInstance is configured in src/utils/axios.ts

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

export const useTodoStore = defineStore('todo', {
    state: (): TodoState => ({
        todos: [],
        loading: false,
        error: null,
    }),

    actions: {
        async fetchTodos() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axiosInstance.get<Todo[]>('/todos'); // Assuming your API endpoint for todos is '/todos'
                this.todos = response.data;
            } catch (error: any) {
                this.error = error.message || 'Failed to fetch todos';
                console.error('Error fetching todos:', error);
            } finally {
                this.loading = false;
            }
        },

        async addTodo(title: string) {
            if (!title.trim()) {
                this.error = 'Todo title cannot be empty';
                return;
            }
            this.loading = true;
            this.error = null;
            try {
                const response = await axiosInstance.post<Todo>('/todos', {
                    title,
                    completed: false,
                });
                this.todos.push(response.data);
            } catch (error: any) {
                this.error = error.message || 'Failed to add todo';
                console.error('Error adding todo:', error);
            } finally {
                this.loading = false;
            }
        },

        async toggleTodo(id: number) {
            this.loading = true;
            this.error = null;
            const todo = this.todos.find((t) => t.id === id);
            if (!todo) {
                this.error = 'Todo not found';
                this.loading = false;
                return;
            }
            try {
                const response = await axiosInstance.put<Todo>(`/todos/${id}`, {
                    ...todo,
                    completed: !todo.completed,
                });
                const index = this.todos.findIndex((t) => t.id === id);
                if (index !== -1) {
                    this.todos[index] = response.data;
                }
            } catch (error: any) {
                this.error = error.message || 'Failed to update todo';
                console.error('Error updating todo:', error);
            } finally {
                this.loading = false;
            }
        },

        async deleteTodo(id: number) {
            this.loading = true;
            this.error = null;
            try {
                await axiosInstance.delete(`/todos/${id}`);
                this.todos = this.todos.filter((t) => t.id !== id);
            } catch (error: any) {
                this.error = error.message || 'Failed to delete todo';
                console.error('Error deleting todo:', error);
            } finally {
                this.loading = false;
            }
        },
    },
});
