<style lang='scss' scoped src='./index.scss'></style>

<template>
    <div class="screening-plan-body">
        <div class="screening-plan-body-item">
                  <div class="screening-plan-left">
            <a-card class="screening-plan-left-card" :bodyStyle="{padding:'0'}">
                 <div class="screening-plan-left-button">
                     <a-button type="primary" >保存 </a-button>
                       <a-button type="primary" class="button" >移除 </a-button>
                 </div>
                  <a-card class="my-screening" :bodyStyle="{padding:'0'}">
                      <p>我的方案</p>
                      <a-card class="my-screening-body" :bodyStyle="{padding:'0'}">
                            <template v-for="item in [...Array(20).keys()]" :key='item'>
                                <div class="span-screening">默认方案{{item+1}}</div>
                            </template>
                      </a-card>
                      <div :style="{paddingTop : '12px'}" :bodyStyle="{padding:'0'}"></div>
                      <p>公共方案</p>
                      <a-card class="my-screening-body" :bodyStyle="{padding:'0'}">
                           <template v-for="item in [...Array(20).keys()]" :key='item'>
                                <div class="span-screening">默认方案{{item+1}}</div>
                            </template>
                      </a-card>
                  </a-card>
            </a-card>
        </div>
        <div class="screening-plan-right">
      <a-card>
                <div class="screening-plan-right-head">
                    <a-card>
                        <div class="screening-plan-right-head-title">
                            <span>查询条件逻辑</span>
                        </div>
                        <a-radio-group v-model:value="queryConditions" @change="queryConditionsChange">
                            <a-radio :style="radioStyle" :value="programCondition.AND_THE_CONDITION">满足所有条件（并且）</a-radio>
                            <a-radio :style="radioStyle" :value="programCondition.ARBITRARY_CONDITIONS">满足任意条件（或者）</a-radio>
                            <a-radio :style="radioStyle" value="-1">自定义逻辑</a-radio>
                         </a-radio-group>
                         <a-input class="screening-plan-right-head-input" v-model:value="dynamicValidateForm.conditionEcho"  disabled/>
                         <div class="button-div">
                            <a-button :disabled='queryConditions != "-1"' type="primary" class="screening-plan-right-head-button" @click="onProgramClick(programCondition.SINGLE_AND_THE_CONDITION)">且</a-button>
                            <a-button :disabled='queryConditions != "-1"' type="primary" class="screening-plan-right-head-button" @click="onProgramClick(programCondition.SINGLE_ARBITRARY_CONDITIONS)">或</a-button>
                            <a-button :disabled='queryConditions != "-1"' type="primary" class="screening-plan-right-head-button" @click="onProgramClick(programCondition.LEFT_PARENTHESIS)">(</a-button>
                            <a-button :disabled='queryConditions != "-1"' type="primary" class="screening-plan-right-head-button" @click="onProgramClick(programCondition.RIGHT_PARENTHESIS)">)</a-button>
                         </div>
                         <a-card >
                            <template #extra>
                                    <a-button @click="addDomain">
                                        <template #icon><PlusOutlined /></template>
                                        新增
                                    </a-button>
                                </template>
                                <div class="form-body">
                                    <a-form ref="formRef" :model="dynamicValidateForm">
                                         <a-row class="head-form-row" v-for="(domain) in dynamicValidateForm.domains" :key="domain.key">
                                            <a-col :span="5" class="head-form-col">
                                                <a-form-item class="head-form-item">
                                                    <a-input  v-model:value="domain.title"  disabled/>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="5" class="head-form-col">
                                                 <a-form-item class="head-form-item">
                                                    <a-select v-model:value="domain.tableName">
                                                        <template v-for="(item) in dynamicValidateForm.propertyList" :key='item.label'>
                                                                <a-select-option :value="item.label">{{item.title}}</a-select-option>
                                                        </template>
                                                    </a-select>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="5" class="head-form-col">
                                                <a-form-item class="head-form-item">
                                                    <a-select v-model:value="domain.tableValue">
                                                        <template v-for="(item) in dynamicValidateForm.propertyJson[domain.tableName]" :key='item.label'>
                                                                <a-select-option :value="item.label">{{item.title}}</a-select-option>
                                                    </template>
                                                    </a-select>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="5" class="head-form-col">
                                                 <a-form-item class="head-form-item">
                                                    <a-input  v-model:value="domain.inputValue"/>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="4" class="head-form-col">
                                                 <div>
                                                     <a-button type="primary" class="form-delete-button" @click="removeDomain(domain)">
                                                   <template #icon><MinusCircleFilled style='color : red'/></template>
                                                 </a-button>
                                                 </div>
                                            </a-col>
                                            </a-row>
                                    </a-form>
                                </div>
                         </a-card>
                    </a-card>
                </div>
            </a-card>
        </div>
        </div>
  
       
            
    </div>
</template>

<script>    
import { defineComponent, ref,reactive} from 'vue';
import { message } from 'ant-design-vue'
import { PlusOutlined,MinusCircleFilled } from "@ant-design/icons-vue";
import { programCondition,programConditionSymbol } from "../../configuration/programJs";
export default defineComponent({
  name: 'ScreeningPlan',

  setup() {

      let data = {
          formJsonList : [],
          buttonActive : ''
      };
      ///表单数组
    const dynamicValidateForm = reactive({
        domains : [],
        index : 1,
        conditionEcho : '',///input插值
        propertyList : [
            {
                title : '组织名称',
                label : 'name'
            },
            {
                title : '是否启用',
                label : 'isDislabel'
            },
            {
                title : '启用情况',
                label : 'situation'
            }
        ],
        propertyJson : {
            name : [
                {title : '包含',label : 'baohan'},
                {title : '不包含',label : 'bubaohan'},
                {title : '等于',label : 'dengyu'},
                {title : '不等于',label : 'budengyu'},
                {title : '有内容',label : 'youneirong'},
                {title : '无内容',label : 'wuneirong'},
            ],
           isDislabel : [
               {title : '等于',label : 'dengyu'},
                {title : '不等于',label : 'budengyu'},
                {title : '有内容',label : 'youneirong'},
                {title : '无内容',label : 'wuneirong'}
              
           ],
           situation : [
                {title : '启用',label : 'qiyong'},
               {title : '禁用',label : 'jinyong'}
           ]
        }
        
    });

    const queryConditionsChange = (val) => {
            let _value = val.target.value;
            queryConditions.value = _value;
            if(_value == '-1'){
                data.formJsonList.map((item,index)=> {
                    index == dynamicValidateForm.domains.length -1 ? item.program = '' : item;
                })
                return;
            }
            let _formJsonList = data.formJsonList.filter(item => item.title != '');
           _formJsonList.map(item => item.program = programConditionSymbol[_value]);
            data.formJsonList = _formJsonList;
            _formRefValue();
    }

      ///单选选中
    const queryConditions = ref(programCondition.AND_THE_CONDITION);
    ///获取表单dom
    const formRef = ref();

///四元素按钮
    const onProgramClick = (value) => {
        if(dynamicValidateForm.domains.length == 0){
            message.warning('请先新增数据！')
            return;
        }
        data.buttonActive = value;
        let _buttonActiveToJson = programConditionSymbol[value];
         data.formJsonList.push({
            title : '',
            program : _buttonActiveToJson,
        });
        _formRefValue();
    };

    const radioStyle = reactive({
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    });

    ///动态添加表单数组
    const addDomain = () => {
        let _index = dynamicValidateForm.index++
        let _json = {
            title : 'Q'+_index,
            tableName: '',
            tableValue : '',
            inputValue : '',
            key: Date.now(),
        };
        
        dynamicValidateForm.domains.push(_json);
        let _queryConditions = queryConditions.value == '-1' ? data.buttonActive : queryConditions.value;
        let _program = programConditionSymbol[_queryConditions] || '';
        data.formJsonList.push({
            title : 'Q'+_index,
            program : _program,
        });
        _formRefValue();
        };

        ///操作form表单（添加删除操作）
        const _formRefValue = () => {
            let _conditionEcho = '';
            data.buttonActive = '';
            if(dynamicValidateForm.domains.length == 0){
                dynamicValidateForm.conditionEcho = '';
                data.formJsonList = [];
            }
            let _list = [];
            data.formJsonList.map((item,index) => {
                
                _conditionEcho += item.title;
                if(queryConditions.value == '-1' || index != data.formJsonList.length-1){
                    _conditionEcho += item.program;
                }
                let _json = {...item};
                // if(_json.program == ''){
                //     _json.program = data.formJsonList[index+1]?.program ||'';
                //     console.log('json = ',_json);
                //     _list.push(_json);
                // }
                // if(item.program != '' && item.title != ''){
                //      _list.push(_json);
                // }
                 _list.push(_json);
            });
            console.log('条件 = ',_list);
            data.formJsonList = _list;
            
            dynamicValidateForm.conditionEcho = _conditionEcho;

            formRef.value
                .validate()
                .then(() => {
                    console.log('values', dynamicValidateForm.domains);
                })
                .catch(error => {
                console.log('error', error);
                });
        }


        ///剔除表单
        const removeDomain = (item) => {
            let index = dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                dynamicValidateForm.domains.splice(index, 1);
                let _formJsonList = [...data.formJsonList];
                let _index = data.formJsonList.findIndex(v=> v.title == item.title);
                let _json = data.formJsonList[_index+1] || null;
                if(_json != null && _json.title == ''){
                    console.log('jinlai ');
                    _formJsonList.splice(_index+1,1);
                }
               console.log('data.formJsonList[_index+1] =',data.formJsonList);
                console.log('_json =',_json);
                data.formJsonList = _formJsonList.filter(v => v.title != item.title)
            }
            
            _formRefValue();
        }


    return {
      queryConditions,
      radioStyle,
      dynamicValidateForm,
      formRef,
      addDomain,
      removeDomain,
      programCondition,
      onProgramClick,
      queryConditionsChange
    };
  },
   components: {
    PlusOutlined,
    MinusCircleFilled
  }
});

</script>   

<!-- Add "scoped" attribute to limit CSS to this component only -->

