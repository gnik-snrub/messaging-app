<h2>Add a user as a friend</h2>

<input type="text" bind:value={searchRequest} placeholder="User">

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

<!--Search bar here-->
<!--List of users here-->
