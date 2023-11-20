import styled from 'styled-components'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'
import { PiArrowLeft, PiClockClockwise, PiSealCheck } from 'react-icons/pi'
import Tabs, { TabsItems } from '../../shared/Tabs'
import Analysis from './Analysis'
import ApprovedList from './ApprovedList'

type WalletSidebarPanelProps = {
  setIsPanelActive: (value: boolean) => void
}

export default function WalletSidebarPanel({ setIsPanelActive }: WalletSidebarPanelProps) {
  const { t } = useLocaleTranslation()

  const tabsItems: TabsItems[] = [
    {
      key: 'analysis',
      label: `${t('v2.panelProject.sidebar.analysis')}`,
      icon: <AnalysisIcon />,
      children: (
        <TabContainer>
          <Analysis />
        </TabContainer>
      )
    },
    {
      key: 'approved',
      label: `${t('v2.panelProject.sidebar.approved')}`,
      icon: <ApprovedIcon />,
      children: (
        <TabContainer>
          <ApprovedList />
        </TabContainer>
      )
    }
  ]

  const activeTab = 'analysis'

  return (
    <>
      <Header>
        <Button onClick={() => setIsPanelActive(false)}>
          <CloseIcon />
        </Button>
        <h2>{`${t('v2.panelProject.sidebar.title')}`}</h2>
      </Header>
      <Container>
        <Tabs items={tabsItems} defaultActiveKey={activeTab} />
      </Container>
    </>
  )
}

const { Header, CloseIcon, Container, AnalysisIcon, ApprovedIcon, TabContainer, Button } = {
  CloseIcon: styled(PiArrowLeft)`
    font-size: 18px;
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  Button: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }

    &:first-of-type {
      margin-left: auto;
    }
  `,
  Header: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 32px 1fr;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};

    h2 {
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 400;
    }
  `,
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
  `,
  TabContainer: styled.div`
    padding: ${({ theme }) => theme.size[12]};
  `,
  AnalysisIcon: styled(PiClockClockwise)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  ApprovedIcon: styled(PiSealCheck)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `
}
