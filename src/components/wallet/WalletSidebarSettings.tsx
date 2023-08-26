import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'

type WalletSlideBarSettingsProps = {
  setIsSettingsActive: (value: boolean) => void
}

export default function WalletSidebarSettings({ setIsSettingsActive }: WalletSlideBarSettingsProps) {
  const { t } = useLocaleTranslation()
  const router = useRouter()

  const changeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
    setIsSettingsActive(false)
  }

  return (
    <>
      <Header>
        <Button onClick={() => setIsSettingsActive(false)}>
          <CloseIcon />
        </Button>
        <h2>{t('settings.title')}</h2>
      </Header>
      <LocaleContainer>
        <h3>{t('settings.locale')}</h3>
        <div onClick={() => changeLocale('en')} className={`${router.locale === 'en' ? 'active' : ''}`}>
          <span>English</span>
        </div>
        <div onClick={() => changeLocale('pt')} className={`${router.locale === 'pt' ? 'active' : ''}`}>
          <span>Português</span>
        </div>
      </LocaleContainer>
    </>
  )
}

const { Header, CloseIcon, LocaleContainer, Button } = {
  CloseIcon: styled(AiOutlineArrowLeft)`
    font-size: 18px;
    color: ${({ theme }) => theme.color.primary};
    cursor: pointer;
  `,
  Button: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.blackAlpha[200]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
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
  LocaleContainer: styled.div`
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
      gap: ${({ theme }) => theme.size[16]};
      padding: ${({ theme }) => theme.size[16]} ${({ theme }) => theme.size[16]};

      transition: background 0.2s ease;
      font-weight: 400;
      border-radius: ${({ theme }) => theme.size[24]};
      background: ${({ theme }) => theme.color.whiteAlpha[500]};
      &:hover {
        background: ${({ theme }) => theme.color.whiteAlpha[800]};
        box-shadow: ${({ theme }) => theme.shadow[100]};
      }

      &.active {
        background: ${({ theme }) => theme.color.whiteAlpha[900]};
        color: ${({ theme }) => theme.color.primary};
        box-shadow: ${({ theme }) => theme.shadow[100]};
      }
      img {
        box-shadow: ${({ theme }) => theme.shadow[100]};
        border-radius: 100%;
      }
    }
  `
}
