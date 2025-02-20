import axios from 'axios'

interface Product {
  id?: number
  title: string
  price: number
}

export const useStore = defineStore('store', () => {
  const state = ref()

  async function fetchData() {
    const response = await axios.get('https://dummyjson.com/products')
    state.value = response.data
  }

  async function addProduct(product: Product) {
    const response = await axios.post('https://dummyjson.com/products/add', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: product.title, price: product.price }),
    })
    console.log(response.data)
  }

  async function updateProduct(product: Product) {
    const response = await axios.put(
      `https://dummyjson.com/products/${product.id}`,
      {
        body: JSON.stringify({ title: product.title, price: product.price }),
      },
    )
  }

  async function deleteProduct(id: number) {
    const response = await axios.delete(`https://dummyjson.com/products/${id}`)
  }

  return {
    state,
    fetchData,
    addProduct,
    updateProduct,
    deleteProduct,
  }
})
