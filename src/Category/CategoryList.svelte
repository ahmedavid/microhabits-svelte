<script>
  import {onMount} from 'svelte';
  import categoryStore from '../Category/category-store.js';	
  import HttpService from '../Helpers/httpService.js';

  export let categories;

  let inputValue = "";
  let isLoading = false;
  let isEditing = false;
  let isAdding = false;
  let isProcessing = false;
  let editedCategory = null;
  $: buttonActive = inputValue.trim() === "";



  async function addCategory() {
    if(inputValue != "") {
      isProcessing = true;
      if(isEditing) {
        if(editedCategory) {
          editedCategory = {...editedCategory,name:inputValue};
          const {id,...editedCategoryOmitId} = editedCategory;
          await HttpService.patch(`categories/${id}.json`,editedCategoryOmitId);
          categoryStore.editCategory(editedCategory);
          isProcessing = false;
          isEditing = false;
          editedCategory = null;
        }
      } else {
        const newCategory = {name:inputValue,isActive:false};
        const catId = await HttpService.post('categories.json',newCategory);
        newCategory['id'] = catId['name'];
        categoryStore.addCategory(newCategory);
        isProcessing = false;
      }
      inputValue = "";
    }
  }
  async function deleteCategory(ev) {
    const id = this;
    isProcessing = true;
    if(confirm("Are you sure to delete?")) {
      const result = await HttpService.delete(`categories/${id}.json`);
      if(result.ok){
        categoryStore.deleteCategory(id);
        isProcessing = false;
      } else {
        isProcessing = false;
        console.log("ERROR HAPPENED")
      }
    }
  }
  async function editCategory(ev) {
    const category = this;
    if(category) {
      isEditing = true;
      inputValue = category.name;
      editedCategory = category;
    }
  }

  function cancelEdit(e){
    if(e.keyCode === 27){
      resetForm();
    }
  }

  function resetForm() {
    inputValue = "";
    isEditing = false;
  }

  async function toggleChange(e) {
    e.preventDefault();
    const category = this;
    isProcessing = true;
    category.isActive = !category.isActive;
    const {id,...editedCategoryOmitId} = category;
    await HttpService.patch(`categories/${id}.json`,editedCategoryOmitId);
    isProcessing = false;
    categoryStore.toggleActiveCategory(category);
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-sm-6 offset-sm-3">

      <form>
        <div class="form-row mb-2">
          <div class="col-9 input-with-inside-button">
            <input type="text" class="form-control name-input" placeholder="Habit" bind:value={inputValue} on:keydown={cancelEdit}>
            {#if isEditing}
            <button class="cancel-button" on:click={resetForm}>x</button>
            {/if}
          </div>
          <div class="col">
            <button type="submit" class="btn btn-primary btn-block" disabled={buttonActive} on:click|preventDefault={addCategory}>{isEditing ? 'Edit' : 'Save'}</button>
          </div>
        </div>
      </form>  

      <ul class="list-group">
        {#each categories as category}
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div class="list-item-checkbox">
            <input disabled={isProcessing} type="checkbox" checked={category.isActive} on:change={toggleChange.bind(category)}>
          </div>
          <div>
          {category.name}
          </div>
          <div class="list-item-controls">
            <button disabled={isProcessing} class="btn btn-sm" on:click={editCategory.bind(category)}>&#x270E;</button>
            <button disabled={isProcessing} class="btn btn-danger btn-sm" on:click={deleteCategory.bind(category.id)}><strong>X</strong></button>
          </div>
        </li>
        {:else}
          {#if isLoading}
            <p>Loading...</p>
          {:else}
            <p>No Categories Yet!</p>
          {/if}
        {/each}
      </ul>    
    </div>
  </div>
</div>

<style>
  .input-with-inside-button{
    display: flex;
    flex-direction: row;
  }
  .name-input{
    padding-right: -25px;
  }
  .cancel-button{
    width: 25px;
    margin-left: -25px;
  }
</style>