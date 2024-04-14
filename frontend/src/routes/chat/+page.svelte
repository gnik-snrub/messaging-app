<script>
  import {onMount} from 'svelte';
  import { userID } from '/src/stores/user'
  import { authToken } from '/src/stores/auth'
  import { isLightBackground } from '/src/lib/luminance'

  let messages = []
  let friendList = []
  let activeFriendIndex = 0

  const fetchFriendsList = async () => {
    const response = await fetch('http://localhost:3000/api/findFriends/' + $userID)
    return response.json()
  }

  const fetchMessages = async () => {
    const data = new URLSearchParams()
    data.append('sender', $userID)
    data.append('receiver', friendList[activeFriendIndex]._id)
    const response = await fetch('http://localhost:3000/api/retrieveMessages', {
      method: 'POST',
      body: data
    })
    const messageData = await response.json()
    messages = [...messageData.messages]
  }

  $: if (activeFriendIndex !== undefined) fetchMessages()

  const changeFriend = async (newFriend) => {
    activeFriendIndex = newFriend
  }

  let userListPosition = true
  const swapUserPosition = () => {
    userListPosition = !userListPosition
  }

  let newMessage = ''

  const sendMessage = async () => {
    if (newMessage) {
      const data = new URLSearchParams()
      data.append('message', newMessage)
      data.append('sender', $userID)
      data.append('receiver', friendList[activeFriendIndex]._id)
      await fetch('http://localhost:3000/api/sendMessage', {
        method: 'POST',
        body: data
      })
    }
    newMessage = ''
    await fetchMessages()
  }

  onMount(async () => {
    const data = await fetchFriendsList()
    friendList = data
    await fetchMessages()
  })

  const logout = async () => {
    await userID.set('')
    await authToken.set('')
  }
</script>

<main style:flex-direction={userListPosition ? 'row' : 'row-reverse'}>
  <section id="userList" style:left={userListPosition ? '0' : ''} style:right={userListPosition ? '' : '0'}>
    <a href="/users" class="sidebarSpecialButton">Users</a>
    <button id="changePosition" class="sidebarSpecialButton" on:click={swapUserPosition}>&#8596</button>
    {#each friendList as friend, index }
      <button id={index === activeFriendIndex ? 'activeFriend' : ''}
              on:click={() => {changeFriend(index)}}
              class="friend"
              style:color={isLightBackground(friend.favoriteColor) ? 'black' : 'white'}
              style:background-color={friend.favoriteColor}>
            {friend.username}
      </button>
    {/each}
    <button id="logout" class="sidebarSpecialButton" on:click={logout}>Logout</button>
  </section>
  <ul id="messages">
    {#each messages as message}
      <li class={message.sender === $userID ? 'right' : 'left'}>{message.message}</li>
    {/each}
  </ul>
  <form on:submit|preventDefault={sendMessage}>
    <input bind:value={newMessage} type="text" autofocus>
    <button type="submit">&#10148</button>
  </form>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #userList {
    position: fixed;
    height: 100%;
    width: 4em;
    background-color: #2C0E36;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    transition: 300ms;
  }
  .sidebarSpecialButton {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    color: inherit;
    outline: none;
    width: 100%;
    padding: 0.5em 0em;
    margin: 0;
    border-bottom: 2px solid var(--primaryColor);
    text-align: center;
    text-decoration: none;
    transition: 300ms;
  }
  .sidebarSpecialButton:hover,
  .sidebarSpecialButton:focus {
    background-color: var(--primaryColor);
    color: #2C0E36;
  }
  #logout {
    margin-top: auto;
  }
  a {
    margin-bottom: 0.2em;
  }
  #activeFriend {
    border: 1px solid #F2F3D9;
  }
  .friend {
    border-radius: 50vw;
    width: 3em;
    height: 3em;
    background-color: rgba(255, 255, 255, 0.1);
    color: inherit;
    font-size: 1em;
    border: none;
    border: 1px solid transparent;
    margin: 0.2em;
    transition: 300ms;
    overflow: hidden;
    white-space: nowrap;
  }
  #userList:hover {
    width: 10em;
  }
  #userList:hover > .friend {
    width: 9em;
  }
  #messages {
    overflow: auto;
    height: fit-content;
    width: 100%;
    height: auto;
    margin: 0 12em;
    padding: 2em 0 6em 0;
    background-color: #030027;
    display: flex;
    flex-direction: column-reverse;
    list-style-type: none;
  }
  #messages > li {
    width: auto;
    max-width: 45%;
    margin: 0;
    padding: 0.8em 1em;
    border-radius: 1.8em 2em;
    word-break: break-word;
    margin-top: 1em;
  }
  .left {
    text-align: left;
    align-self: start;
    background-color: #A53860;
    border-bottom-left-radius: 0.2em !important;
  }
  .right {
    text-align: right;
    align-self: end;
    background-color: #541C44;
    border-bottom-right-radius: 0.2em !important;
  }
  form {
    width: 100%;
    height: 3em;
    display: flex;
    flex-direction: row;
    padding: 0.75em 0;
    margin: 0.75em 0 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #030027;
  }
  form > input {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    width: 100%;
    margin-right: 2em;
    margin-left: 6em;
    color: inherit;
    outline: none;
    font-size: 1em;
    border-radius: 1em;
    padding: 1em;
  }
  form > button {
    height: 100%;
    aspect-ratio: 1 / 1;
    padding: 0;
    border-radius: 2em;
    margin-right: 6em;
    border: none;
    background-color: #2C0E36;
    color: inherit;
  }
  @media screen and (max-width: 450px) {
    #userList {
      z-index: 0;
    }
    form > input {
      margin-left: 1em;
    }
    form > button {
      margin-right: 1em;
    }
    #messages {
      margin-right: 1em;
      margin-left: 6em;
    }
    #messages > li {
      max-width: 65%;
    }
  }
  @media screen and (max-width: 750px) {
    #messages {
      margin-right: 1em;
      margin-left: 5em
    }
    #changePosition {
      display: none;
    }
  }
</style>
