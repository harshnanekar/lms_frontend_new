<script lang="ts">
    export let width = "24";
    export let height = "24";
    export let fill = '#7C8798';
    
</script>


<svg
    {width}
    {height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <circle cx="12" cy="8" r="5" fill="#FFFFFF" stroke={fill} stroke-width="2"/>
    <rect x="10" y="13" width="4" height="7" fill="#FFFFFF" stroke={fill} stroke-width="2"/>
    <rect x="9" y="20" width="6" height="2" {fill} stroke={fill} stroke-width="2"/>
</svg>
