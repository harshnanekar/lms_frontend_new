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
  <!-- Document Icon -->
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  <polyline points="14 2 14 8 20 8" />
  
  <!-- Magnifying Glass Icon -->
  <circle cx="15.5" cy="15.5" r="2.5" />
  <line x1="18" y1="18" x2="20" y2="20" />
  
  <!-- Lines Representing Text -->
  <line x1="8" y1="13" x2="12" y2="13" />
  <line x1="8" y1="17" x2="12" y2="17" />
</svg>
