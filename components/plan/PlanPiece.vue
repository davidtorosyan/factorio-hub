
<script setup lang="ts">
defineProps<{
  data: FactoryPiece,
  images: Images,
}>()

function formatNumber(num: number) {
  return num.toFixed(2)
}

</script>
<template>
  <Card class="piece">
    <template #header>
      <div class="header">
        <img
          :src="images.icons.get(data.name) ?? ''"
          :alt="data.name"
        >
      </div>
    </template>
    <template #content>
      <div class="content">
        <p>
          <span class="count">{{ data.count }}</span> X <img
            :src="images.icons.get(data.builder) ?? ''"
            :alt="data.name"
            width="24"
          >
        </p>
        <p>{{ formatNumber(data.rate) }} / sec</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
  .piece {
    background-color: var(--primary-400);
    width: 200px;
    height: 150px;
    border-color: var(--surface-border);
    border-width: 4px;
    border-style: solid;
  }

  .header {
    text-align: left;
    padding-left: 10px;
    padding-top: 10px;
    height: 50px;
  }

  .content {
    text-align: right;
    font-size: larger;
    color: var(--primary-color-text)
  }

  .content p {
    margin-top: 0;
    margin-bottom: 0.3em;
  }

  .count {
    font-weight: bold;
  }
</style>