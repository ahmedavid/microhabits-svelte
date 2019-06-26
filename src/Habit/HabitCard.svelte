<script>
  import DoughnutChart from '../Common/DoughnutChart.svelte';
  export let habit;
</script>

<style>
  .count {
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .count {
    position: absolute;
  }

</style>

<div class="card mb-2">
  <div class="card-header"> {habit.name}  <span class="badge badge-secondary float-right"> {habit.count}/{habit.goal} </span> </div>
  <div class="card-body">
    <div class="chart-container">
      <DoughnutChart count={habit.count} goal={habit.goal} name={habit.name}/>
      
    </div>
  </div>
  <div class="card-footer">
    <button 
      disabled={habit.count === habit.goal} 
      class="btn btn-primary btn-block" on:click>
        {habit.count === habit.goal ? 'Done' : 'Increment'}
    </button>
  </div>
</div>
