import { gql } from '@apollo/client'

export const queryAccountElPoints = gql`
  query AccountEigenLayerPoints($accountAddress: String!) {
    eigenLayerPoints(accountAddress: $accountAddress)
  }
`