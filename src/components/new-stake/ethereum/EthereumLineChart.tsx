/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/EthereumLineChart.tsx

import React from 'react'
import { Line } from 'react-chartjs-2'
import styled, { useTheme } from 'styled-components'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js'
import { useRouter } from 'next/router'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

type EthereumLineChartProps = {
  data: number[][]
}

export default function EthereumLineChart({ data }: EthereumLineChartProps) {
  const theme = useTheme()
  const { locale } = useRouter()

  const chartData = {
    labels: data.map(item => new Date(item[0]).toLocaleString()),
    datasets: [
      {
        label: 'Price',
        data: data.map(item => item[1]),
        borderColor: theme.colorV2.purple[1],
        backgroundColor: theme.colorV2.purple[2]
      }
    ]
  }

  const options = {
    scales: {
      x: {
        ticks: {
          display: false
        },
        grid: {
          drawBorder: false,
          display: false
        }
      },
      y: {
        ticks: {
          callback: function (value: number) {
            return new Intl.NumberFormat(locale, {
              style: 'currency',
              currency: 'USD'
            }).format(value)
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }

  return (
    <Wrapper>
      {/*  @ts-expect-error */}
      <Line options={options} data={chartData} />
    </Wrapper>
  )
}

const { Wrapper } = {
  Wrapper: styled.div`
    background-color: ${({ theme }) => theme.colorV2.white};
    padding: ${({ theme }) => theme.size[24]};
    position: relative;
    margin: auto;
    height: 327px;
    width: 100%;

    border-radius: 8px;
  `
}
