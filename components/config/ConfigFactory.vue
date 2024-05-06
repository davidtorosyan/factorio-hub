<script setup lang="ts">
defineProps<{
  data: FactoryContent,
  images: Images,
  reset: () => void,
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

    <div v-if="model.ready">
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
      <ConfigExtras
        v-model="model"
        :data="data"
        :images="images"
      />
      <ConfigBuilders
        v-model="model"
        :data="data"
        :images="images"
      />
    </div>
  </Panel>
</template>

<style scoped>
  .config {
    width: 800px;
  }
</style>