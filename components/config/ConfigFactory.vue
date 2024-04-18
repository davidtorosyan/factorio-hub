<script setup lang="ts">
defineProps<{
  data: FactoryContent,
  images: Images,
}>()

const model = defineModel<FactoryConfig>({ required: true })

</script>
<template>
  <Panel>
    <template #header>
      <ConfigBadge
        name="Config"  
        :image="images.icons.get('iron-gear-wheel')"
      />
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