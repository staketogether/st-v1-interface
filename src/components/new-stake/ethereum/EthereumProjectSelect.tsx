import CommunityLogo from '@/components/shared/community/CommunityLogo'
import CommunityName from '@/components/shared/community/CommunityName'
import useContentfulProjectListByStatus from '@/hooks/contentful/useContentfulProjectListByStatus'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Select, Switch, Tooltip } from 'antd'
import { PiQuestion } from 'react-icons/pi'
import styled from 'styled-components'

type EthereumProjectSelectProps = {
  isActivatedDelegation: boolean
  onChange: (checked: boolean) => void
  poolDelegatedSelected: `0x${string}`
  handleDelegationChange: (value: `0x${string}`) => void
}

export default function EthereumProjectSelect({
  isActivatedDelegation,
  onChange,
  poolDelegatedSelected,
  handleDelegationChange
}: EthereumProjectSelectProps) {
  const { t } = useLocaleTranslation()
  const { projectList, initialLoading } = useContentfulProjectListByStatus({
    status: 'approved',
    pagination: { first: 100, skip: 0 }
  })
  const projectListMapped = projectList.map(project => ({
    value: project.wallet,
    label: (
      <SelectOption>
        <CommunityLogo src={project.logo.url} alt={project.logo.fileName} loading={initialLoading} />
        <CommunityName name={project.name} loading={initialLoading} />
      </SelectOption>
    )
  }))

  return (
    <Container>
      <div>
        <span>
          {t('delegation')}
          <Tooltip title={t('v2.stake.descriptionForm.exchangeTooltip')}>
            <QuestionIcon />
          </Tooltip>
        </span>
        <Switch value={isActivatedDelegation} size='small' onChange={onChange} />
      </div>
      {isActivatedDelegation && (
        <Select
          defaultValue={poolDelegatedSelected}
          onChange={handleDelegationChange}
          value={poolDelegatedSelected}
          style={{ width: '100%', height: 42 }}
          options={projectListMapped}
        />
      )}
    </Container>
  )
}
const { Container, QuestionIcon, SelectOption } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    > div {
      &:first-child {
        display: flex;
        gap: ${({ theme }) => theme.size[16]};
        justify-content: space-between;
        align-items: center;

        font-size: 13px;
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.gray[1]};
        span {
          display: flex;
          align-items: center;
          gap: ${({ theme }) => theme.size[4]};
        }
      }
    }
  `,
  QuestionIcon: styled(PiQuestion)`
    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  SelectOption: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `
}
