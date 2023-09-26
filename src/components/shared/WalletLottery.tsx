import { queryDelegationsPool } from '@/queries/subgraph/queryDelegationsPool'
import { PoolSubgraph } from '@/types/Pool'
import { useQuery } from '@apollo/client'

import React, { useState } from 'react'
import { PiGift } from 'react-icons/pi'
import styled from 'styled-components'
import Button from './Button'
import { truncateAddress } from '@/services/truncate'
import { FiCopy } from 'react-icons/fi'
import EnsAvatar from './ens/EnsAvatar'
import EnsName from './ens/EnsName'
import { notification } from 'antd'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Loading from './icons/Loading'

type WalletLotteryProps = { poolAddress: `0x${string}` }

export default function WalletLottery({ poolAddress }: WalletLotteryProps) {
  const [starterDraw, setStarterDraw] = useState(false)
  const [finishedDraw, setFinishedDraw] = useState(false)
  const [result, setResult] = useState<`0x${string}` | null>(null)

  const { t } = useLocaleTranslation()

  const { data } = useQuery<{ pool: PoolSubgraph }>(queryDelegationsPool, {
    variables: {
      id: poolAddress
    },
    fetchPolicy: 'no-cache'
  })

  const startDraw = () => {
    if (data && data.pool && data.pool.delegations.length) {
      setStarterDraw(true)
      setFinishedDraw(false)
      const duration = 5000
      const interval = 100
      const steps = duration / interval

      let counter = 0
      const drawInterval = setInterval(() => {
        const item =
          data.pool.delegations[Math.floor(Math.random() * data.pool.delegations.length)]?.delegate?.address
        setResult(item)
        counter++
        if (counter >= steps) {
          setFinishedDraw(true)
          setStarterDraw(false)
          clearInterval(drawInterval)
        }
      }, interval)
    }
  }

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value)
    notification.success({
      message: `${t('addressCopiedToClipboard')}`,
      placement: 'topRight'
    })
  }

  return (
    <Container>
      {!starterDraw && !finishedDraw ? (
        <Button
          label={t('v2.draw.performDrawing')}
          onClick={() => startDraw()}
          icon={<GiftsIcon />}
          isLoading={false}
        />
      ) : (
        <>
          {finishedDraw && (
            <CloseButton
              onClick={() => {
                setStarterDraw(false)
                setFinishedDraw(false)
              }}
            >
              <span>x</span>
            </CloseButton>
          )}
          <div>
            <ResultContainer>
              {starterDraw ? (
                <div>
                  <LoadingIcon size={60} />
                  <h2>{t('v2.draw.drawing')}</h2>
                </div>
              ) : (
                <GiftsIcon size={60} className='green' />
              )}
              <span>
                {!finishedDraw && result && truncateAddress(result)}
                {finishedDraw && result && (
                  <Result>
                    <h2>{t('v2.draw.result')}</h2>
                    <div>
                      <EnsAvatar address={result} size={18} />
                      <EnsName address={result} />
                      <CopyIcon onClick={() => copyToClipboard(result)} />
                    </div>
                  </Result>
                )}
              </span>
            </ResultContainer>
            {finishedDraw && (
              <Button
                label={t('v2.draw.conductANewDraw')}
                onClick={() => startDraw()}
                icon={<GiftsIcon />}
                isLoading={false}
              />
            )}
          </div>
        </>
      )}
    </Container>
  )
}

const { Container, GiftsIcon, ResultContainer, CopyIcon, Result, LoadingIcon, CloseButton } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
    padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]};

    font-size: ${({ theme }) => theme.font.size[14]};

    position: relative;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${({ theme }) => theme.size[24]};
    }

    h2 {
      font-size: ${({ theme }) => theme.font.size[18]};
      color: ${({ theme }) => theme.colorV2.blue[1]};
    }

    span {
      font-size: ${({ theme }) => theme.font.size[16]};
      color: ${({ theme }) => theme.colorV2.gray[1]};

      display: flex;
      align-items: center;
      gap: 4px;
    }
  `,
  ResultContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
  `,
  Result: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    > div {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `,
  GiftsIcon: styled(PiGift)`
    font-size: ${({ theme }) => theme.size[24]};
    &.green {
      color: ${({ theme }) => theme.color.green[500]};
      margin: 0 auto;
    }
  `,
  CopyIcon: styled(FiCopy)`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  LoadingIcon: styled(Loading)`
    color: ${({ theme }) => theme.colorV2.blue[1]};
    margin: 0 auto;
  `,
  CloseButton: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[600]};
    transition: background 0.2s ease;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 10px;
    top: 10px;

    span {
      font-size: ${({ theme }) => theme.font.size[18]};
      color: ${({ theme }) => theme.colorV2.blue[1]};
      margin-bottom: 3px;
      font-weight: 100;
    }
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `
}
