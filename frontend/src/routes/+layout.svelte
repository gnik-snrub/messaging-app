<svelte:head>
  <title>Your-ssaging</title>
</svelte:head>

<slot />

<style>
  :global(html, body) {
    background-color: #030027;
    color: #FEE;
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
</style>
