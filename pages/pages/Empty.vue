<template>
  <div>
    <div class="card">
      <div class="mb-4 text-xl font-semibold">Empty Page</div>
      <Toolbar class="mb-6">
        <template #start>
          <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            outlined
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length"
          />
        </template>
      </Toolbar>
      <DataTable
        :value="state.products"
        paginator
        :rows="10"
        ref="dt"
        v-model:selection="selectedProducts"
      >
        <Column selectionMode="multiple" style="width: 3em"></Column>
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="price" header="Price"></Column>
      </DataTable>
    </div>
    <div class="card">
      <pre>{{ products }}</pre>
    </div>
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { ConfirmDialog } from 'primevue'
const store = useStore()
const confirm = useConfirm()
const { state } = storeToRefs(store)
const selectedProducts = ref(null)

const openNew = () => {}

const confirmDeleteSelected = () => {
  if (selectedProducts.value && selectedProducts.value.length) {
    confirm()
  }
}
</script>
