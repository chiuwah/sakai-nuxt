interface Product {
  id?: number
  title: string
  price: number
}

export const useStore = defineStore('store', () => {
  const state = ref()

  async function fetchData() {
    const response = await fetch('https://dummyjson.com/products')
    state.value = await response.json()
  }

  async function addProduct(product: Product) {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      body: JSON.stringify({ title: product.title, price: product.price }),
    })
  }

  async function updateProduct(product: Product) {
    const response = await fetch(
      `https://dummyjson.com/products/${product.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ title: product.title, price: product.price }),
      },
    )
  }

  async function deleteProduct(id: number) {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    state,
    fetchData,
    addProduct,
    updateProduct,
    deleteProduct,
  }
})
