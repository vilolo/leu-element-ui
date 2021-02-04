/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const ssppRouter = {
  path: '/sspp',
  component: Layout,
  name: 'Sspp',
  meta: {
    title: 'Sspp',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/sspp/index'),
      name: 'SsppIndex',
      meta: { title: 'Sspp Index' }
    },
    {
      path: 'table',
      component: () => import('@/views/sspp/table'),
      hidden: true
    }
  ]
}
export default ssppRouter
