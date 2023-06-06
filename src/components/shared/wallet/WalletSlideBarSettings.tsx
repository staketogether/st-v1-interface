import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import styled from 'styled-components'

type WalletSlideBarSettingsProps = {
  setIsSettingsActive: (value: boolean) => void
}

export default function WalletSlideBarSettings({ setIsSettingsActive }: WalletSlideBarSettingsProps) {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <>
      <Header>
        <CloseIcon onClick={() => setIsSettingsActive(false)} />
        <span>{t('settings.title')}</span>
      </Header>
      <LocaleContainer>
        <h1>{t('settings.locale')}</h1>
        <Link href='' className={`${router.locale === 'pt' ? 'active' : ''}`} locale='pt'>
          <span>Português</span>
        </Link>
        <Link href='' locale='en' className={`${router.locale === 'en' ? 'active' : ''}`}>
          <span>English</span>
        </Link>
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
  `,
  LocaleContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    > h1 {
      margin-bottom: ${({ theme }) => theme.size[8]};
    }
    a {
      color: ${({ theme }) => theme.color.primary};
      &hover,
      &.active {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `
}
