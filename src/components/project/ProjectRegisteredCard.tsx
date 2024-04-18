import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import { DateTime } from 'luxon'
import styled, { useTheme } from 'styled-components'
import PoolFilterIcon from '../invest/PoolFilterIcon'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'

interface ProjectRegisteredProps {
  projectLogo?: string
  projectName?: string
  projectStatus: string
  createAt: string
  ProjectCategory: string
}

export default function ProjectRegisteredCard({
  projectLogo,
  projectName,
  projectStatus,
  ProjectCategory,
  createAt
}: ProjectRegisteredProps) {
  const publishedData = DateTime.fromISO(createAt)
  const { t } = useLocaleTranslation()
  const { poolTypeTranslation } = usePoolTypeTranslation()

  const statusColor = () => {
    switch (projectStatus) {
      case 'approved':
        return 'green'
      case 'rejected':
        return 'red'
      default:
        return 'secondary'
    }
  }

  const theme = useTheme()

  return (
    <CardContainer>
      <CardHeader>
        {projectLogo && <CommunityLogo size={80} src={projectLogo} alt={projectName ?? ''} />}
        <div>
          {projectName && <CommunityName name={projectName} $large $bold $color={theme.color.secondary} />}
          <div>
            {PoolFilterIcon({ iconSize: 14, value: ProjectCategory })}
            <span>{`${poolTypeTranslation(ProjectCategory)}`}</span>
          </div>
        </div>
      </CardHeader>

      <CardInfo>
        <div>
          <span>Status</span>
          <span className={`bold ${statusColor()}`}>{`${t(`v2.createProject.status.${projectStatus}`)}`}</span>
        </div>
        <div>
          <span>{t('v2.createProject.sent')}</span>
          <span className={`bold `}>{publishedData.toFormat('dd/MM/yyyy')}</span>
        </div>
      </CardInfo>
    </CardContainer>
  )
}

const { CardContainer, CardHeader, CardInfo } = {
  CardContainer: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 200px;

    padding: 16px;
    gap: ${({ theme }) => theme.size[4]};

    border-radius: 12px;
    background: ${({ theme }) => theme.colorV2.foreground};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
  `,

  CardHeader: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[16]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: ${({ theme }) => theme.size[4]};
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        > span {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  `,
  CardInfo: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: ${({ theme }) => theme.size[8]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[16]};
      > span {
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 400;

        &.bold {
          font-weight: 500;
        }
        &.secondary {
          color: ${({ theme }) => theme.color.secondary};
        }
        &.green {
          color: ${({ theme }) => theme.color.green[500]};
        }
        &.red {
          color: ${({ theme }) => theme.color.red[500]};
        }
      }
    }
  `
}
