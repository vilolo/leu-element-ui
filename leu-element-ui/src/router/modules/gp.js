import Layout from '@/layout'

const okRouter = {
  path: '/gp',
  component: Layout,
  name: 'GP',
  meta: {
    title: 'gp',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/gp/index'),
      name: 'GpIndex',
      meta: { title: 'Gp Index' }
    }
  ]
}
export default okRouter
