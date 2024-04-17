import { productStakingList } from '@/config/products/staking'

export default function useProducts() {
  function findProduct(productName: string) {
    return productStakingList.find(product => product.name === productName) || productStakingList[0]
  }

  return { ProductList: productStakingList, findProduct }
}
