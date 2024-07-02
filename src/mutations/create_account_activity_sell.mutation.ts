import { gql } from "@apollo/client";

export const CREATE_ACTIVITY_MUTATION_SELL = gql`
    mutation CreateAccountActivitySell(
        $chainId: Int!, 
        $accountAddress: String!, 
        $amount: Int!, 
        $amountFiat: Int!, 
        $brlaId: Int, 
        $assetType: String!,
        $token: String!
        
        ){       
        accountActivity(
            data: {
                chainId: $chainId
                accountAddress: $accountAddress
                type: sellCrypto
                amount: $amount
                additionalData: { amountFiat: $amountFiat, brlaId: $brlaId }
                assetType: $assetType
                token: $token
            }
        ) {
            amount
            chainId
            createdAt
            token
            type
        }
    }

`
export interface CreateActivitySellArgs {

    chainId: number
    accountAddress: string
    amount: string
    brlaId: string
    assetType: 'asset' | 'staking'
    type: 'sellCrypto'
    token: string
    amountFiat: string

}

export interface CreateActivitySellData {

    amount: string
    chainId: number
    createdAt: string
    token: string
    type: string

}