interface StakePoolAboutProps {
  poolAddress: `0x${string}` | undefined
}

export default function StakePoolAbout({ poolAddress }: StakePoolAboutProps) {
  return <span>{poolAddress}</span>
}
