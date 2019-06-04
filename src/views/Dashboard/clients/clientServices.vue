<template>
  <main class="" id="clientServices">
    <h3>Serviços</h3>
    <service-table v-if="clientServices" :selectedIndex="selectedIndex" :resources="clientServices" @update="selected = $event"></service-table>
    <service :selected="selected"></service>
  </main>
</template>
<script src="./clientServices.js"></script>
