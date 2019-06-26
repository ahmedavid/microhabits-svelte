<script>
  import {onMount,afterUpdate,createEventDispatcher} from 'svelte';
  import categoryStore from "../Category/category-store.js";
  import habitStore from '../Habit/habit-store.js';
  import HabitCard from './HabitCard.svelte';

  const dispatch = createEventDispatcher();

  export let habits = [];
  export let categories = [];
  let selectedHabit = {id:-1};

  function submitForm(ev) {
    ev.preventDefault();
    if(selectedHabit.id !== -1){
      const goal = parseInt(prompt("What is your goal for this habit?"));
    debugger

      if(!isNaN(goal)){
        habitStore.addHabit(selectedHabit,goal);
      }
    }
  }

  function selectChanged(ev) {
    const found = categories.find(cat => cat.id === ev.target.value);
    selectedHabit =  found ? found : {id:-1};
  }

  function increment(ev) {
    const {count,goal,name} = this;
    habitStore.increment(name);
  }
</script>

<div class="container">
  <div class="row">
    <div class="col">

      <form id="habitSelectForm" class="form-inline" on:submit={submitForm}>
        <div class="form-group mr-3">
          <label for="catgory">Select Habit For Today</label>
          <select name="catgory" id="catgory" class="form-control ml-2" on:change={selectChanged}>
            <option value="0">-Select Category</option>
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary">Add Habit</button>
          <button type="button" class="btn btn-success ml-2" on:click={()=>dispatch('savechanges')}>Save Changes to Cloud</button>
        </div>

      </form>
    </div>
  </div>

  <div class="row mt-4">
    {#each habits as habit}
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <HabitCard {habit} on:click={increment.bind(habit)}/>
      </div>
    {:else}
      <h3>Add Exercises to get started!</h3>
    {/each}
  </div>
</div>
