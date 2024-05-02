<script>
  import { userID } from '/src/stores/user'
  import { isLightBackground } from '/src/lib/luminance'

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

  const updateResults = async () => {
    const data = new URLSearchParams()
    data.append('request', searchRequest)
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/searchUsers/asd`, {
      method: 'POST',
      body: data
    })
    const responseData = await response.json()
    searchResults = responseData.users
  }

  const addFriend = async (newFriend) => {
    const data = new URLSearchParams()
    data.append('newF', newFriend)
    data.append('curr', $userID)
    await fetch(`${import.meta.env.VITE_API_URL}/api/addFriend`, {
      method: 'POST',
      body: data
    })
  }
</script>

<main>
  <a href="/chat">Back to chat</a>
  <h2>Add a user as a friend</h2>

  <input type="text" bind:value={searchRequest} placeholder="Find a user..." autofocus>

  <ul>
    {#if searchResults.length !== 0}
      {#each searchResults as user}
      <ol>
        <div class="userBubble" style:background-color={user.favoriteColor} style:color={isLightBackground(user.favoriteColor) ? 'black' : 'white'}>
          {user.username.slice(0, 1).toUpperCase()}
        </div>
        <span>{user.username}</span>
        <button on:click={() => {addFriend(user._id)}}>+</button>
      </ol>
      {/each}
    {:else}
      <ol>
        <div></div>
        <span>No users found</span>
        <div></div>
      </ol>
    {/if}
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
  a, button {
    text-decoration: none;
    background-color: var(--secondaryColor);
    color: var(--primaryColor);
    border: 2px solid var(--primaryColor);
    border-radius: 50vw;
    transition: 300ms;
    outline: none;
  }
  a:hover, a:focus,
  button:hover, button:focus {
    --primaryColor: #030027;
    --secondaryColor: #F2F3D9;
  }
  a {
    padding: 0.3em 0.7em;
  }
  button {
    padding: 1em 0.7em;
    line-height: 0px;
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
  @media screen and (max-width: 1300px) {
    main {
      width: 60%;
    }
  }
  @media screen and (max-width: 700px) {
    main {
      width: 90%;
    }
  }
  @media screen and (max-width: 500px) {
    .userBubble {
      color: transparent;
      width: 1.3em;
      height: 1.3em;
      font-size: 1em;
    }
    ol {
      padding: 1em 1.4em;
      justify-content: start;
    }
    ol > span {
      margin-left: 1em;
    }
    ol > button {
      margin-left: auto;
    }
  }
</style>
