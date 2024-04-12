import { productStakingList } from '@/config/product-staking'
import { ProductStakingName } from '@/types/ProductStaking'

export default function useProducts() {
  function findProduct(productName: ProductStakingName) {
    return productStakingList.find(product => product.name === productName) || productStakingList[0]
  }

  return { ProductList: productStakingList, findProduct }
}
