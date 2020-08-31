/**
 * @description 测试模块相关接口
 * @author jie
 * @date 2019/8/16
 * @returns VOID
 * @version 1.0
 */
export default {
    // 添加
    test_add: {
        url: '/api/save',
        interFaceType: 'api',
        method: 'get'
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
        method: 'get'
    },
    // 修改
    test_updateList: {
        url: '/api/update',
        interFaceType: 'api',
        method: 'put'
    },
}
