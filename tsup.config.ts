import { Options } from 'tsup'

export const tsup: Options = {
  clean: true,
  entryPoints: ['src/index.ts', 'src/adapters'],
  dts: false, // done manually, so definitions are placed in their corresponding folder
}
