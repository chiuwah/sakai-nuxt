<script setup>
// import { ProductService } from '@/service/ProductService';
import { onMounted, ref } from 'vue';

const products = ref(null);
const picklistProducts = ref(null);
const orderlistProducts = ref(null);
const options = ref(['list', 'grid']);
const layout = ref('list');

onMounted(() => {
    ProductService.getProductsSmall().then((data) => {
        products.value = data.slice(0, 6);
        picklistProducts.value = [data, []];
        orderlistProducts.value = data;
    });
});

function getSeverity(product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}
</script>

<template>
    <div class="flex flex-col">
        <div class="card">
            <div class="text-xl font-semibold">DataView</div>
            <DataView :value="products" :layout="layout">
                <template #header>
                    <div class="flex justify-end">
                        <SelectButton v-model="layout" :options="options" :allowEmpty="false">
                            <template #option="{ option }">
                                <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                            </template>
                        </SelectButton>
                    </div>
                </template>

                <template #list="slotProps">
                    <div class="flex flex-col">
                        <div v-for="(item, index) in slotProps.items" :key="index">
                            <div class="flex flex-col gap-4 p-6 sm:flex-row sm:items-center" :class="{ 'border-t border-surface': index !== 0 }">
                                <div class="relative md:w-40">
                                    <img class="block w-full mx-auto rounded xl:block" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                                    <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
                                </div>
                                <div class="flex flex-col justify-between flex-1 gap-6 md:flex-row md:items-center">
                                    <div class="flex flex-row items-start justify-between gap-2 md:flex-col">
                                        <div>
                                            <span class="text-sm font-medium text-surface-500 dark:text-surface-400">{{ item.category }}</span>
                                            <div class="mt-2 text-lg font-medium">{{ item.name }}</div>
                                        </div>
                                        <div class="p-1 bg-surface-100" style="border-radius: 30px">
                                            <div
                                                class="flex items-center justify-center gap-2 px-2 py-1 bg-surface-0"
                                                style="
                                                    border-radius: 30px;
                                                    box-shadow:
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                "
                                            >
                                                <span class="text-sm font-medium text-surface-900">{{ item.rating }}</span>
                                                <i class="text-yellow-500 pi pi-star-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-8 md:items-end">
                                        <span class="text-xl font-semibold">${{ item.price }}</span>
                                        <div class="flex flex-row-reverse gap-2 md:flex-row">
                                            <Button icon="pi pi-heart" outlined></Button>
                                            <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template #grid="slotProps">
                    <div class="grid grid-cols-12 gap-4">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 p-2 sm:col-span-6 lg:col-span-4">
                            <div class="flex flex-col p-6 border rounded border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900">
                                <div class="flex justify-center p-4 rounded bg-surface-50">
                                    <div class="relative mx-auto">
                                        <img class="w-full rounded" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" style="max-width: 300px" />
                                        <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
                                    </div>
                                </div>
                                <div class="pt-6">
                                    <div class="flex flex-row items-start justify-between gap-2">
                                        <div>
                                            <span class="text-sm font-medium text-surface-500 dark:text-surface-400">{{ item.category }}</span>
                                            <div class="mt-1 text-lg font-medium">{{ item.name }}</div>
                                        </div>
                                        <div class="p-1 bg-surface-100" style="border-radius: 30px">
                                            <div
                                                class="flex items-center justify-center gap-2 px-2 py-1 bg-surface-0"
                                                style="
                                                    border-radius: 30px;
                                                    box-shadow:
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                "
                                            >
                                                <span class="text-sm font-medium text-surface-900">{{ item.rating }}</span>
                                                <i class="text-yellow-500 pi pi-star-fill"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-6 mt-6">
                                        <span class="text-2xl font-semibold">${{ item.price }}</span>
                                        <div class="flex gap-2">
                                            <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto whitespace-nowrap"></Button>
                                            <Button icon="pi pi-heart" outlined></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>

        <div class="flex flex-col gap-8 lg:flex-row">
            <div class="lg:w-2/3">
                <div class="card">
                    <div class="mb-4 text-xl font-semibold">PickList</div>
                    <PickList v-model="picklistProducts" breakpoint="1400px" dataKey="id">
                        <template #option="{ option }">
                            {{ option.name }}
                        </template>
                    </PickList>
                </div>
            </div>

            <div class="lg:w-1/3">
                <div class="card">
                    <div class="mb-4 text-xl font-semibold">OrderList</div>
                    <OrderList v-model="orderlistProducts" breakpoint="1400px" dataKey="id" pt:pcList:root="w-full">
                        <template #option="{ option }">
                            {{ option.name }}
                        </template>
                    </OrderList>
                </div>
            </div>
        </div>
    </div>
</template>
