import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { PiArrowLeft, PiArrowSquareOut, PiCheckBold } from 'react-icons/pi'
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import styled from 'styled-components'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import { useAccount } from 'wagmi';
import { chainConfigByChainId } from '@/config/chain';
import { capitalize } from '@/services/truncate';
import NetworkIcon from '../shared/NetworkIcon';
import packageData from '../../../package.json'
import { globalConfig } from '@/config/global';

interface WalletSlideBarSettingsProps {
  setIsSettingsActive?: (value: boolean) => void
  showBackButton?: boolean
}


export default function WalletSidebarSettings({ setIsSettingsActive, showBackButton = true }: WalletSlideBarSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoinOpen, setIsCoinOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);

  const { chain } = useAccount()
  if (!chain) {
    return null
  }
  const chainConfig = chainConfigByChainId(chain?.id)


  const { t } = useLocaleTranslation()

  const router = useRouter()
  const { currency, locale } = router.query
  const { setItem } = useLocalStorage()

   const date = new Date()
    const { websiteUrl, auditUrl } = globalConfig
    const documentationUrl = locale ? (locale === 'en' ? globalConfig.docsEn : globalConfig.docsPt) : globalConfig.docsEn

  const changeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  const handleLocaleChange = (locale: string) => {
    changeLocale(locale);
    setIsOpen(false);
  };

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
      <SettingContainer>
        <h3>{t('settings.network')}</h3>
        <Select onClick={() => setIsNetworkOpen(!isNetworkOpen)} className={``}>
          <div>
            <NetworkIcon chain={chain?.id} size={24} />
            <span>{capitalize(chainConfig.name.replaceAll('-', ' '))}</span>
            <CheckedIcon />
          </div>
          {isNetworkOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
        </Select>
      </SettingContainer>

      <FooterContainer>
        <FooterContent>
          <a href={auditUrl} target='_blank'>
            {t('footer.contract')} <PiArrowSquareOut />
          </a>
          <a href={auditUrl} target='_blank'>
            {t('footer.audit')} <PiArrowSquareOut />
          </a>
          <a href={documentationUrl} target='_blank'>
            {t('footer.documentation')} <PiArrowSquareOut />
          </a>
          <a href={`${websiteUrl}`} target='_blank'>
            {t('footer.website')} <PiArrowSquareOut />
          </a>
          <a href={websiteUrl}>{`© ${date.getFullYear()} Stake Together | v${packageData.version} `}</a>
        </FooterContent>
      </FooterContainer>
    </>
  )
}

const { Header, CloseIcon, SettingContainer, Button, CheckedIcon, DropdownMenu, Select, FooterContainer, FooterContent } = {
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
    position: relative;
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
     
      border-radius: ${({ theme }) => theme.size[8]};

      box-shadow: ${({ theme }) => theme.shadow[100]};
      border-radius: ${({ theme }) => theme.size[8]};
      background: ${({ theme }) => theme.colorV2.white};

      border-radius: 8px;
      border: 1px solid var(--gray-50-border, #A0A5AB);

      &:hover {
        color: ${({ theme }) => theme.colorV2.purple[1]};
        background: ${({ theme }) => theme.colorV2.gray[4]};
      }

      &.active {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }

      img {
        box-shadow: ${({ theme }) => theme.shadow[100]};
        border-radius: 100%;
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
    position: absolute;
    z-index: 999;
    top: 90px;
    background-color: white;
    border: 0 !important;
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
  `,
  FooterContainer: styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    padding-bottom: 40px;
    justify-content: flex-end;
  `,
  FooterContent: styled.div`
    a {
      width: 100%;
      text-decoration: none;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      padding: 4px 0;

      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 500;
      color: ${({ theme }) => theme.color.gray[800]};
      opacity: 0.8;

      &:nth-child(5) {
        padding-top: 4px;
        margin-bottom: 8px;
        border-top: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
      }

      &:nth-child(6) {
        border-top: 1px solid ${({ theme }) => theme.colorV2.gray[1]};
        padding-top: 16px;
      }
    }
  `
}
