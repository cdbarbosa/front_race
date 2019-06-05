<template>
  <main class="" id="rhServices">
    <h3>Serviços</h3>
    <service-table v-if="rhServices" :selectedIndex="selectedIndex" :options="serviceTableOptions" :resources="rhServices" @update="selected = $event"></service-table>
    <service :selected="selected"></service>
  </main>
</template>
<script src="./rhServices.js"></script>
