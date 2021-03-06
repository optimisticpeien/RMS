var $;
var $form;
var form;
layui.config({
	base : "js/"
}).use(['form','layer','jquery','laydate'],function(){
	var layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,laydate = layui.laydate;
		$ = layui.jquery;
		form = layui.form;
		laydate.render({
			elem: '#birthday' //指定元素
			,max: 'new Date()'
		});
		
		//自定义验证规则
		form.verify({ 
			pass: [/(.+){6,16}$/, '密码必须6到16位']
			,repass: function(value){
				var repassvalue = $('#password').val();
				if(value != repassvalue){
					return '两次输入的密码不一致!';
				}
			}
		});
		
		$("#nickname").blur(function(){
			$.ajax({
	            type: "get",
	            url: "checkUserByNickname/"+$("#nickname").val(),
	            success:function(data){
	            	if(data.code!=0){
	            		top.layer.msg(data.msg);
	            		$("#nickname").val("");
	            		$("#nickname").focus();
	            	}
	            }
	        });
		});
		
		$("#eMail").blur(function(){
			$.ajax({
				type: "post",
				url: "checkUserByEmail/"+$("#eMail").val(),
				success:function(data){
					if(data.code!=0){
						top.layer.msg(data.msg);
						$("#eMail").val("");
						$("#eMail").focus();
					}
				}
			});
		});

 	form.on("submit(addUser)",function(data){
 		//弹出loading
 		var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
 		var msg,flag=false;
 		$.ajax({
    		type: "post",
            url: "insUser",
            async:false,
            data:data.field,
			dataType:"json",
			success:function(d){
				if(d.code==0){
		        	msg="用户添加成功，请通知用户查收邮件以激活账号！";
		        	flag=true;
		        	$("#auf")[0].reset();
				}else{
		        	msg=d.msg;
				}
			}
        });
 		setTimeout(function(){
 			top.layer.close(index);
 			if(flag){
 				top.layer.msg(msg,{icon: 1});
 			}else{
 				top.layer.msg(msg,{icon: 5});
 			}
 			//layer.closeAll("iframe");
 			//刷新父页面
	 		//parent.location.reload();
        },2000);
 		return false;
 	})
	
})