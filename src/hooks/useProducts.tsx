import { handleProductConfig } from '@/config/product'
import { StakingProduct } from '@/types/Product'
import { useRouter } from 'next/router'

export default function useProducts() {
  const { query } = useRouter()
  const { currency, network } = query as { currency: string; network: string }

  const productsList = handleProductConfig(network, currency)

  function findProduct(productName: StakingProduct) {
    return productsList.find(product => product.name === productName) || productsList[0]
  }

  return { productsList, findProduct }
}
