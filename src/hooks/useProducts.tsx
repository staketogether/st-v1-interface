import { productList } from '@/config/product'
import { StakingProduct } from '@/types/Product'

export default function useProducts() {
  function findProduct(productName: StakingProduct) {
    return productList.find(product => product.name === productName) || productList[0]
  }

  return { ProductList: productList, findProduct }
}
