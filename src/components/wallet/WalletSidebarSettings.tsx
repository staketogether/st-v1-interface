import { useRouter } from 'next/router'
import { useCallback, useState, useEffect } from 'react'
import { PiArrowLeft, PiCheckBold } from 'react-icons/pi'
import styled from 'styled-components'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2'
import { capitalize } from '@/services/truncate'
import NetworkIcon from '../shared/NetworkIcon'
import { useAccount } from 'wagmi'
import { chainConfigByChainId, ChainConfig } from '@/config/chain'

interface WalletSlideBarSettingsProps {
  setIsSettingsActive?: (value: boolean) => void
  showBackButton?: boolean
}

export default function WalletSidebarSettings({ setIsSettingsActive, showBackButton = true }: WalletSlideBarSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoinOpen, setIsCoinOpen] = useState(false);
  const [chainConfig, setChainConfig] = useState<ChainConfig | undefined>(undefined);
  const { t } = useLocaleTranslation()

  const { chain } = useAccount()
  const router = useRouter()
  const { currency } = router.query
  const { setItem } = useLocalStorage()

  useEffect(() => {
    if (chain?.id) {
      const config = chainConfigByChainId(chain.id)
      setChainConfig(config)
    } else {
      setChainConfig(undefined)
    }
  }, [chain])

  const changeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  const changeCurrency = useCallback(
    (newCurrency: string) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, currency: newCurrency }
      })

      setItem('currency', newCurrency)
      setIsOpen(false);
      setIsCoinOpen(false);
    },
    [router, setItem]
  )

  return (
    <>
      <Header>
        {showBackButton && (
          <Button onClick={() => setIsSettingsActive && setIsSettingsActive(false)}>
            <CloseIcon />
          </Button>
        )}
        <h2>{t('settings.title')}</h2>
      </Header>
      <SettingContainer>
        <h3>{t('settings.locale')}</h3>
        <Select onClick={() => setIsOpen(!isOpen)} className="">
          <span>{router.locale === 'en' ? 'English' : 'Português'}</span>
          {isOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
        </Select>
        {isOpen && (
          <DropdownMenu>
            <Select onClick={() => changeLocale('en')} className={`${router.locale === 'en' ? 'active' : ''}`}>
              <span>English</span>
              {router.locale === 'en' && <CheckedIcon />}
            </Select>
            <Select onClick={() => changeLocale('pt')} className={`${router.locale === 'pt' ? 'active' : ''}`}>
              <span>Português</span>
              {router.locale === 'pt' && <CheckedIcon />}
            </Select>
          </DropdownMenu>
        )}
      </SettingContainer>
      <SettingContainer>
        <h3>{t('settings.currency')}</h3>
        <Select onClick={() => setIsCoinOpen(!isCoinOpen)} className={``}>
          <span>{currency?.toString().toLocaleUpperCase()}</span>
          {isCoinOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
        </Select>

        {isCoinOpen && (
          <DropdownMenu>
            <Select onClick={() => changeCurrency('usd')} className={`${currency === 'usd' ? 'active' : ''}`}>
              <span>USD</span>
              {currency === 'usd' && <CheckedIcon />}
            </Select>
            <Select onClick={() => changeCurrency('eur')} className={`${currency === 'eur' ? 'active' : ''}`}>
              <span>EUR</span>
              {currency === 'eur' && <CheckedIcon />}
            </Select>
            <Select onClick={() => changeCurrency('brl')} className={`${currency === 'brl' ? 'active' : ''}`}>
              <span>BRL</span>
              {currency === 'brl' && <CheckedIcon />}
            </Select>
          </DropdownMenu>
        )}
      </SettingContainer>
      {chainConfig && (
        <SettingContainer>
          <h3>{t('settings.network')}</h3>
          <Select className={``}>
            <div>
              <NetworkIcon chain={chain?.id} size={24} />
              <span>{capitalize(chainConfig.name.replaceAll('-', ' '))}</span>
              <CheckedIcon />
            </div>
          </Select>
        </SettingContainer>
      )}
    </>
  )
}

const { Header, CloseIcon, SettingContainer, Button, CheckedIcon, DropdownMenu, Select } = {
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
    min-height: 32px;
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
  CheckedIcon: styled(PiCheckBold)`
    color: ${({ theme }) => theme.colorV2.purple[1]};
    font-size: ${({ theme }) => theme.font.size[12]};
  `,
  SettingContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    h3 {
      font-weight: 400;
      font-size: ${({ theme }) => theme.font.size[15]};
      margin-top: 4px;
      margin-bottom: 4px;
    }
  `,
  Select: styled.div`
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      gap: ${({ theme }) => theme.size[8]};
      padding: ${({ theme }) => theme.size[16]} ${({ theme }) => theme.size[16]};
      transition: background 0.2s ease;
      font-weight: 400;
     
      border-radius: ${({ theme }) => theme.size[8]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
      background: ${({ theme }) => theme.colorV2.white};
      border: 1px solid var(--gray-50-border, #A0A5AB);
      &:hover {
        color: ${({ theme }) => theme.colorV2.purple[1]};
        background: ${({ theme }) => theme.colorV2.gray[4]};
        box-shadow: ${({ theme }) => theme.shadow[100]};
      }
      div {
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
        display: flex;
      }
  `,
  DropdownMenu: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    background-color: ${({ theme }) => theme.colorV2.white};
    border: 1px solid ${({ theme }) => theme.colorV2.white};
    div {
      width: 100%;
      display: flex;
      align-items: center;
      height: 44px;
      gap: ${({ theme }) => theme.size[8]};
      padding: ${({ theme }) => theme.size[16]} ${({ theme }) => theme.size[16]};
      background: ${({ theme }) => theme.colorV2.white};
      border-radius: ${({ theme }) => theme.size[8]};
    }
  `
}