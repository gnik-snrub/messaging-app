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
    messages = [...messages, {direction: 'sent', message: newMessage, timeStamp: new Date()}].sort((a, b) => b.timeStamp - a.timeStamp)
    newMessage = ''
  }
</script>

<main style:flex-direction={userListPosition ? 'row' : 'row-reverse'}>
  <section id="userList">
    <button id="changePosition" on:click={swapUserPosition}>&#8596</button>
    {#each friendList as friend, index }
      {#if index === activeFriendIndex}
        <button id="activeFriend" class="friend">{friend}</button>
      {:else}
        <button class="friend">{friend}</button>
      {/if}
    {/each}
  </section>
  <section id="messages">
    {#each messages as message }
      <p class={message.direction === 'sent' ? 'right' : 'left'}>{message.message}</p>
    {/each}
  </section>
  <form on:submit|preventDefault={sendMessage}>
    <input bind:value={newMessage} type="text">
    <button type="submit">Send</button>
  </form>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    display: flex;
  }
  #userList {
    width: 4rem;
    background-color: #2C0E36;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #changePosition {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    color: inherit;
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
    width: 100%;
    background-color: #030027;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding: 1em 3em;
  }
  #messages > p {
    width: fit-content;
    margin: 0;
    padding: 0.8em 1em;
    border-radius: 500vw;
  }
  .left {
    align-self: start;
    background-color: #A53860;
  }
  .right {
    align-self: end;
    background-color: #541C44;
  }
</style>
