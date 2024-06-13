import { Asset } from '@/types/Asset'
import { useEffect } from 'react'
import { Transak } from '@transak/transak-sdk'

interface AssetsBitcoinRampControlProps {
  asset: Asset
}

const AssetsBitcoinRampControl = ({ asset }: AssetsBitcoinRampControlProps) => {
  const transak = new Transak({
    network: 'mainnet',
    environment: 'STAGING',
    widgetHeight: '550px',
    widgetWidth: '450px',
    apiKey: '68dc9c67-5762-4bae-844e-917744dd627d',
  })

  useEffect(() => {
    transak.init();

    // Cleanup code
    return () => {
      transak.close();
    };
  }, [transak]);

  return (<div>
    teste
  </div>)
}

export default AssetsBitcoinRampControl