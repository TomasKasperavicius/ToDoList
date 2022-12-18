<script lang="ts">
    export let data : any;
    import Todo from '../components/Todo.svelte';
</script>
<svelte:head>
	<title>To do list</title>
	<meta name="description" content="Svelte to do list app" />
</svelte:head>

<Todo Todos={data.Todos} />

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>