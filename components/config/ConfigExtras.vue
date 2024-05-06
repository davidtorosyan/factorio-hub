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
        name="Extras"  
        :image="images.icons.get('construction-robot')"
      >
        <Button
          class="add-button"
          icon="pi pi-plus"
          aria-label="add" 
          @click="model.extraItems.push({ name: undefined, rate: 1 })"
        />

        <Button
          label="[reset]"
          link
          @click="model.extraItems = []"
        />
      </ConfigBadge>
    </template>



    <div class="grid">
      <div
        v-for="(extraItem, i) in model.extraItems"
        :key="extraItem.name"
        class="col-fixed"
      >
        <ConfigExtra
          v-model="model.extraItems[i]"
          :data="data"
          :images="images"
          :remove="() => model.extraItems.splice(i, 1)"
        />
      </div>
    </div>
  </Panel>
</template>

<style scoped>
  .add-button {
    width: 25px;
    height: 25px;
  }
  
  .extras {
    display: flex;
    justify-content: space-between;
    align-items: left;
  }
</style>

