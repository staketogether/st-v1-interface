import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

type LayoutTitleProps = {
  title: string
  description?: string
  className?: string
  isStakeTogetherPool?: boolean
}

export default function LayoutTitle({ title, description, className, isStakeTogetherPool }: LayoutTitleProps) {
  const { t } = useLocaleTranslation()
  const stakeTogetherPoolDescription = t('v2.pages.deposit.stakeTogetherPoolDescription')
  const { query } = useRouter()
  const { currency, network } = query
  return (
    <Container className={className}>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {isStakeTogetherPool && (
        <Description>
          {`${stakeTogetherPoolDescription}`}{' '}
          <Link href={`/${network}/${currency}/project`}>{t('v2.pages.deposit.here')}</Link>
        </Description>
      )}
    </Container>
  )
}

const Container = styled.header`
  display: grid;
  align-items: center;
  gap: ${({ theme }) => theme.size[8]};
  width: 100%;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colorV2.blue[1]};
  font-size: ${({ theme }) => theme.font.size[22]};
  font-weight: 500;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colorV2.gray[1]};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  a {
    color: ${({ theme }) => theme.colorV2.purple[1]};
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
`
