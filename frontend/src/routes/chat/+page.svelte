<script>
  const messages = [
    {direction: 'receive', message: 'yo, what up homie'},
    {direction: 'sent', message: 'nm, hbu?'},
    {direction: 'receive', message: 'just something something test'},
    {direction: 'sent', message: 'lorem ipsum, amirite?'},
    {direction: 'receive', message: 'totally, dude'}]
  const friendList = [1, 2, 3, 4, 5]
  const activeFriendIndex = null

  let userListPosition = true
  const swapUserPosition = () => {
    userListPosition = !userListPosition
  }
</script>

<main style:flex-direction={userListPosition ? 'row' : 'row-reverse'}>
  <section id="userList">
    <button id="changePosition" on:click={swapUserPosition}>&#8596</button>
    {#each friendList as friend }
      <button class="friend">{friend}</button>
    {/each}
  </section>
  <section id="messages">
    {#each messages as message }
      <p class={message.direction === 'sent' ? 'right' : 'left'}>{message.message}</p>
    {/each}
  </section>
</main>

<style>
  main {
    height: 100%;
    width: 80%;
    border: 1px solid white;
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
</style>
