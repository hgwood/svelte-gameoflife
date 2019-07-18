<script>
  import Cell from "./Cell.svelte";
  import { runIteration, makeEmptyBoard, makeCells } from "./life";

  const WIDTH = 40;
  const HEIGHT = 30;

  // Helpers
  const makeRandomBoard = () =>
    makeEmptyBoard(WIDTH, HEIGHT, () => Math.random() > 0.5);

  // "Methods"
  const resetInterval = interval => {
    clearInterval(intervalHandle);
    return setInterval(() => {
      if (isRunning) {
        board = runIteration(board);
      }
    }, interval);
  };

  // State
  let isRunning = false;

  let interval = 100;
  $: intervalHandle = resetInterval(interval);

  let board = makeEmptyBoard();
  $: cells = makeCells(board);

  // Handlers
  const runGame = () => (isRunning = true);
  const stopGame = () => (isRunning = false);
  const random = () => {
    board = makeRandomBoard();
  };
  const clear = () => {
    board = makeEmptyBoard(WIDTH, HEIGHT);
  };
</script>

<style>
  .Board {
    position: relative;
    margin: 50px auto;
    background-color: #000;
    background-image: linear-gradient(#333 1px, transparent 1px),
      linear-gradient(90deg, #333 1px, transparent 1px);
  }

  .controls {
    margin-top: 20px;
  }

  .button {
    margin-left: 12px;
    cursor: pointer;
  }
</style>

<div>
  <div class="controls">
    Update every
    <input type="text" bind:value={interval} />
    msec
    {#if isRunning}
      <button class="button" on:click={stopGame}>Stop</button>
    {:else}
      <button class="button" on:click={runGame}>Run</button>
    {/if}
    <button class="button" on:click={random}>Random</button>
    <button class="button" on:click={clear}>Clear</button>
  </div>
  <div class="Board" style="width: 800px; height: 600px; background-size: 20px 20px;">
    {#each cells as { x, y }}
      {#if board[y][x]}
        <Cell size={20} left={x} top={y} />
      {/if}
    {/each}
  </div>
</div>
