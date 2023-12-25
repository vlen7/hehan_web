<template>
    <h1>Hello Vue3</h1>
    <div class="navigate">
        <RouterLink to="/diff">
            Diff
        </RouterLink>

        <RouterLink to="/snake">
            Snake
        </RouterLink>
    </div>
</template>

<script lang="ts" setup="setup" name="Home">
    import {RouterLink} from 'vue-router'
</script>

<style></style>