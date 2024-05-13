import { useCallback, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineShowChart } from "react-icons/md";
import { stakingList } from "@/config/product/staking";
import { getListedAssets } from "@/config/product/asset";
import styled from 'styled-components'
import Fuse, { FuseResult } from "fuse.js";
import AssetIcon from "../shared/AssetIcon";



export default function Search() {
    const [value, setValue] = useState('');
    const listedAssets = getListedAssets();
    const listedStaking = stakingList.filter(e => e.listed)

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

    const assetFuse = new Fuse(listedAssets, assetOptions);
    const stakingFuse = new Fuse(listedStaking, stakingOptions);

    const assetsListFiltered = assetFuse.search({
        $or: [{ id: value }, { symbol: value }, { contractAddress: value }]
    })
    const stakingListsFiltered = stakingFuse.search({
        $or: [{ id: value }, { symbol: value }]
    })


    console.log(assetsListFiltered)


    return (
        <Container>
            <SearchContainer>
                <SearchIcon />
                <input placeholder="Search" type="search" onChange={(e) => setValue(e.target.value)} />
            </SearchContainer>
            <WrapperResult>
                <WrapperCard>
                    {assetsListFiltered.length &&
                        <div>
                            <MdOutlineShowChart />
                            <span>Criptomoedas</span>
                        </div>
                    }
                    {assetsListFiltered.map(asset => (
                        <Card key={asset.item.id}>
                            <AssetIcon image={asset.item.symbolImage} chain={asset.item.chains[0]} size={32} altName={asset.item.id} />
                            <div>
                                <h2>{asset.item.symbol}</h2>
                                <span>ETH</span>
                            </div>
                        </Card>
                    ))}
                    {stakingListsFiltered.length &&
                        <div>
                            <MdOutlineShowChart />
                            <span>Investimentos</span>
                        </div>
                    }
                    {stakingListsFiltered.map(staking => (
                        <Card>
                            <AssetIcon image={staking.item.symbolImage} chain={staking.item.asset.chains[0]} size={32} altName={staking.item.id} />
                            <div>
                                <h2>{staking.item.symbol}</h2>
                                <span>ETH</span>
                            </div>
                        </Card>
                    ))}
                </WrapperCard>
            </WrapperResult>
        </Container>
    )
}


const { Container, SearchContainer, WrapperResult, WrapperCard, Card, SearchIcon } = {
    Container: styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    `,
    SearchContainer: styled.div`
    width: 294px;
    max-width: 100%;
    height: ${({ theme }) => theme.size[32]};
    background: ${({ theme }) => theme.color.gray[100]};
    display: flex;
    align-items: center;
    border-radius: ${({ theme }) => theme.size[8]};
    gap: ${({ theme }) => theme.size[8]};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.20);
    padding: 0px 16px 0px 8px;

    input {
        width: 100%;
        height: ${({ theme }) => theme.size[32]};
        border: 0;
        outline: 0;
        background: transparent;
    }
    `,
    WrapperResult: styled.div`
    width: 300px;
    height: 300px;
    background: ${({ theme }) => theme.color.white};
    position: absolute;
    z-index: 1;
    top: 64px;
    border-radius: 0px 0px 8px 8px;
    box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.20);
    `,
    WrapperCard: styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    >div {
        font-size: ${props => props.theme.font.size[12]};
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
        padding: 8px;
    }
    `,
    Card: styled.div`
    display: flex;

    >div {
        display: inherit;
    }

    div:nth-of-type(2) {
        flex-direction: column;
        text-align: right;
    }
    `,
    SearchIcon: styled(BiSearch)`
        font-size: ${props => props.theme.size[16]};
        color: ${({ theme }) => theme.color.gray[500]};
    `
}