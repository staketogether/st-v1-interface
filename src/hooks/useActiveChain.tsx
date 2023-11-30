import { useCallback, useState } from "react";
import { Network } from "@/types/Network";
import chainConfig, { ChainConfig } from "@/config/chain";

export default function useActiveChain() {
  const [chainId, setChainId] = useState<number>(Network.Mainnet)
  const [config, setConfig] = useState<ChainConfig>(chainConfig(chainId))
  const [isTestnet, setIsTestnet] = useState<boolean>(true)
  const setActiveChain = useCallback((chainId: number) => {
    setChainId(chainId)
    setIsTestnet(chainId !== Network.Mainnet)
    setConfig(chainConfig(chainId))
  }, [])

  return {
    chainId,
    config,
    isTestnet,
    setActiveChain
  }
}
