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
  <!-- Screen/Board -->
  <rect x="3" y="3" width="18" height="10" rx="2" ry="2" />
  
  <!-- Stand/Podium -->
  <line x1="12" y1="13" x2="12" y2="21" />
  <line x1="9" y1="21" x2="15" y2="21" />

  <!-- Person Icon (Abstract) -->
  <circle cx="12" cy="15" r="1" />
  <line x1="12" y1="16" x2="12" y2="18" />

  <!-- Content/Lines on Board -->
  <line x1="7" y1="6" x2="10" y2="6" />
  <line x1="7" y1="8" x2="14" y2="8" />
  <line x1="7" y1="10" x2="14" y2="10" />
</svg>
