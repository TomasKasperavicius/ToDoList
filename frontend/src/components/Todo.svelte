<!-- <script context="module" lang="ts">
    export async function load({ fetch }:any) :Promise<any> {
        let res = await fetch('http://localhost:4545/todo/all',{
			method:'GET',
			mode: 'cors',
 			headers:{
				'Content-Type':'application/json'
			}
		})
        if (res.ok) {
            return {
                props: {
                    Todos: await res.json()
                }
            };
        }
        return {
            status: res.status,
            error: res.message
        };
    }
</script> -->
    
<script lang="ts">
	// import deleteIcon from '$lib/images/deleteIcon.jfif';
	// import editIcon from '$lib/images/editIcon.jfif';
	import { onMount } from "svelte";
	
	interface TodosFields{
		_id : string,
		todo : string,
		done : boolean,
		inputField: any,
		deleteButton: any,
		editButton: any,
		checkbox: any
	}
	let Todos : TodosFields[] =[];
	onMount(async () => {
		let res = await fetch('http://localhost:4545/todo/all',{
			method:'GET',
			mode: 'cors',
 			headers:{
				'Content-Type':'application/json'
			}
	})
     Todos = await res.json();
  	})

  
	let todo : string = '';
	const addTodo = async (): Promise<void>=>{
		if (todo.length == 0) {
			return;
		}
		let res = await fetch('http://localhost:4545/todo/add',{
			method:'POST',
			mode: 'cors',
 			headers:{
				'Content-Type':'application/json'
			},
 			body:JSON.stringify({
 				todo:todo,
 				done:false
			})
		})
		let result = await res.json()
		Todos = [...Todos, {_id:result,todo:todo,done:false,inputField:null,deleteButton:null,editButton:null,checkbox:null}];
		todo = '';
	}
	const deleteTodo = async (e : any):Promise<void> =>{
		let deletedTodo =  Todos.filter((t) => t.deleteButton === e.target);
		if (Todos.length == 1) {
			Todos = [];
		}
		Todos = Todos.filter((t) => t.deleteButton !== e.target);
		await fetch(`http://localhost:4545/todo/delete/${deletedTodo[0]._id}`,{
			method:'DELETE',
			mode: 'cors',
			headers:{
				'Content-Type':'application/json'
			}
		})
	}
	
	const enableEditing = (e: any):void=>{
		let index : number = Todos.findIndex((t) => t.editButton==e.target);
		Todos[index].inputField.disabled = false;
	}

	const disableEditing = async (e: any):Promise<void>=>{
		let index : number = Todos.findIndex((t) => t.inputField===e.target);
		Todos[index].inputField.disabled = true;
		await fetch(`http://localhost:4545/todo/update/${Todos[index]._id}`,{
			method:'POST',
			mode: 'cors',
			 headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
 				todo:Todos[index].todo
			})
		})
	}
	const changeDone = async (e:any):Promise<void>=>{
		let index : number = Todos.findIndex((t) => t.checkbox===e.target);
		e.target.checked = !Todos[index].done;
		Todos[index].done = !Todos[index].done;
		await fetch(`http://localhost:4545/todo/update/${Todos[index]._id}`,{
			method:'POST',
			mode: 'cors',
			 headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
 				done:Todos[index].done
			})
		})
	}
</script>

<div class="flex-col text-center w-full">
	<div class="p-4">
		<input type="text" bind:value={todo} class="border-solid border-2">
		<button type="button" on:click={addTodo} class="border-solid border-2">
			Add todo
		</button>
	</div>
	{#if Todos.length > 0}
	{#each Todos as todo}
		<div class="flex h-full m-2 p-2">
			<div class="flex items-center m-2 w-3/4">
				<input class="h-2/3 w-1/12" type="checkbox" on:click={changeDone} bind:this={todo.checkbox} bind:checked={todo.done}>
				<input class="h-2/3 border-solid w-full border-2" on:focusout={disableEditing} type="text" bind:value={todo.todo} bind:this={todo.inputField} disabled>
			</div>
			<div class="flex justify-left w-1/4">
				<button on:click={deleteTodo} bind:this={todo.deleteButton} class="border-solid border-2 m-4 w-1/6">
					Delete
					<!-- <img class="w-full h-full" src={deleteIcon} alt="delete" > -->
				</button>
				<button on:click={enableEditing} bind:this={todo.editButton} class="border-solid border-2 m-4 w-1/6">
					Edit
					<!-- <img class="w-full h-full" src={editIcon} alt="edit" > -->
				</button>
			</div>
		</div>
	{/each}
	{/if}
</div>

