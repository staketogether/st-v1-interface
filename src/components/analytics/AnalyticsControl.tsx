import React from 'react'
import styled from 'styled-components'
import LayoutTitle from '../shared/layout/LayoutTitle'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

export default function AnalyticsControl() {
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <LayoutTitle title={t('v2.pages.analytics.title')} description={''} />
      <Content>
        <h2>Geral</h2>
        <div>
          <Card>
            <header>
              <span>Ethereum Price</span>
              <span className='blue'>$2,323.50</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>TVL</span>
              <span className='purple'>154,586987 ETH</span>
              <span>$325,983.29</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>APR</span>
              <span className='green'>5%</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>Carteiras Únicas</span>
              <span>152</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>Números de Depósitos</span>
              <span>212</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>Números de Saques</span>
              <span>12</span>
            </header>
          </Card>
        </div>
      </Content>
      <Content>
        <h2>Recompensas</h2>
        <div className='rewards'>
          <Card>
            <header>
              <span>Staking de Ethereum</span>
              <span className='green'>154,586987 ETH</span>
              <span>$4,583.29</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>Projetos</span>
              <span className='purple'>154,586987 ETH</span>
              <span>$38 projetos</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>Incentivos</span>
              <span className='blue'>154,586987 ETH</span>
              <span>$4,583.29</span>
            </header>
          </Card>
        </div>
      </Content>
      <Content>
        <h2>Proof of Reserves</h2>
        <div className='proofOfReserves'>
          <Card>
            <header>
              <span>Contratos</span>
              <span className='green'>30 ETH</span>
              <span>$64,750.52</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>Validadores</span>
              <span className='purple'>70 ETH</span>
              <span>$64,750.52</span>
            </header>
          </Card>
        </div>
      </Content>
    </Container>
  )
}

const { Container, Content, Card } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    > h2 {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: 20px;
      font-weight: 400;
    }

    > div {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: ${({ theme }) => theme.size[24]};

      &.rewards {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
      }

      &.proofOfReserves {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
      }
    }
  `,
  Card: styled.div`
    padding: ${({ theme }) => theme.size[12]};
    width: 100%;
    height: 160px;

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    display: flex;
    flex-direction: column;

    > header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};

      span {
        font-size: 15px;
        font-style: normal;
        color: ${({ theme }) => theme.colorV2.gray[1]};
        &:nth-child(2) {
          font-size: 22px;
        }
        &:nth-child(3) {
          font-size: 13px;
        }

        &.blue {
          color: ${({ theme }) => theme.colorV2.blue[3]};
        }

        &.green {
          color: ${({ theme }) => theme.color.green[500]};
        }

        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
    }
  `
}
