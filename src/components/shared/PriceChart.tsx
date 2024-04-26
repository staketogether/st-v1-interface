import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface PriceChartProps {
  chainId: number
  contract: `0x${string}`
}

export default function PriceChart({ chainId, contract }: PriceChartProps) {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300
    }
  ]

  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray='2 2' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='uv' stroke='#774bc7' fill='#b993ff' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
