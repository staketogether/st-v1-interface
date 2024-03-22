
import { LiFi } from '@lifi/sdk';
import { useEffect, useMemo, useState } from "react";
import { useEthersSigner } from '../useEthersProvider';
import { tokens } from "./tokens";

interface RouteOptions {
    integrator?: string // Should contain the identifier of the integrator. Usually, it's dApp/company name.
    fee?: number // 0.03 = take 3% integrator fee (requires verified integrator to be set)
    insurance?: boolean // Whether the user wants to insure their tx
    maxPriceImpact?: number // Hide routes with price impact greater than or equal to this value
    order?: 'RECOMMENDED' | 'FASTEST' | 'CHEAPEST' | 'SAFEST' // (default: RECOMMENDED) 'RECOMMENDED' | 'FASTEST' | 'CHEAPEST' | 'SAFEST'
    slippage?: number // (default: 0.03) Expressed as decimal proportion, 0.03 represents 3%
    referrer?: string // Integrators can set a wallet address as a referrer to track them
    infiniteApproval?: boolean // (default: false)
    allowSwitchChain?: boolean // (default: false) Whether chain switches should be allowed in the routes
    allowDestinationCall?: boolean // (default: true) destination calls are enabled by default
    bridges?: AllowDenyPrefer
    exchanges?: AllowDenyPrefer
}

interface AllowDenyPrefer {
    allow?: string[];
    deny?: string[];
    prefer?: string[];
}

export interface RoutesRequest {
    fromChainId: number;
    fromAmount: string;
    fromTokenAddress: string;
    fromAddress?: string;
    toChainId: number;
    toTokenAddress: string;
    toAddress?: string;
    options?: RouteOptions;
}


export function useBridge(routesRequest: RoutesRequest) {
    const { signer } = useEthersSigner()
    const [bridge, setBridge] = useState<LiFi>()
    useMemo(() => {
        const lifi = new LiFi({
            integrator: 'stakeTogether'
        })
        setBridge(lifi)
    }, [])


    // const tokens: BridgeToken[]
    // const fromChains: BridgeChain[]
    // const toChains: BridgeChain[]
    const fromToken = tokens.find(token => token.chainId.includes('11155420'))
    console.log('fromToken', fromToken)
    useEffect(() => {

        async function getTokens() {
            const { fromChainId, fromAmount, fromTokenAddress, toChainId, toTokenAddress } = routesRequest
            const isValid = fromChainId && fromAmount && fromTokenAddress && toChainId && toTokenAddress
            if (bridge && isValid && signer) {
                const result = await bridge.getRoutes(routesRequest)
                const [route] = result.routes
                await bridge.executeRoute(signer, route)

            }
            // if (bridge) {
            //     const supports = await bridge.supports(137, 10)
            //     console.log('supports', supports)
            // }
        }
        if (routesRequest?.fromAddress) {
            getTokens()
        }
    }, [routesRequest])
}