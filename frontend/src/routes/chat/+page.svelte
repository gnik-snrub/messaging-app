<script>
  const messages = []
  const friendList = []
  const activeFriendIndex = null
</script>

<main>
  <section>
    {#each friendList as friend }
      <button>User to make active</button>
    {/each}
  </section>
  <section>
    {#each messages as message }
      <p>Message from active friend</p>
    {/each}
  </section>
</main>
