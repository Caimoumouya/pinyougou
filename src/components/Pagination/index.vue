<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)" >上一页</button>
      <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
     
      <button v-if="startNumAndEndNum.start > 2">···</button>
      
      <!-- v-if显示start到end部分，隐藏1到start部分 -->
      <!-- v-if不能和v-for同时使用，改为v-show -->
      <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
      
      <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
      <button v-if="(startNumAndEndNum.end < totalPage)"  @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
      <button :disabled="pageNo==totalPage"  @click="$emit('getPageNo',pageNo+1)">下一页</button>
      
      <button style="margin-left: 30px">共 {{totalPage}} 条</button>
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      props:['pageNo','pageSize','total','continues'],
      computed:{
        totalPage(){
            // 向上取整
            return Math.ceil(this.total/this.pageSize);
        },
        // 计算连续页码的起始数字与结束数字[连续页码至少是5]
        startNumAndEndNum(){
            // 解构，就不用this了
            const {continues,pageNo,totalPage} = this;
            let start = 0, end = 0;
            // 不正常现象[总页数没有连续页码多]
            if(continues > totalPage){
                start = 1;
                end = totalPage;
            }else{
                // 正常现象
                // parseInt:取整
                start = pageNo - parseInt(continues/2);
                end = pageNo + parseInt(continues/2);
                // start出现0或负数纠正
                if(start <1){
                    start = 1;
                    end = continues;
                }
                if(end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return {start,end};
            
        }
      }
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
    .active{
      background-color: skyblue;
    }
  </style>
  