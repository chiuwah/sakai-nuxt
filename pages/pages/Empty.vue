<template>
  <div>
    <div className="card">
      <div class="mb-4 text-xl font-semibold">Empty Page</div>
      <p>Use this page to start from scratch and place your custom content.</p>
      <DataTable :value="products.products">
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="price" header="Price"></Column>
      </DataTable>
    </div>
    <div class="card">
      <pre>{{ products }}</pre>
    </div>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'

const store = useStore()
const { state: products } = storeToRefs(store)
</script>
