import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';


export function useEthersSigner() {
    const user = useAccount()
    const [signer, setSigner] = useState<ethers.JsonRpcSigner>()
    useEffect(() => {
        const handle = async () => {
            const providerAccount = await user.connector?.getProvider()
            const provider = new ethers.BrowserProvider(providerAccount)
            const signer = await provider.getSigner()
            if (user?.address) {
                console.log('signer', new ethers.VoidSigner(user?.address, providerAccount))
            }
            setSigner(signer)
        }
        if (user && !signer) {
            handle()
        }
    }, [user, signer])

    return { signer }

}