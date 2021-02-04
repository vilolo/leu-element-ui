import request from '@/utils/request'

export function getMarketData(params) {
  return request({
    url: 'http://lumen.leu/index.php/admin/v1/newOrganizeData',
    method: 'get',
    params: params
  })
}
