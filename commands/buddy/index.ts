import type { Command } from '../../commands.js'

const buddy: Command = {
  type: 'local-jsx',
  name: 'buddy',
  description: 'Manage your Pokemon companion',
  load: () => import('./buddy'),
}

export default buddy
