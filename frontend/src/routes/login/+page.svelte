<script>
  import { sineOut } from "svelte/easing";
  import { blur } from "svelte/transition";
  let needsToSignUp = false

  let loginUsername, loginPassword = null

  const login = async () => {
    console.log(loginUsername, loginPassword)
  }

  let signupUsername, signupPassword = null
  let favoriteColor = '#A000CC'

  const signup = async () => {
    console.log(signupUsername, signupPassword, favoriteColor)
  }
</script>

<main>
  {#if needsToSignUp}
    <section id="blur" transition:blur={{duration:300, delay: 0, easing: sineOut}}>
      <h2>Sign up</h2>

  <button on:click={() => {needsToSignUp = !needsToSignUp}}>Let me log in</button>
      <form on:submit|preventDefault={() => {signup()}}>
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" bind:value={signupUsername}>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" bind:value={signupPassword}>
        <label for="favoriteColor">Favorite Color:</label>
        <input type="color" bind:value={favoriteColor}>
          <button type="submit">Sign up</button>
      </form>
    </section>
  {:else}

  <button on:click={() => {needsToSignUp = !needsToSignUp}}>I need to sign up</button>
    <section id="blur" transition:blur={{duration:300, delay: 0, easing: sineOut}}>
      <h2>Log In</h2>

      <form on:submit|preventDefault={() => {login()}}>
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" bind:value={loginUsername}>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" bind:value={loginPassword}>
          <button type="submit">Login</button>
      </form>
    </section>
  {/if}
</main>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  main > button {
    margin-bottom: 1em;
  }
  button {
    background-color: transparent;
    border: none;
    color: inherit;
  }
  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5em;
    width: 42ch;
    align-items: center;
  }
  input[type='text'],
  input[type='password']{
    background-color: rgba(255, 255, 255, 0.1);
    color: inherit;
    font-size: 1em;
    border-radius: 1em;
    padding: 0.3em 1em;
    border: 0;
    width: 20ch;
  }
  input[type='color'] {
    padding: 0;
    width: 4ch;
    margin-left: 24%;
  }
  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type='color']::-webkit-color-swatch{
    border: 5px solid inherit;
  }
  label {
    width: 12ch;
    margin-right: 1em;
  }
  form > button {
    margin-left: 50%;
    translate: -50% 0;
  }
@media screen and (max-width: 700px) {
  form {
    flex-direction: column;
  }
  label {
    width: max-content;
    margin-right: 0em;
  }
  input[type='color'] {
    margin-left: 0;
  }
  form > button {
    margin-left: 0%;
    translate: 0;
  }
}
</style>
