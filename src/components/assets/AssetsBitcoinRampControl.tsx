import { Asset } from '@/types/Asset'
import { useEffect } from 'react'
import { Transak } from '@transak/transak-sdk'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useBtcConnectWallet from '@/hooks/btc-wallet/useBtcConnectWallet'
import { AddressPurpose } from 'sats-connect'
import { useRouter } from 'next/router'

interface AssetsBitcoinRampControlProps {
  asset: Asset
}

const AssetsBitcoinRampControl = ({ asset }: AssetsBitcoinRampControlProps) => {
  const { btcWalletAddress } = useBtcConnectWallet()
  const { query } = useRouter()

  const transak = new Transak({
    network: 'mainnet',
    environment: 'STAGING',
    widgetHeight: '550px',
    widgetWidth: '450px',
    defaultFiatCurrency: query.currency as string,
    apiKey: '68dc9c67-5762-4bae-844e-917744dd627d',
    walletAddress: btcWalletAddress.find((address) => address.purpose === AddressPurpose.Ordinals)?.address,
  })

  // To get all the events
  Transak.on('*', (data) => {
    console.log(data);
  });

// This will trigger when the user closed the widget
  Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
    console.log('Transak SDK closed!');
  });

  /*
  * This will trigger when the user has confirmed the order
  * This doesn't guarantee that payment has completed in all scenarios
  * If you want to close/navigate away, use the TRANSAK_ORDER_SUCCESSFUL event
  */
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
    console.log('OrderData:');
    console.log(orderData);
  });

  /*
  * This will trigger when the user marks payment is made
  * You can close/navigate away at this event
  */
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log('Successful order: ');
    console.log(orderData);
    transak.close();
  });

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