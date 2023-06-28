import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import styled from 'styled-components'

type WalletSlideBarSettingsProps = {
  setIsSettingsActive: (value: boolean) => void
}

export default function WalletSlideBarSettings({ setIsSettingsActive }: WalletSlideBarSettingsProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const changeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <>
      <Header>
        <CloseIcon onClick={() => setIsSettingsActive(false)} />
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

const { Header, CloseIcon, LocaleContainer } = {
  CloseIcon: styled(AiOutlineArrowLeft)`
    font-size: 18px;
    color: ${({ theme }) => theme.color.primary};
    cursor: pointer;
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    padding-top: ${({ theme }) => theme.size[8]};

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
      gap: ${({ theme }) => theme.size[16]};
      padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
      transition: background 0.2s ease;
      font-weight: 400;
      border-radius: ${({ theme }) => theme.size[12]};
      &:hover {
        background: ${({ theme }) => theme.color.whiteAlpha[900]};
      }

      img {
        box-shadow: ${({ theme }) => theme.shadow[100]};
        border-radius: 100%;
      }
    }
  `
}
