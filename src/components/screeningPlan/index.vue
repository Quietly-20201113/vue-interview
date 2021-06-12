<style lang='scss' scoped src='./index.scss'></style>

<template>
    <div class="screening-plan-body">
             <a-card>
                <div class="screening-plan-right-head">
                    <a-card>
                        <div class="screening-plan-right-head-title">
                            <span>查询条件逻辑</span>
                        </div>
                        <a-radio-group v-model:value="queryConditions">
                            <a-radio :style="radioStyle" value="1">满足所有条件（并且）</a-radio>
                            <a-radio :style="radioStyle" value="2">满足任意条件（或者）</a-radio>
                            <a-radio :style="radioStyle" value="3">自定义逻辑</a-radio>
                         </a-radio-group>
                         <a-input class="screening-plan-right-head-input" v-model:value="conditionEcho"  disabled/>
                         <div class="button-div">
                            <a-button type="primary" class="screening-plan-right-head-button">且</a-button>
                            <a-button type="primary" class="screening-plan-right-head-button">或</a-button>
                            <a-button type="primary" class="screening-plan-right-head-button">(</a-button>
                            <a-button type="primary" class="screening-plan-right-head-button">)</a-button>
                         </div>
                         <a-card >
                            <template #extra>
                                    <a-button>
                                        <template #icon><PlusOutlined /></template>
                                        新增
                                    </a-button>
                                </template>
                                <div class="form-body">
                                    <a-form>
                                         <a-row class="head-form-row">
                                            <a-col :span="5" class="head-form-col">
                                                <a-form-item class="head-form-item">
                                                    <a-input  v-model:value="conditionEcho"  disabled/>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="5" class="head-form-col">
                                                 <a-form-item class="head-form-item">
                                                    <a-select></a-select>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="5" class="head-form-col">
                                                <a-form-item class="head-form-item">
                                                    <a-select></a-select>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="5" class="head-form-col">
                                                 <a-form-item class="head-form-item">
                                                    <a-input  v-model:value="conditionEcho"/>
                                                </a-form-item>
                                            </a-col>
                                            <a-col :span="4" class="head-form-col">
                                                 <div>
                                                     <a-button type="primary" class="form-delete-button">
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
</template>

<script>    
import { defineComponent, ref,reactive} from 'vue';
import { PlusOutlined,MinusCircleFilled } from "@ant-design/icons-vue";
export default defineComponent({
  name: 'ScreeningPlan',
  setup() {

      ///单选选中
    const queryConditions = ref('1');

    const radioStyle = reactive({
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        });
    
    ///内容插值
    const conditionEcho = ref('丁平');

    return {
      queryConditions,
      conditionEcho,
      radioStyle
    };
  },
   components: {
    PlusOutlined,
    MinusCircleFilled
  }
});

</script>   

<!-- Add "scoped" attribute to limit CSS to this component only -->

