import styled from 'styled-components'
import Image from 'next/image'
import ethIcon from '@assets/icons/eth-icon.svg'
import gasIcon from '@assets/icons/gas.svg'
import useTranslation from '@/hooks/useTranslation'
import chainConfig from '@/config/chain'
import { capitalize, truncateDecimal } from '@/services/truncate'
import { useNetworkGasPrice } from '@/hooks/useNetworkGasPrice'
import { Tooltip } from 'antd'
import SkeletonLoading from '../icons/SkeletonLoading'

export default function LayoutNetworkInfoButton() {
  const { t } = useTranslation()
  const { networkGasPriceGwei, loading } = useNetworkGasPrice()
  return (
    <NetworkButton>
      <GasContainer>
        <Image src={gasIcon} alt={t('gas.alt')} width={16} height={16} />
        {loading ? (
          <SkeletonLoading height={15} width={25} />
        ) : (
          <span>{truncateDecimal(networkGasPriceGwei.toString(), 0)}</span>
        )}
      </GasContainer>
      <Tooltip trigger='click' title={capitalize(chainConfig().name)}>
        <NetworkContainer>
          <Image src={ethIcon} alt={t('eth.name')} width={24} height={24} />
          <span>{capitalize(chainConfig().name)}</span>
        </NetworkContainer>
      </Tooltip>
    </NetworkButton>
  )
}

const { NetworkButton, GasContainer, NetworkContainer } = {
  NetworkButton: styled.div`
    display: flex;
    align-items: center;
    height: 32px;
    border-radius: 99px;
    background: ${({ theme }) => theme.color.blackAlpha[200]};
    padding: 0px;

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0px;
      padding-left: ${({ theme }) => theme.size[16]};
    }

    span {
      font-size: ${({ theme }) => theme.font.size[15]};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  GasContainer: styled.div`
    display: none;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      color: ${({ theme }) => theme.color.primary};
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
      margin-right: ${({ theme }) => theme.size[12]};
    }
  `,
  NetworkContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    height: 32px;
    border-radius: 99px;
    background: ${({ theme }) => theme.color.blue[50]};
    padding: 0px ${({ theme }) => theme.size[4]};
    span {
      display: none;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0px;
      padding-right: ${({ theme }) => theme.size[16]};
      padding-left: ${({ theme }) => theme.size[8]};
      span {
        display: block;
      }
    }
  `
}
