import { defineConfig } from '@wagmi/cli'
import { hardhat, react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/types/Contracts.ts',
  plugins: [
    hardhat({
      project: '../st-v1-contracts',
      commands: {
        clean: 'pnpm hardhat clean',
        build: 'pnpm hardhat compile',
        rebuild: 'pnpm hardhat compile'
      }
    }),
    react()
  ]
})
