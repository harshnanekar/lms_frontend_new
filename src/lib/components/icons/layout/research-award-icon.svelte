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
  <!-- Circle for the Award's Base -->
  <circle cx="12" cy="8" r="6" fill={fill}/>
  
  <!-- Star Icon in the Center -->
  <polygon
    points="12 4.5 13.09 7.05 15.8 7.35 13.9 9.11 14.45 11.77 12 10.5 9.55 11.77 10.1 9.11 8.2 7.35 10.91 7.05 12 4.5"
    fill="white"
  />
  
  <!-- Ribbons -->
  <path d="M9 14l-3 7 6-4 6 4-3-7" fill={fill} />
</svg>
