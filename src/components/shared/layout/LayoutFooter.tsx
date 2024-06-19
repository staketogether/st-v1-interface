import { useRouter } from 'next/router'
import styled from 'styled-components'
import { globalConfig } from '../../../config/global'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'

export default function LayoutFooter() {
  const date = new Date()
  const { websiteUrl } = globalConfig

  const { t } = useLocaleTranslation()

  const { query } = useRouter()
  const { currency, network } = query

  const commitHash = process.env.COMMIT_HASH ?? ''
  const shortCommitHash = commitHash.substring(0, 5)

  return (
    <Container>
      <div>
        <span>{`${shortCommitHash}`}</span>
      </div>
      <div>
        <a href={`mailto:support@staketogether.org`} target='_blank'>
          {t('footer.support')}
        </a>
        <a href={`/${currency as string}/${network as string}/project`} target='_blank'>
          {t('footer.projects')}
        </a>
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
      > a,
      span {
        &::after {
          content: '|';
          margin-left: ${({ theme }) => theme.size[16]};
        }
      }

      > span:last-of-type {
        &::after {
          content: '';
          margin-right: ${({ theme }) => theme.size[16]};
        }
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
