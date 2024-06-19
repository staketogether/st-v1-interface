import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2'
import { PiArrowLeft, PiCheckBold } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

interface WalletSlideBarSettingsProps {
  setIsSettingsActive?: (value: boolean) => void
  showBackButton?: boolean
}

export default function WalletSidebarSettings({ setIsSettingsActive, showBackButton = true }: WalletSlideBarSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCoinOpen, setIsCoinOpen] = useState(false)

  const { t } = useLocaleTranslation()

  const { chain } = useAccount()
  const router = useRouter()
  const { currency } = router.query
  const { setItem } = useLocalStorage()

  const changeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
    setIsOpen(false) // Close the select dropdown after changing the locale
  }

  const changeCurrency = useCallback(
    (newCurrency: string) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, currency: newCurrency }
      })

      setItem('currency', newCurrency)
      setIsCoinOpen(false) // Close the select dropdown after changing the currency
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
        <SelectWrapper>
          <StyledSelect
            value={router.locale}
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)}
            onChange={e => changeLocale(e.target.value)}
          >
            <option value='en'>English</option>
            <option value='pt'>Português</option>
          </StyledSelect>
          <SelectIcon>{isOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}</SelectIcon>
        </SelectWrapper>
      </SettingContainer>
      <SettingContainer>
        <h3>{t('settings.currency')}</h3>
        <SelectWrapper>
          <StyledSelect
            value={currency}
            onClick={() => setIsCoinOpen(!isCoinOpen)}
            onBlur={() => setIsCoinOpen(false)}
            onChange={e => changeCurrency(e.target.value)}
          >
            <option value='usd'>USD</option>
            <option value='eur'>EUR</option>
            <option value='brl'>BRL</option>
          </StyledSelect>
          <SelectIcon>{isCoinOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}</SelectIcon>
        </SelectWrapper>
      </SettingContainer>
    </>
  )
}

const { Header, CloseIcon, SettingContainer, Button, CheckedIcon, SelectWrapper, StyledSelect, SelectIcon, Network } = {
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
  SelectWrapper: styled.div`
    position: relative;
    width: 100%;
  `,
  StyledSelect: styled.select`
    cursor: pointer;
    width: 100%;
    height: 44px;
    padding: 0 0 0 ${({ theme }) => theme.size[16]};
    transition: background 0.2s ease;
    font-weight: 400;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.white};
    outline: 0;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
    appearance: none;

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
      background: ${({ theme }) => theme.colorV2.gray[4]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }
    option {
      background: ${({ theme }) => theme.colorV2.white};
      width: 100%;
    }
  `,
  Network: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[8]} 0px;
  `,
  SelectIcon: styled.div`
    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.size[16]};
    transform: translateY(-50%);
    pointer-events: none;
    color: ${({ theme }) => theme.colorV2.purple[1]};
  `
}
