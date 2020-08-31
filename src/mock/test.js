/**
 * @description mock测试模块相关接口
 * @author jie
 * @date 2019/8/16
 * @param { isMock } 是否启用mock数据
 * @returns VOID
 * @version 1.0
 */
// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
export default {
    // 查询
    test_getList: {
        url: '/api/select',
        method: 'get',
        isMock: true,
        fun: function() {
            let testData = []
            for (let i = 0; i < 100; i++) {
                let newArticleObject = {
                    title: Random.csentence(5, 30), //  随机生成5-30的中文句子
                    name: Random.cname(), // 随机生成一个常见的中文姓名
                    date: Random.date()  // 指示生成的日期字符串的格式,默认为yyyy-MM-dd
                }
                testData.push(newArticleObject)
            }
            console.log(testData)
            return {
                code: 200,
                data: testData
            };
        }
    },
    // 添加
    test_add: {
        url: '/api/save',
        method: 'get',
        isMock: false,
        fun: function() {
            let testData = []
            for (let i = 0; i < 100; i++) {
                let newArticleObject = {
                    title: Random.csentence(5, 30), //  随机生成5-30的中文句子
                    name: Random.cname(), // 随机生成一个常见的中文姓名
                    date: Random.date()  // 指示生成的日期字符串的格式,默认为yyyy-MM-dd
                }
                testData.push(newArticleObject)
            }
            console.log(testData)
            return {
                code: 200,
                data: testData
            };
        }
    },
}
