import { productList } from '@/config/product-staking'
import { ProductStakingName } from '@/types/ProductStaking'

export default function useProducts() {
  function findProduct(productName: ProductStakingName) {
    return productList.find(product => product.name === productName) || productList[0]
  }

  return { ProductList: productList, findProduct }
}
