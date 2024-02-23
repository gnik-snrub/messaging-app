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
  .userBubble {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    background-color: rgba(255, 255, 255, 0.1);
    color: inherit;
    font-size: 1.5em;
    border: none;
    border: 1px solid transparent;
    margin: 0.2em;
  }
</style>
