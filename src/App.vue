<script setup lang="ts">
import { computed, ref } from "vue";
import { getGame } from "./composable/math";

const { tables, evaluate, solvedtables, res } = getGame();

const currentTest = computed(() =>
  tables.value.length ? tables.value[0] : null
);
</script>

<template lang="pug">
.container-fluid
  .row
    .col-md-10.problem
      div( v-if="currentTest")
        form(@submit.prevent="currentTest && evaluate(currentTest, res)")
          h1.display-1.text-center
            span {{ currentTest?.num1 }}
            span  x 
            span {{ currentTest?.num2 }}
            span  =
          .input-group.mb-3
            input.form-control(placeholder="Resultado" type="number" v-model="res")
            button.btn.btn-outline-secondary(type="submit") Aceptar
      h1(v-else) Terminaste
    .col-md-2
      div.py-3(style="overflow-y: auto; height: 100vh;")
        ul.list-group
          li.list-group-item.text-center.fs-2(
            v-for="sol in solvedtables"
            :class="{'ok-solution': sol.num1 * sol.num2 === sol.res, 'bad-solution': sol.num1 * sol.num2 !== sol.res}"
          ) {{ sol.num1 }} x {{ sol.num2 }} = {{ sol.res }}
</template>

<style lang="scss">
$white-color: #f5f2e7;
$black-color: #2c3333;
$list-color-ok: #395b64;
$list-color-wrong: #461111;

body {
  background-color: $black-color;
  color: $white-color;
}

.list-group-item {
  color: $white-color;
}

.bad-solution {
  background-color: $list-color-wrong;
}

.ok-solution {
  background-color: $list-color-ok;
}

.problem {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.form-control {
  background-color: $white-color;
}
</style>
