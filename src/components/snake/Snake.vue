<template>
    <div id="main">
        <div id="stage">
            <div id="snake">
                <div></div>
            </div>
            <div id="food">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        <div id="score-panel">
            <div>
                SCORE:<span id="score">0</span>
            </div>
            <div>
                level:<span id="level">1</span>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup="setup" name="Snake">
    import {onMounted} from 'vue';
    import GameControl from '.';
    onMounted(() => {
        new GameControl()
    })
</script>

<style lang="css">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        caret-color: transparent;
    }

    body {
        font: bold 20px "Courier";
        --bg-color: rgb(166, 206, 105);
    }

    #main {
        width: 360px;
        height: 420px;
        background-color: var(--bg-color);
        margin: 100px auto;
        border: 10px solid black;
        border-radius: 40px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-around;
    }

    #stage {
        width: 304px;
        height: 304px;
        border: 2px solid black;
        position: relative;

        #snake {
            & > div {
                width: 10px;
                height: 10px;
                background-color: #000;
                border: 1px solid var(--bg-color);
                position: absolute;
            }
        }

        #food {
            width: 10px;
            height: 10px;
            position: absolute;
            left: 40px;
            top: 100px;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-content: space-between;

            & > div {
                width: 4px;
                height: 4px;
                background-color: black;
                transform: rotate(45deg);
            }
        }
    }

    #score-panel {
        width: 300px;
        display: flex;
        justify-content: space-between;
    }
</style>