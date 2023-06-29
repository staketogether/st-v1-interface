import { Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineAreaChart, AiOutlineInfoCircle, AiOutlineUser } from 'react-icons/ai'
import styled from 'styled-components'
import useTranslation from '../../hooks/useTranslation'

interface StakePoolActionsProps {
  onActiveTabChange: (activeTab: 'members' | 'about') => void
}

export default function StakePoolActions({ onActiveTabChange }: StakePoolActionsProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'members' | 'about'>('members')

  useEffect(() => {
    onActiveTabChange(activeTab)
  }, [activeTab, onActiveTabChange])

  return (
    <Container>
      <Tabs>
        <StakeButton
          className={`${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <AiOutlineUser />
          <span>{t('members')}</span>
        </StakeButton>
        <Tooltip title={t('soon')}>
          <StakeButton className={`${activeTab === 'about' ? 'active' : 'disabled'}`}>
            <AiOutlineInfoCircle />
            <span>{t('about')}</span>
          </StakeButton>
        </Tooltip>
        <Tooltip title={t('soon')}>
          <StakeButton className={'disabled'}>
            <AiOutlineAreaChart />
            <span>{t('analytics')}</span>
          </StakeButton>
        </Tooltip>
      </Tabs>
    </Container>
  )
}

const { Container, Tabs, StakeButton } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: auto;
    gap: ${({ theme }) => theme.size[8]};
    margin-bottom: ${({ theme }) => theme.size[12]};
  `,
  Tabs: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
  `,
  StakeButton: styled.button`
    border: none;
    height: 32px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[300]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }

    span {
      display: none;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      span {
        display: block;
      }
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        background-color: ${({ theme }) => theme.color.whiteAlpha[300]};
      }
    }
  `
}
