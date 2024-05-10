import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useForm } from 'react-hook-form'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import { encodeFunctionData, erc20Abi } from 'viem'
import Button from '../shared/Button'
import Input from '../shared/inputs/Input'

import { ethers, parseEther } from 'ethers'

import { Asset } from '@/types/Asset'
import { useSendTransaction } from 'wagmi'
import AssetInput from './AssetsInput'
import { useState } from 'react'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useBalanceOf from '@/hooks/contracts/useBalanceOf'

interface AssetSendProps {
  walletTo: string
}

export function AssetsSend({ asset }: { asset: Asset }) {
  const [sendAmount, setSendAmount] = useState<string>('0')

  const { t } = useLocaleTranslation()
  const { account } = useConnectedAccount()
  const { isLoading, tokenBalance } = useBalanceOf({ asset, walletAddress: account })

  const { data: hash, sendTransaction } = useSendTransaction()
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<AssetSendProps>()

  const onSubmit = (data: AssetSendProps) => {
    const [chain] = asset.chains

    const to = data.walletTo as `0x${string}`
    if (asset.type === 'native') {
      sendTransaction({ to, value: parseEther(sendAmount), chainId: chain })
      return
    }
    const transferTxData = encodeFunctionData({
      abi: erc20Abi,
      args: [to, ethers.parseUnits(sendAmount, asset.decimals)],
      functionName: 'transfer'
    })
    sendTransaction({
      to,
      data: transferTxData
    })
  }

  const handleChange = (v: string) => {
    if (v.includes(',')) {
      v = v.replace(',', '.')
    }
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!v || regex.test(v)) {
      if (v.length > 19 + v.split('.')[0].length) return

      setSendAmount(v)
    }
  }
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id='assetSendForm'>
      <div>
        <Input
          title={'Endereço de destino'}
          disabled={false}
          disabledLabel={false}
          register={register('walletTo', {
            required: `${t('v2.createProject.formMessages.required')}`
          })}
          maxLength={64}
          error={errors.walletTo?.message}
          placeholder={'0x'}
        />
        <AssetInput
          ethAmountValue={sendAmount}
          onChange={v => {
            handleChange(v)
          }}
          onMaxFunction={() => setSendAmount(tokenBalance.balance)}
          productAsset={asset}
          hasError={false}
          balance={tokenBalance.balance}
          balanceLoading={isLoading}
          accountIsConnected={!!account}
        />
      </div>
      <Button form='assetSendForm' type='submit' label={t('next')} icon={<PiArrowRight />} disabled={false} />
    </FormContainer>
  )
}

const { FormContainer } = {
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
    max-height: 450px;
    max-width: 420px;
  `
}
