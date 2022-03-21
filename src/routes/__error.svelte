<script lang="ts" context="module">
  import type { ErrorLoad } from '@sveltejs/kit'

  export const load: ErrorLoad = ({ status, error }) => {
    return {
      props: {
        error: `${status}: ${error?.message}`
      }
    }
  }
</script>

<script lang="ts">
  export let error: string
</script>

<h1>{error}</h1>
