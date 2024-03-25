import chainConfig from '@/config/chain'
import styled from 'styled-components'
import packageData from '../../../../package.json'
import { globalConfig } from '../../../config/global'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'
import { useRouter } from 'next/router'
import { getContractsByProductName } from '@/config/product'

export default function LayoutFooter() {
  const date = new Date()
  const { blockExplorer, isTestnet } = chainConfig()
  const { StakeTogether } = getContractsByProductName({ productName: 'ethereum-stake', isTestnet })
  const { websiteUrl, auditUrl } = globalConfig
  const router = useRouter()

  const { t } = useLocaleTranslation()
  const documentationUrl = router.locale
    ? router.locale === 'en'
      ? globalConfig.docsEn
      : globalConfig.docsPt
    : globalConfig.docsEn

  return (
    <Container>
      <div>
        <div>
          <span>{`v${packageData.version}`}</span>
        </div>
        <span>
          <a href={`${blockExplorer.baseUrl}/address/${StakeTogether}`} target='_blank'>
            {t('footer.smartContract')}
          </a>
        </span>
        <span>
          <a href={auditUrl} target='_blank'>
            {t('footer.audit')}
          </a>
        </span>
        <span>
          <a href={documentationUrl} target='_blank'>
            {t('footer.documentation')}
          </a>
        </span>
      </div>
      <div>
        {/* <a href={`${appUrl}/${i18n.language}`} target='_blank'>
          {t('footer.app')}
        </a> */}
        <a href={`${websiteUrl}`} target='_blank'>
          {t('footer.website')}
        </a>
        <span>{`© ${date.getFullYear()} Stake Together `}</span>
      </div>
    </Container>
  )
}
const { Container } = {
  Container: styled.div`
    width: 100%;
    gap: ${({ theme }) => theme.size[8]};
    display: none;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colorV2.blue[2]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: 11px 24px;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 16px 24px;
      display: flex;
    }

    flex-direction: column;

    > div:nth-child(2) {
      display: none;
    }

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[16]};
      > span {
        &::before {
          content: '|';
          margin-right: ${({ theme }) => theme.size[16]};
        }
      }

      > a:last-of-type {
        /* &::before {
          content: '|';
          margin-right: ${({ theme }) => theme.size[16]};
        } */
      }
    }

    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.white};
    }

    a {
      text-decoration: none;
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.white};

      &:hover {
        color: ${({ theme }) => theme.colorV2.purple[2]};
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      flex-direction: row;
      gap: ${({ theme }) => theme.size[16]};

      > div:nth-child(2) {
        display: flex;
      }
    }
  `
}
