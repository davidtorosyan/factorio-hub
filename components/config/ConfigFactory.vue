<script setup lang="ts">
defineProps<{
  data: FactoryContent,
  images: Images,
  reset: () => void
}>()

const model = defineModel<FactoryConfig>({ required: true })

</script>
<template>
  <Panel class="config">
    <template #header>
      <ConfigBadge
        name="Config"  
        :image="images.icons.get('iron-gear-wheel')"
      >
        <Button
          label="[reset]"
          link
          @click="reset()"
        />
      </ConfigBadge>
    </template>

    <ConfigScience
      v-model="model"
      :data="data"
      :images="images"
    />
    <ConfigLab
      v-model="model"
      :data="data"
      :images="images"
    />
  </Panel>
</template>

<style scoped>
  .config {
    width: 800px;
  }
</style>