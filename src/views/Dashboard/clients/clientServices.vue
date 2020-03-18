<template>
  <main class="" id="clientServices">
    <h3>Serviços</h3>
    <service-table v-if="clientServices" :selectedIndex="selectedIndex" :options="serviceTableOptions" :resources="clientServices"></service-table>
    <service :selected="serviceSelected"></service>
  </main>
</template>
<script src="./clientServices.js"></script>
