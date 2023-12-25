<template>
    <h2>this is diff page</h2>
    <div>
        <textarea class="src" v-model="src"> </textarea>
        <textarea class="dst" v-model="dst"> </textarea>
    </div>
    <button @click="compare"> 对比 </button>
</template>

<script lang="ts" setup="setup" name="Diff">
    import {ref} from 'vue'

    let src = ref("")
    let dst = ref("")

    function compare() {
        
    }
</script>

<style>

</style>