<script lang="ts">
    export let width="24"
    export let height="24"
    export let fill = '#7C8798';
    
</script>
<svg
  xmlns="http://www.w3.org/2000/svg"
  {width}
  {height}
  viewBox="0 0 24 24"
  fill="none"
  stroke={fill}
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- Screen Icon -->
  <rect x="3" y="3" width="18" height="14" rx="2" ry="2" />
  <line x1="8" y1="21" x2="16" y2="21" />
  <line x1="12" y1="17" x2="12" y2="21" />

  <!-- Pencil/Icon -->
  <path d="M12 12h1.5l4.5 4.5L16.5 17H12v-1.5z" />
  <path d="M18 7a2 2 0 0 1 2 2c0 .5-.2 1-.5 1.5l-3 3L13.5 10l3-3c.5-.3 1-.5 1.5-.5z" />

  <!-- Text/Content Lines -->
  <line x1="7" y1="8" x2="13" y2="8" />
  <line x1="7" y1="10" x2="11" y2="10" />
  <line x1="7" y1="12" x2="11" y2="12" />
</svg>
