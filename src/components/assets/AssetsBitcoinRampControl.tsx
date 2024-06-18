import { Asset } from '@/types/Asset'
import { useEffect, useState } from 'react'
import { Transak } from '@transak/transak-sdk'
import useBtcConnectWallet from '@/hooks/btc-wallet/useBtcConnectWallet'
import { AddressPurpose } from 'sats-connect'
import { useRouter } from 'next/router'
import useBuyRamp, { BuyRampRequest } from '@/hooks/ramp/useBuyRamp'
import useSellToken from '@/hooks/ramp/useSellToken'
import { RampProviderType } from '@/types/rampProviderType'

interface AssetsBitcoinRampControlProps {
  asset: Asset,
  type: 'buy' | 'sell'
}



const AssetsBitcoinRampControl = ({ asset, type }: AssetsBitcoinRampControlProps) => {
  const [buyData, setBuyData] = useState<BuyRampRequest | undefined>(undefined)
  const [amountToSell, setAmountToSell] = useState<number | undefined>(undefined)
  const [transakWidget, setTransakWidget] = useState<Transak | undefined>(undefined)

  const { btcWalletAddress } = useBtcConnectWallet()
  const { query } = useRouter()
  const { buyRampResponse} = useBuyRamp('transak', buyData)
  const { mutate } = useSellToken({
    fromChain: asset.chains[0],
    provider: RampProviderType.transak,
    fromToken: asset.symbol,
    walletAddress: `${btcWalletAddress.find((address) => address.purpose === AddressPurpose.Ordinals)?.address}`,
    pixKey: 'pixKey',
    amount: amountToSell
  })

  useEffect(() => {
    if (transakWidget === undefined) {
      setTransakWidget(new Transak({
        containerId: 'transak_widget',
        network: 'mainnet',
        environment: Transak.ENVIRONMENTS.STAGING,
        productsAvailed: type.toUpperCase(),
        disableWalletAddressForm: true,
        colorMode: 'LIGHT',
        hideMenu: true,
        widgetWidth: '450px',
        defaultFiatCurrency: query.currency as string,
        apiKey: '68dc9c67-5762-4bae-844e-917744dd627d',
        walletAddress: btcWalletAddress.find((address) => address.purpose === AddressPurpose.Ordinals)?.address,
      }))

      return
    }

    transakWidget?.init();
    transakWidget?.getUser()

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
      transakWidget?.close();
    });

    // Cleanup code
    return () => {
      transakWidget?.cleanup();
      transakWidget?.close();
    };
  }, [transakWidget, btcWalletAddress, query.currency, type]);

  return (<div id='transak_widget' style={{ height: '450px' }} />)
}

export default AssetsBitcoinRampControl