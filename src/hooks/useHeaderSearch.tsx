import { getListedAssets } from "@/config/product/asset"
import { getListedStaking } from "@/config/product/staking"
import Fuse from "fuse.js"


export default function useHeaderSearch(searchValue: string) {
    const listedAssets = getListedAssets()
    const listedStaking = getListedStaking()

    const stakingOptions = {
        includeScore: true,
        keys: [
            {
                name: 'id',
                weight: 1
            },
            {
                name: 'symbol',
                weight: 2
            },
            {
                name: 'contracts.StakeTogether',
                weight: 2
            }
        ],
        threshold: 0.3
    }

    const assetOptions = {
        includeScore: true,
        keys: [
            {
                name: 'id',
                weight: 1
            },
            {
                name: 'symbol',
                weight: 2
            },
            {
                name: 'contractAddress',
                weight: 3
            }
        ],
        threshold: 0.3
    }

    const assetFuse = new Fuse(listedAssets, assetOptions)
    const stakingFuse = new Fuse(listedStaking, stakingOptions)

    const assetsListFiltered = assetFuse.search({
        $or: [{ id: searchValue }, { symbol: searchValue }, { contractAddress: searchValue }]
    })
    const stakingListsFiltered = stakingFuse.search({
        $or: [{ id: searchValue }, { symbol: searchValue }]
    })

    const hasItemsFiltered = !!(assetsListFiltered.length || stakingListsFiltered.length)

    return {hasItemsFiltered, assetsListFiltered, stakingListsFiltered}
}