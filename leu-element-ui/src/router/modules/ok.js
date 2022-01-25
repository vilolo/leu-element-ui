import Layout from '@/layout'

const okRouter = {
  path: '/ok',
  component: Layout,
  name: 'Ok',
  meta: {
    title: 'ok',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ok/index'),
      name: 'OkIndex',
      meta: { title: 'Ok Index' }
    }
  ]
}
export default okRouter
