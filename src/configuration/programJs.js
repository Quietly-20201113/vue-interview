//解构项目需求
/**
 * 1、我的方案与公共方案需要回显至右侧内容
 * 2、查询条件逻辑 
 *      满足所有条件 ： 新增自动生成（并且元素），禁用按钮(且、或、（、）)
 *      满足任意条件 ： 新增自动生成（或元素），禁用按钮(且、或、（、）)
 *      自定义逻辑   ： 点击按钮在点击新增
 *                     逻辑问题1、列表为空时是否可以点击元素按钮
 *                     逻辑问题2、元素按钮一直生效还是只生效一次
 * 3、保存时是否需要验证内容是否已填 ----不做
 * 4、右侧怎么保存至左侧（无按钮）-----不做
 *                      
 * 
 */





/**、
 * 方案逻辑处理js
 */
const ProgramJs = () => {

    ///拼接显示条件
    /**
     * 
     * @param {oldData} [旧数据]
     * @param {condition} [选中状态]
     * @param {isSwitch} [是否进行过切换]
     */
   const splicingDisplayCondition = async ({oldData,condition,isSwitch}) => {

    let _oldData = [...oldData];

    let _arr = _oldData.map(v => v.title);
    // if(isSwitch){
        
    // }

    switch(condition){
        case programCondition.AND_THE_CONDITION : 
           let _str = '';
           
           await _arr
        return 
    }

    



   }





}

export default ProgramJs;


//方案dict
export const programCondition = {
    AND_THE_CONDITION : 'AND_THE_CONDITION',///并且
    ARBITRARY_CONDITIONS : 'ARBITRARY_CONDITIONS',///或者
    SINGLE_AND_THE_CONDITION : 'SINGLE_AND_THE_CONDITION',///单次并且
    SINGLE_ARBITRARY_CONDITIONS : 'SINGLE_ARBITRARY_CONDITIONS',//单次或者
    LEFT_PARENTHESIS : 'LEFT_PARENTHESIS',///左边括号
    RIGHT_PARENTHESIS : 'RIGHT_PARENTHESIS'//右边括号
}