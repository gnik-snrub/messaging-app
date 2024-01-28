<script>
  const messages = []
  const friendList = []
  const activeFriendIndex = null
</script>

<main>
  <section id="userList">
    {#each friendList as friend }
      <button>User to make active</button>
    {/each}
  </section>
  <section id="messages">
    {#each messages as message }
      <p>Message from active friend</p>
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
    width: 10%;
  }
  #messages {
    width: 90%;
  }
</style>
