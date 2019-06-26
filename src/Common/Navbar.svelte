<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let currentPage;
  export let signedInUserEmail;
</script>

<style>
  .navbar {
    margin-bottom: 75px;
  }
</style>

<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-5">
  <a
    class="navbar-brand"
    href="#"
    on:click|preventDefault={() => dispatch('navigate', 'habits')}>
    MicroHabits
  </a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarsExampleDefault"
    aria-controls="navbarsExampleDefault"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>

  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
      {#if signedInUserEmail}
      <li class="nav-item" class:active={currentPage === 'habits'}>
        <a
          class="nav-link"
          href="#"
          on:click|preventDefault={() => dispatch('navigate', 'habits')}>
          Habits
        </a>
      </li>
      <li class="nav-item" class:active={currentPage === 'categories'}>
        <a
          class="nav-link"
          href="#"
          on:click|preventDefault={() => dispatch('navigate', 'categories')}>
          Categories
        </a>
      </li>
      <li class="nav-item" class:active={currentPage === 'about'}>
        <a
          class="nav-link"
          href="#"
          on:click|preventDefault={() => dispatch('navigate', 'about')}>
          About
        </a>
      </li>
    {/if}
    </ul>
    {#if signedInUserEmail}
      <ul class="navbar-nav mr-auto float-right">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Welcome , {signedInUserEmail}</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Profile</a>
            <div class="dropdown-divider" />
            <a class="dropdown-item" href="#" on:click|preventDefault={() => dispatch('signout')}>Signout</a>
          </div>
        </li>
      </ul>
    {/if}

  </div>
</nav>
