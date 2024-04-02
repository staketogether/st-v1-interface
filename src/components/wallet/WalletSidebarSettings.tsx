import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { PiArrowLeft, PiCheckBold } from 'react-icons/pi'
import styled from 'styled-components'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

type WalletSlideBarSettingsProps = {
  setIsSettingsActive?: (value: boolean) => void
  showBackButton?: boolean
}

export default function WalletSidebarSettings({
  setIsSettingsActive,
  showBackButton = true
}: WalletSlideBarSettingsProps) {
  const { t } = useLocaleTranslation()

  const router = useRouter()
  const { currency } = router.query
  const { setItem } = useLocalStorage()

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
        <div onClick={() => changeLocale('en')} className={`${router.locale === 'en' ? 'active' : ''}`}>
          <span>English</span>
          {router.locale === 'en' && <CheckedIcon />}
        </div>
        <div onClick={() => changeLocale('pt')} className={`${router.locale === 'pt' ? 'active' : ''}`}>
          <span>Português</span>
          {router.locale === 'pt' && <CheckedIcon />}
        </div>
      </SettingContainer>
      <SettingContainer>
        <h3>{t('settings.currency')}</h3>
        <div onClick={() => changeCurrency('usd')} className={`${currency === 'usd' ? 'active' : ''}`}>
          <span>USD</span>
          {currency === 'usd' && <CheckedIcon />}
        </div>
        <div onClick={() => changeCurrency('eur')} className={`${currency === 'eur' ? 'active' : ''}`}>
          <span>EUR</span>
          {currency === 'eur' && <CheckedIcon />}
        </div>
        <div onClick={() => changeCurrency('brl')} className={`${currency === 'brl' ? 'active' : ''}`}>
          <span>BRL</span>
          {currency === 'brl' && <CheckedIcon />}
        </div>
      </SettingContainer>
    </>
  )
}

const { Header, CloseIcon, SettingContainer, Button, CheckedIcon } = {
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

    div {
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      height: 44px;
      gap: ${({ theme }) => theme.size[8]};
      padding: ${({ theme }) => theme.size[16]} ${({ theme }) => theme.size[16]};

      transition: background 0.2s ease;
      font-weight: 400;
      border-radius: ${({ theme }) => theme.size[8]};

      box-shadow: ${({ theme }) => theme.shadow[100]};
      border-radius: ${({ theme }) => theme.size[8]};
      background: ${({ theme }) => theme.colorV2.white};

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
    }
  `
}
