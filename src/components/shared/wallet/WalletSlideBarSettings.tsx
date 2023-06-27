import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { styled } from 'styled-components'

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
        <span>{t('settings.title')}</span>
      </Header>
      <LocaleContainer>
        <h1>{t('settings.locale')}</h1>
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
  `,
  LocaleContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    > h1 {
      margin-bottom: ${({ theme }) => theme.size[8]};
    }
    > div {
      color: ${({ theme }) => theme.color.primary};
      cursor: pointer;

      &.active,
      &:hover {
        span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `
}
