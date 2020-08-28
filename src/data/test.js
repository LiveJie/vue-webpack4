
/**
 * 测试接口
 */
export default {
    // 添加
    test_add: {
        url: '/api/save',
        interFaceType: 'api',
        method: 'post',
        bodyParam: true
    },
    // 删除
    test_delete: {
        url: '/api/delete',
        interFaceType: 'api',
        method: 'delete'
    },
    // 查询
    test_getList: {
        url: '/api/select',
        interFaceType: 'api',
        method: 'get',
        linkId: true
    },
    // 修改
    test_updateList: {
        url: '/api/update',
        interFaceType: 'api',
        method: 'put'
    },
}
