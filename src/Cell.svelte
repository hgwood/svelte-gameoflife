<script>
  export let left, top, size;
  let width = 30,
    height = width;
</script>

<style>
  .cell {
    background: #ccc;
    position: absolute;
  }
</style>

<div
  class="cell"
  style="left: {left * size}px; top: {top * size}px; width: {size - 1}px;
  height: {size - 1}px" />
