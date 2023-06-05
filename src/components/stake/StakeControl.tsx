import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import useTranslation from '../../hooks/useTranslation'
import { Pool } from '../../types/Pool'
import LayoutHead from '../shared/layout/LayoutHead'
import { StakeForm } from './StakeForm'
import { StakeFormEmpty } from './StakeFormEmpty'
import StakeStats from './StakeStats'
import StakeSwitchActions from './StakeSwitchAction'

interface StakeControlProps {
  pool?: Pool
  type: 'deposit' | 'withdraw'
}

export default function StakeControl({ pool, type }: StakeControlProps) {
  const { account } = useConnectedAccount()
  const hasAccountAndPool = account && pool?.address
  const { t } = useTranslation()

  return (
    <Container>
      <Form>
        <StakeSwitchActions poolAddress={pool?.address} />
        {hasAccountAndPool && (
          <StakeForm type={type} accountAddress={account} poolAddress={pool.address} />
        )}
        {!hasAccountAndPool && (
          <StakeFormEmpty type={type} accountAddress={account} poolAddress={pool?.address} />
        )}
      </Form>
      <Title>
        <LayoutHead text={t('titles.poolStats')} />
      </Title>
      <StakeStats pool={pool} />
    </Container>
  )
}

const { Container, Form, Title } = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
  `,
  Form: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, 420px);
    padding: ${({ theme }) => theme.size[24]};
    gap: ${({ theme }) => theme.size[24]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `,
  Title: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 ${({ theme }) => theme.size[24]};
    padding-top: ${({ theme }) => theme.size[8]};
    padding-bottom: ${({ theme }) => theme.size[8]};
    gap: ${({ theme }) => theme.size[8]};
  `
}
