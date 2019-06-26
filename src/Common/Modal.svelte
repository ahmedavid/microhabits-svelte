<script>
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher()
</script>
<div class="mymodal-backdrop" on:click={() => dispatch('close')}>
  <div class="mymodal" on:click|stopPropagation={()=>{}}>
    <div class="mymodal-header" on:click|stopPropagation={()=>{}}>MODAL HEADER</div>
    <div class="mymodal-body" on:click|stopPropagation={()=>{}}>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
      <p>MODAL BODY</p>
    </div>
    <div class="mymodal-footer" on:click|stopPropagation={()=>{}}>
      <button class="btn btn-primary" on:click={() => dispatch('close')}>Close</button>
    </div>
  </div>
</div>

<style>
  .mymodal-backdrop{
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100vh;
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mymodal{
    background: red;
    width: 40%;
    position: relative;
  }
  .mymodal-footer{
    width: 100%;
    height: 20%;
  }
  .mymodal-header{
    width: 100%;
    height: 20%;
    background: salmon;
  }
  .mymodal-body{
    background: yellow;
    width: 100%;
    height: 60%;
  }
</style>