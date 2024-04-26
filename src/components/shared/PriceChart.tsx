import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

interface PriceChartProps {
  chainId: number
  contract: `0x${string}`
}

export default function PriceChart({ chainId, contract }: PriceChartProps) {
  const [data, setData] = useState<
    {
      timestamp: number
      value: number
    }[]
  >([])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getChartData = (chainIdItem: number, contractItem: `0x${string}`) => {
      const dataResult = [
        {
          timestamp: 1711584000000,
          value: 3498.7341236362076
        },
        {
          timestamp: 1711670400000,
          value: 3552.378511969561
        },
        {
          timestamp: 1711756800000,
          value: 3504.052295323504
        },
        {
          timestamp: 1711843200000,
          value: 3497.885666487047
        },
        {
          timestamp: 1711929600000,
          value: 3631.8507534957967
        }
      ]

      setData(dataResult)
    }

    getChartData(chainId, contract)
  }, [chainId, contract])

  return (
    <LineChart width={776} height={300} data={data}>
      <XAxis dataKey='timestamp' />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
      <Line type='monotone' dataKey='value' stroke='#8884d8' />
    </LineChart>
  )
}
