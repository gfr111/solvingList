<template>
   <div class="classifyBox" :style="{height:heights}">
       <div class="headers">
           <div class="leftButton" @click="close">
               <image class="leftImg" src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png"/>
           </div>
           <text class="pageTitle">待办课程</text>
           <text class="nullBox">客户</text>
       </div>
       <div class="listBox" >
             <list :style="{height:height}" v-if="solvingList.length!=0">
              <cell v-for="(item,index) in solvingList" :key='index' @click="toDetail(item.traineeId,item.traineeName)">
                  <div class="listContent">
                      <div class="photoMess">
                        <div class="avatarBox">
                            <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultImg.png' class="avatar" v-if="item.photo==''||item.photo==null||item.photo==undefined||item.photo.indexOf('static')!=-1"/>
                            <image :src='item.photo' v-else  class="avatar" />
                        </div>
                        <div class="messBox">
                            <text class="trainerName">{{item.traineeName}}</text>
                            <span class="courseNameAndTime">
                                <text style="max-width:250px;lines:1;" class="courseNames">{{item.courseName}}</text><text class="courseTimes">/{{timestampToTime(item.createTime)}}</text> 
                            </span>
                        </div>                         
                      </div>
                       <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/toDeatail.png" class="rightImg"/>
                  </div>
              </cell>                     
             </list>
             <div :style="{height:height}" v-else>
              <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/appro.png" class="nullMess"/>
              <text class="nullTxt">暂无待办课程</text>
          </div>
       </div>
   </div>
</template>
<script>
  var TrainerNativeModule=weex.requireModule('nativeModule');
  var modal = weex.requireModule('modal');
   var stream = weex.requireModule('stream');
    export default {
        data:()=>({
             heights:null,
             height:null,
             token:'',
            //  webHost:'http://10.0.0.12:8080',
             webHost:'https://www.forzadata.cn',
             centerId:'',
             solvingList:[]
        }),
        created(){
            var that=this;
            that.heights=750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-30+'px';
            that.height=750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-160+'px';
                TrainerNativeModule.getMetaData(function(map){  
                    that.token=map.token;
                    that.centerId=map.centerId;
                });
                setTimeout(function(){
                    that.getList();
                },50)
            weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
                    TrainerNativeModule.close();
                    
              });
        },
        methods:{
            close(){
                 TrainerNativeModule.close();
            },
            getList(){
                var that=this;   
                stream.fetch({
                method: 'GET',
                url: that.webHost+'/api/weex/unPayCourses/'+that.centerId,
                type:'json',
                headers:{
                'X-AUTH-TOKEN':that.token,
                "Content-Type": 'application/json',
                }
                },function(ret) {
                    if(!ret.ok){
                        TrainerNativeModule.toast('网络错误！！');
                    }else{
                        if(ret.data.status!=0){
                             TrainerNativeModule.toast(ret.data);               
                        }else{
                            //  TrainerNativeModule.toast(ret.data.data.data);
                             that.solvingList=ret.data.data.data;
                        }                
                    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                })
            },
            //时间转换
            timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D=(date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())+ ':';
                var s = date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds();
                return Y+M+D+h+m+s;
            },
            toDetail(id,name){
                 //  TrainerNativeModule.toast(postData.otherMess.isTrainingCourse);
               TrainerNativeModule.goToBuyCourseDetail(id,name);
            },
        },
        watch:{
            '$route'(){
                this.created();
            }
        }
    }
</script>
<style scoped>
   .headers{
    width: 750px;
    height:88px;
    padding-left: 10px;
    padding-right: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-color: #EDF0F2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    background-color: #ffffff;
   }
   .leftButton{
       width: 100px;
       height: 88px;
       justify-content: center;
       align-items: center;
   }
   .leftImg{
       width: 48px;
       height: 48px;
   }
   .nullBox{
         width: 100px;
         height: 88px;
       justify-content: center;
       align-items: center;
       color:#ffffff;
   }
   .pageTitle{
       color:#303030;
       font-size: 34px;
   }
   .listBox{
       padding-top: 10px;
       padding-left: 40px;
       padding-right: 40px;
   }
    .listContent{
        padding: 30px 0;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        border-bottom-color: #EDF0F2;
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    .photoMess{
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
    .avatarBox{
        width: 100px;
        height: 100px;
        border-radius: 200px;
        margin-right: 30px;
    }
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 200px; 
    }
    .messBox{
       flex-direction: column;
      justify-content:center;
      align-items: flex-start
    }
    .trainerName{
        color: #303030;
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 8px;
    }
    .courseNameAndTime{
      
        flex-direction: row;
        align-items: center;
    }
    .courseNames{
       color: #C7C7C7;
        font-size: 24px;
    }
    .rightImg{
        width: 32px;
        height: 32px;
    }
    .courseTimes{
          color: #C7C7C7;
        font-size: 24px;
    }
    .nullMess{
        width: 372px;
        height: 420px;
        margin-top: 208px;
        margin-left: 190px;
        margin-bottom: 150px;
    }
    .nullTxt{
        font-size: 32px;
        color: #969696;
        text-align: center;
        /* width: 750px; */
    }
</style>
