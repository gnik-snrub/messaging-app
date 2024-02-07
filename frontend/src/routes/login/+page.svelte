
<h2>Log In</h2>


<form on:submit={login}>
  <label for="username">Username: </label>
  <input type="text" name="username" id="username" bind:value={loginUsername}>
  <label for="password">Password: </label>
  <input type="text" name="password" id="password" bind:value={loginPassword}>
  <button type="submit">Login</button>
</form>
