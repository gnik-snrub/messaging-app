<script>
  import { goto } from '$app/navigation'
  import { browser } from '$app/environment'

  import Login from './login/+page.svelte'

  let auth = true

  $: {
    if (!auth && browser) {
      goto('/login')
    }
  }

</script>

<svelte:head>
  <title>Your-ssaging</title>
</svelte:head>

{#if auth}
  <slot />
{:else}
  <Login />
{/if}

<style>
  :global(html, body) {
    background-color: #030027;
    color: #F2F3D9;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    overflow: hidden;
    --primaryColor: #F2F3D9;
    --secondaryColor: #030027;
    --errorBackground: #A53860;
  }
  :global(::-webkit-scrollbar) {
    display: none;
  }
</style>
