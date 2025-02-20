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
        v-if="state.products"
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
    <Dialog
      v-model:visible="visible.new"
      modal
      header="Add Product"
      :style="{ width: '25rem' }"
    >
      <span class="block mb-8 text-surface-500 dark:text-surface-400"
        >Enter product information</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="title" class="w-24 font-semibold">Title</label>
        <InputText
          id="title"
          class="flex-auto"
          autocomplete="off"
          v-model="newProduct.title"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="price" class="w-24 font-semibold">Price</label>
        <InputText
          id="price"
          class="flex-auto"
          autocomplete="off"
          v-model="newProduct.price"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Save" @click="addNewProduct"></Button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="visible.delete"
      modal
      header="Delete Product(s)"
      :style="{ width: '25rem' }"
    >
      <span class="block mb-4 text-surface-500 dark:text-surface-400"
        >Are you sure you want to delete the following product(s)?</span
      >
      <ul class="mb-4">
        <li v-for="product in selectedProducts" :key="product.id">
          {{ product.title }}
        </li>
      </ul>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button
          type="button"
          severity="danger"
          label="Delete"
          @click="deleteSelectedProducts"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const store = useStore()
const { state } = storeToRefs(store)
const visible = ref({
  new: false,
  delete: false,
})
const selectedProducts = ref(null)
const newProduct = ref({ title: '', price: '' })

const openNew = () => {
  visible.value.new = true
}

const confirmDeleteSelected = () => {
  visible.value.delete = true
}

const addNewProduct = async () => {
  console.log()
  await store.addProduct(newProduct.value)
  newProduct.value = { title: '', price: '' }
  visible.value = false
}

const deleteSelectedProducts = async () => {
  await store.deleteProducts(selectedProducts.value)
  selectedProducts.value = null
  visible.value.delete = false
}
</script>
