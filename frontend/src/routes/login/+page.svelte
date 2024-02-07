<script>
  let needsToSignUp = false

  let loginUsername, loginPassword = null

  const login = async () => {
    console.log(loginUsername, loginPassword)
  }

  let signupUsername, signupPassword, favoriteColor = null

  const signup = async () => {
    console.log(signupUsername, signupPassword, favoriteColor)
  }
</script>

<main>
  {#if needsToSignUp}
  <h2>Sign up</h2>

  <button on:click={() => {needsToSignUp = !needsToSignUp}}>Let me log in</button>
    
  <form on:submit={signup}>
    <label for="username">Username: </label>
    <input type="text" name="username" id="username" bind:value={signupUsername}>
    <label for="password">Password: </label>
    <input type="password" name="password" id="password" bind:value={signupPassword}>
    <label for="favoriteColor">Favorite Color: </label>
    <input type="color" bind:value={favoriteColor}>
    <button type="submit">Sign up</button>
  </form>
  {:else}
  <h2>Log In</h2>

  <button on:click={() => {needsToSignUp = !needsToSignUp}}>I need to sign up</button>

  <form on:submit={login}>
    <label for="username">Username: </label>
    <input type="text" name="username" id="username" bind:value={loginUsername}>
    <label for="password">Password: </label>
    <input type="password" name="password" id="password" bind:value={loginPassword}>
    <button type="submit">Login</button>
  </form>
  {/if}
</main>
