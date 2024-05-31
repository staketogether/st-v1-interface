import { Drawer } from 'antd'
import SearchInput from './inputs/SearchInput'
import AssetIcon from './AssetIcon'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import useHeaderSearch from '@/hooks/useHeaderSearch'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { HiArrowLeft } from "react-icons/hi2";

type SearchDrawerProps = {
    openDrawer: boolean,
    setOpenDrawer: (arg: boolean) => void,
}

export default function SearchDrawer({openDrawer, setOpenDrawer}: SearchDrawerProps) {
    const [searchValue, setSearchValue] = useState('')
    const initialValue = 'eth'
    const { t } = useLocaleTranslation()
    
    const {hasItemsFiltered, assetsListFiltered, stakingListsFiltered}  = useHeaderSearch(searchValue || initialValue)
    const { query } = useRouter()
    const { currency } = query as { currency: string }

    return (
        <DrawerContainer placement="bottom" key="bottom" onClose={() => setOpenDrawer(false)}
            mask={true} open={openDrawer}>
            <div className='containerSearch'>
                    <button onClick={() => setOpenDrawer(false)}> 
                    <ArrowLeft  />
                    Voltar</button>
                <SearchInput search={searchValue} setSearch={setSearchValue} />
            </div>
            <ContainerResult>
                {hasItemsFiltered ? (
                    <WrapperCard>
                        {!!assetsListFiltered.length && (
                            <header>
                                <span>{t('tokens')}</span>
                            </header>
                        )}
                        {assetsListFiltered.map(asset => (
                            <Row href={asset.item.url.replace('currency', currency)} key={asset.item.id}>
                                <AssetIcon image={asset.item.symbolImage} chain={asset.item.chains[0]} size={32} altName={asset.item.id} />
                                <div>
                                    <h2>{asset.item.symbol}</h2>
                                </div>
                            </Row>
                        ))}
                        {!!stakingListsFiltered.length && (
                            <header>
                                <span>{t('products')}</span>
                            </header>
                        )}
                        {stakingListsFiltered.map(staking => (
                            <Row href={staking.item.url.replace('currency', currency)} key={staking.item.id}>
                                <AssetIcon image={staking.item.symbolImage} chain={staking.item.asset.chains[0]} size={32} altName={staking.item.id} />
                                <div>
                                    <h2>{staking.item.symbol}</h2>
                                </div>
                            </Row>
                        ))}
                    </WrapperCard>
                ): <span>{t('noItemFound')}</span>}
            </ContainerResult>
        </DrawerContainer>
    )
}

const { DrawerContainer, ContainerResult, WrapperCard, Row, ArrowLeft } = {
    DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.colorV2.foreground} !important;

    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }
    
    .ant-drawer-body {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 0;
    }
     .containerSearch{
      width: 100%;
      padding: ${({ theme }) => theme.size[24]};
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.font.size[24]};
      align-items: flex-start;
      text-align: left;
      
    
      div {
        height: 42px;
      }

      button {
        background: transparent;
        border: 0;
        color: ${({ theme }) => theme.color.gray[500]};
        font-weight: 500;
        font-size: ${({ theme }) => theme.font.size[12]};
        display: flex;
        align-items: center;
        text-align: center;
        gap: 4px;
        font-size: ${({ theme }) => theme.font.size[15]};
      }
    }
    `,
    ContainerResult: styled.div`
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.color.white};
    padding: ${({ theme }) => theme.size[24]};
  `,
    WrapperCard: styled.div`
   width: 100%;
   height: auto;
 
   min-height: 150px;
   max-height: 400px;
   display: flex;
   flex-direction: column;
   gap: ${({ theme }) => theme.size[12]};
 
   overflow-y: auto;
   padding: ${({ theme }) => theme.size[8]};
 
   > header {
     font-size: ${props => props.theme.font.size[15]};
     font-weight: 500;
     display: flex;
     align-items: center;
     gap: ${({ theme }) => theme.size[8]};
   }
 `,
    Row: styled(Link)`
   display: flex;
   align-items: center;
   gap: ${({ theme }) => theme.size[8]};
   border-radius: ${({ theme }) => theme.size[8]};
   transition: background-color 0.2s;
   padding: 4px 2px;
   cursor: pointer;
 
   div:nth-child(2) {
     display: flex;
     flex-direction: column;
     text-align: left;
     font-size: ${props => props.theme.font.size[12]};
     text-decoration: none;
     color: ${({ theme }) => theme.colorV2.gray[1]};
   }
 
   &:hover {
     background-color: ${({ theme }) => theme.colorV2.foreground};
   }
 `,
  ArrowLeft: styled(HiArrowLeft)`
   width: 15px;
   height: 15px;
  ` 
}