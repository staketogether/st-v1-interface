import line from '@assets/icons/line.svg';
import Image from "next/image";
import { ReactNode } from "react";
import styled from "styled-components";

export interface ValidationSteps {
    icon: ReactNode
    text: string
    disable: boolean
}

export default function ValidationList({ validationSteps }: Readonly<{ validationSteps: ValidationSteps[] }>) {

    return (
        <StatusContainer>
            {validationSteps.map((step, index) => (
                <>
                    <Status key={index} className={step.disable ? 'disabled' : ''}>
                        {step.icon}
                        <span>{step.text}</span>
                    </Status>
                    {index < validationSteps.length - 1 ? (
                        <Divider>
                            <Image src={line} alt='' width={0} height={17} />
                        </Divider>) :
                        <></>
                    }
                </>
            ))}
        </StatusContainer>
    )
}

const { StatusContainer, Status, Divider } = {
    StatusContainer: styled.div`
      display: grid;
      gap: ${({ theme }) => theme.size[4]};
      padding: ${({ theme }) => theme.size[24]};
      padding: ${({ theme }) => theme.size[24]};
      border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
      border-radius: ${({ theme }) => theme.size[8]};
    
    `,
    Status: styled.div`
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
        > span {
          font-size: 15px;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
        }
      &.disabled {
        filter: grayscale(1);
      }
    `,
    Divider: styled.div`
      margin-left: 16px;
    `
}
