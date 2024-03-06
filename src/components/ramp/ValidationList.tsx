import line from '@assets/icons/line.svg';
import Image from "next/image";
import { ReactNode } from "react";
import styled from "styled-components";

export interface ValidationSteps {
  icon: ReactNode
  text: string
  subText?: string
  disable: boolean
}

export default function ValidationList({ validationSteps }: Readonly<{ validationSteps: ValidationSteps[] }>) {

  return (
    <StatusContainer>
      {validationSteps.map((step, index) => (
        <>
          <Status key={index} className={step.disable ? 'disabled' : ''}>
            {step.icon}
            <div>
              <span>{step.text}</span>
              {step.subText && <span>{step.subText}</span>}
            </div>
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
        > div {
          display: flex;
          flex-direction: column;
          > span:nth-child(1){
            font-size: 15px;
            font-weight: 500;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;
          }
          > span:nth-child(2) {
            font-size: 13px;
            font-weight: 400;
            line-height: 15.85px;
          }
        }
      &.disabled {
        filter: grayscale(1);
      }
    `,
  Divider: styled.div`
      margin-left: 16px;
    `
}
