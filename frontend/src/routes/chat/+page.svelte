<script>
  let messages = []
  const friendList = [1, 2, 3, 4, 5]
  const activeFriendIndex = 1

  let userListPosition = true
  const swapUserPosition = () => {
    userListPosition = !userListPosition
  }

  let newMessage = ''

  const sendMessage = async () => {
    if (newMessage) {
      messages = [...messages, {direction: 'sent', message: newMessage, timeStamp: new Date()}].sort((a, b) => b.timeStamp - a.timeStamp)
    }
    newMessage = ''
  }
</script>

<main style:flex-direction={userListPosition ? 'row' : 'row-reverse'}>
  <section id="userList" style:left={userListPosition ? '0' : ''} style:right={userListPosition ? '' : '0'}>
    <button id="changePosition" on:click={swapUserPosition}>&#8596</button>
    {#each friendList as friend, index }
      {#if index === activeFriendIndex}
        <button id="activeFriend" class="friend">{friend}</button>
      {:else}
        <button class="friend">{friend}</button>
      {/if}
    {/each}
  </section>
  <ul id="messages">
    {#each messages as message}
      <li class={message.direction === 'sent' ? 'right' : 'left'}>{message.message}</li>
    {/each}
  </ul>
  <form on:submit|preventDefault={sendMessage}>
    <input bind:value={newMessage} type="text" autofocus>
    <button type="submit">Send</button>
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
  }
  #changePosition {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    color: inherit;
    outline: none;
    width: 100%;
    padding: 0.5em 0em;
    margin-bottom: 0.2em;
  }
  #activeFriend {
    border: 1px solid #F2F3D9;
  }
  .friend {
    border-radius: 50%;
    width: 80%;
    height: 0;
    padding-bottom: 80%;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    margin: 0.2em;
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
    height: 4em;
    width: 4em;
    border-radius: 2em;
    margin-right: 6em;
    border: none;
    background-color: #2C0E36;
    color: inherit;
  }
</style>
