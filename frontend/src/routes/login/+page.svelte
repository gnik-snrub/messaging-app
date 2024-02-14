<script>
  import { sineOut } from "svelte/easing";
  import { blur } from "svelte/transition";

  let errors = []

  let needsToSignUp = false
  const togglePage = () => {
    needsToSignUp = !needsToSignUp
    errors = []
  }

  let loginUsername, loginPassword = null

  const login = async () => {
    errors = ['Invalid username or password']
  }

  let signupUsername, signupPassword = null
  let favoriteColor = '#A000CC'

  const signup = async () => {
    errors = [
      'Username taken',
      'Password too weak'
    ]
  }
</script>

<main>
  {#if needsToSignUp}
    <section id="blur" transition:blur={{duration:300, delay: 0, easing: sineOut}}>
      <h2>Sign up</h2>

      <form on:submit|preventDefault={() => {signup()}}>
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" bind:value={signupUsername}>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" bind:value={signupPassword}>
        <label for="favoriteColor">Favorite Color:</label>
        <input type="color" bind:value={favoriteColor}>
        <section id="buttons">
          <button type="button" on:click={togglePage}>Let me log in</button>
          <button type="submit">Sign up</button>
        </section>
      </form>
    </section>
  {:else}
    <section id="blur" transition:blur={{duration:300, delay: 0, easing: sineOut}}>
      <h2>Log In</h2>

      <form on:submit|preventDefault={() => {login()}}>
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" bind:value={loginUsername}>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" bind:value={loginPassword}>
        <section id="buttons">
          <button type="button" on:click={togglePage}>I need to sign up</button>
          <button type="submit">Login</button>
        </section>
      </form>
    </section>
  {/if}
</main>
{#if errors.length > 0}
  <section id="errorOutput">
    {#each errors as error}
      <p>{error}</p>
    {/each}
  </section>
{/if}

<style>
  :root {
    --primaryColor: #F2F3D9;
    --secondaryColor: #030027;
    --errorBackground: #A53860;
  }
  main {
    height: 100%;
    width: 100%;
  }
  #blur {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #errorOutput {
    position: absolute;
    bottom: 0;
    animation: slideUp 500ms ease-in-out forwards;
    background-color: var(--errorBackground);
    width: 100%;
    text-align: center;
    border-radius: 100% 100% 0 0;
  }
  @keyframes slideUp {
    from {
      translate: 0 200%;
    }
    to {
      translate: 0;
    }
  }
  form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5em;
    width: 42ch;
    align-items: center;
  }
  button {
    background-color: var(--secondaryColor);
    color: var(--primaryColor);
    padding: 0.3em 0.7em;
    border: 2px solid var(--primaryColor);
    border-radius: 50vw;
    transition: 300ms;
  }
  button:hover,
  button:focus{
    --primaryColor: #030027;
    --secondaryColor: #F2F3D9;
  }
  #buttons {
    margin: 0.5em auto;
  }
  #buttons > button:first-child {
    background-color: var(--primaryColor);
    color: var(--secondaryColor);
    border: 2px solid var(--secondaryColor);
  }
  #buttons:hover > :not(:hover) {
    opacity: 0.2;
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
  @media screen and (max-width: 700px) {
    * {
      font-size: 0.9em;
    }
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
  }
</style>
