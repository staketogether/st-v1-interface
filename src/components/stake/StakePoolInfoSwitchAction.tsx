import useTranslation from '../../hooks/useTranslation'
import styled from 'styled-components'
import { AiOutlineAreaChart, AiOutlineInfoCircle, AiOutlineUser } from 'react-icons/ai'
import { Tooltip } from 'antd'

interface StakePoolInfoSwitchActionProps {
  activeTab: 'members' | 'about'
  setActiveTab: (value: 'members' | 'about') => void
}

export default function StakePoolInfoSwitchAction({ setActiveTab, activeTab }: StakePoolInfoSwitchActionProps) {
  const { t } = useTranslation()
  const handleActiveTab = (value: 'members' | 'about') => {
    return value === activeTab
  }
  return (
    <TabsContainer>
      <TabItem className={`${handleActiveTab('about') ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
        <AboutIcon />
        {t('about')}
      </TabItem>
      <TabItem
        className={`${handleActiveTab('members') ? 'active' : ''} `}
        onClick={() => setActiveTab('members')}
      >
        <MembersIcon />
        {t('members')}
      </TabItem>
      <Tooltip title={t('soon')}>
        <TabItem className='disabled'>
          <AnalyticsIcon />
          {t('analytics')}
        </TabItem>
      </Tooltip>
    </TabsContainer>
  )
}

const { TabsContainer, TabItem, AboutIcon, MembersIcon, AnalyticsIcon } = {
  TabsContainer: styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.color.blue[50]};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[32]};
    padding: 0px ${({ theme }) => theme.size[24]};
  `,
  TabItem: styled.div`
    cursor: pointer;

    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;

    font-size: ${({ theme }) => theme.font.size[14]};
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: ${({ theme }) => theme.size[12]} 0px;
    color: ${({ theme }) => theme.color.blackAlpha[500]};

    &.active {
      border-bottom: 3px solid ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.primary};
    }

    &.disabled {
      cursor: not-allowed;
    }
  `,
  AboutIcon: styled(AiOutlineInfoCircle)`
    font-size: 16px;
  `,
  MembersIcon: styled(AiOutlineUser)`
    font-size: 16px;
  `,
  AnalyticsIcon: styled(AiOutlineAreaChart)`
    font-size: 16px;
  `
}
