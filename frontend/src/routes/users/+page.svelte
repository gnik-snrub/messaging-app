<script>
  let searchRequest = ''
  let searchResults = []

  $: {
    if (searchRequest.length >= 3) {
      searchRequest = searchRequest
      updateResults()
    } else {
      searchResults = []
    }
  }

  //For testing
  const getRandomCol = () => {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')

    return `#${red}${green}${blue}`
  }

  const updateResults = async () => {
    //TODO
    searchResults = searchRequest.split('').map((char) => {return {name: char.repeat(3), favoriteColor: getRandomCol()}})
  }

  const addFriend = async (user) => {}
</script>

<main>
  <a href="/chat">Back to chat</a>
  <h2>Add a user as a friend</h2>

  <input type="text" bind:value={searchRequest} placeholder="Find a user..." autofocus>

  <ul>
    {#each searchResults as user}
    <ol>
      <div class="userBubble" style:background-color={user.favoriteColor}>
        {user.name.slice(0, 1).toUpperCase()}
      </div>
      <span>{user.name}</span>
      <button on:click={addFriend}>Add friend</button>
    </ol>
    {/each}
  </ul>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    width: 40%;
    align-items: center;
    padding-top: 1.7em;
    overflow: auto;
  }
  a {
    text-decoration: none;
    background-color: var(--secondaryColor);
    color: var(--primaryColor);
    padding: 0.3em 0.7em;
    border: 2px solid var(--primaryColor);
    border-radius: 50vw;
    transition: 300ms;
    outline: none;
  }
  a:hover,
  a:focus{
    --primaryColor: #030027;
    --secondaryColor: #F2F3D9;
  }
  input {
    background-color: rgba(255, 255, 255, 0.1);
    color: inherit;
    font-size: 1em;
    border-radius: 1em;
    padding: 0.3em 1em;
    border: 0;
    width: 20ch;
  }
  ul {
    overflow: auto;
    padding: 1em 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ol {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    padding: 0.3em 1.4em;
  }
  ol:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.02);
  }
  .userBubble {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    color: inherit;
    font-size: 1.5em;
    border: 1px solid transparent;
    margin: 0.2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
