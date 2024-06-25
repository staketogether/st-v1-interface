import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global'

interface UserKyc {
  email: string, 
  kyc: {
    fullName: string,
  },
  kycUsedLimit: {
    limitMint: number,
    limitBurn: number,
    limitSwapBuy: number,
    limitSwapSell: number,
    limitBRLAOutOwnAccount: number,
    limitBRLAOutThirdParty: number
  }
}

export default function userProfile(id: number ) {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get(`${backendUrl}/${uri}`).then((res) => res.data);
  const { data, error } = useSWR<UserKyc>(id ? `/api/user-profile/profile/${id}` : null, fetcher);

  return {
    profileData: data,
    isLoading: !error && !data,
    isError: error
  };
}