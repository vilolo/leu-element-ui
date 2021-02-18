import request from '@/utils/request'

var lumenApi = 'http://lumen.leu/index.php/admin/v1'

export function getMarketData(params) {
  return request({
    url: lumenApi + '/newOrganizeData',
    method: 'get',
    params: params
  })
}

export function getTemplate(params) {
  return request({
    url: lumenApi + '/showTemplate',
    method: 'get',
    params: params
  })
}

export function saveTemplate(params) {
  return request({
    url: lumenApi + '/saveTemplate',
    method: 'post',
    params: params
  })
}

export function getCategory(params) {
  return request({
    url: lumenApi + '/getCategory',
    method: 'get',
    params: params
  })
}
