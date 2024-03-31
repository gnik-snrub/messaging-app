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

  const updateResults = async () => {
    const data = new URLSearchParams()
    data.append('request', searchRequest)
    
    const response = await fetch('http://localhost:3000/api/searchUsers/asd', {
      method: 'POST',
      body: data
    })
    const responseData = await response.json()
    searchResults = responseData.users
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
      <button on:click={addFriend}>+</button>
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
      width: 0.7em;
      height: 0.7em;
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
