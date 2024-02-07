<script>
  let needsToSignUp = false

  let loginUsername, loginPassword = null

  const login = async () => {
    console.log(loginUsername, loginPassword)
  }
</script>

{#if needsToSignUp}
<h2>Sign up</h2>
{:else}
<h2>Log In</h2>

<button on:click={() => {needsToSignUp = !needsToSignUp}}>Sign up</button>

<form on:submit={login}>
  <label for="username">Username: </label>
  <input type="text" name="username" id="username" bind:value={loginUsername}>
  <label for="password">Password: </label>
  <input type="text" name="password" id="password" bind:value={loginPassword}>
  <button type="submit">Login</button>
</form>
{/if}
