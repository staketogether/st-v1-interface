import { stakingList } from '@/config/products/staking'

export default function useProducts() {
  function findProduct(productName: string) {
    return stakingList.find(product => product.name === productName) || stakingList[0]
  }

  return { ProductList: stakingList, findProduct }
}
