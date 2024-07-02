import { gql } from "@apollo/client";

export const CREATE_ACTIVITY_MUTATION_SWAP = gql`
    mutation CreateAccountActivitySell(
        $chainId: Int!, 
        $accountAddress: String!, 
        $amount: Int!, 
        $amountTo: Int!, 
        $assetType: String!,
        $token: String!
        $toToken: String!
        $toChain: Int!
        
        ){       
        accountActivity(
            data: {
                chainId: $chainId
                accountAddress: $accountAddress
                type: swap
                amount: $amount
                additionalData: { amountTo: $toChain, chainId: 10, tokeTo: $toToken}
                assetType: $assetType
                token: $token
            }
        ) {
            chainId
            amount
            createdAt
            token
            type
        }
    }

`

export interface CreateActivitySwapArgs {

    chainId: number
    accountAddress: string
    amount: string
    amountTo: string
    brlId: string
    assetType: 'swap'
    token: string
    toToken: string
    toChain: number
}