//index.js
Page({
    data:{
        scrollH:0,
        //定义一个数组(很重要，否则下面的push()函数不好使)
        list:[],
        num:0,
        uploadImg:'../../images/icon.gif',
        uploadImgTxt:'拼命加载中,请稍后...',
        upload:false
        
    },
    onLoad:function(){
        var that=this;
        //获取设备的高度赋值给scroll-view高
        wx.getSystemInfo({
            success:function(res){
                console.log(res.windowHeight)
                that.setData({
                    scrollH:res.windowHeight-5
                })
            }
        })
    },

    //刚开始加载的时候进行数据请求
    onShow:function(){
        var that=this;
        GetImg(that);
    },
    //当滑动到底部的时候再进行一次数据请求
    bindDownload:function(){
        var that=this;
        GetImg(that);
    }
})

//通过num值得变化，从后台获取不同的数据
var num=0;
//获取图片函数
var GetImg=function(that){
    wx.request({
        url:'http://mr_cc.com/ceshi/item/item.php?page='+num,
        method:'GET',
        data:{},
        header:{
            'Accept':'application/json'
        },
        success:function(res){
            var list=that.data.list;
            for(var i=0;i<res.data.list.length;i++){
                list.push(res.data.list[i])
            }
            //console.log(res.data.list.length)
            //判断如果后台返回的数组长度为1，则停止num值++;停止传递信息
            if(res.data.list.length!=1){
                num++;
                that.setData({
                    Images:list,
                })
            }else{
                that.setData({
                    uploadImgTxt:'已经全部加载！',
                    uploadImg:'../../images/icon_02.png',
                })
                setTimeout(function(){
                    that.setData({
                        upload:true
                    })
                },1000)
                
            }
            
        }
    })
}