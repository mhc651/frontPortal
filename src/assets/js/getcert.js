/**
 * @file 内容验证
 * @author mhc（423822728@qq.com）
 */

var socket = null, pluginRequestID=0;
const getCert = {
  /*iE*/

  getCertBsf(serRand) {
    var textCertID="";
    var ret = obj.SOF_Login('','');
    if (ret != 0)
    {
      var ca_error = "未检测到UKey或Ukey未登陆"
      //alert(obj.SOF_GetReturnString());
      return 1;
    }
    var ret = obj.SOF_GetUserList();
    if (ret == "")
    {
      //alert(obj.SOF_GetReturnString());
      return;
    }
    var len = ret.length;
    var len2 = '38';
    var str2 = ret.substr(len-len2,len2);
    textCertID = str2;
    var ret = obj.SOF_ExportUserCert(textCertID);
    if (ret == "")
    {
      //alert(obj.SOF_GetReturnString());
      return;
    }
    var sign = obj.SOF_SignData(textCertID, serRand);
    if (sign == "")
    {
      //alert(obj.SOF_GetReturnString());
      return;
    }
    let params = {
      strData: serRand,
      strSign: sign,
      strCert: ret
    }
    return params
  },

  dealWithResponseMessage(respMessage, serR){
    //console.log("respMessage = " + respMessage);
    // 响应消息
    var resp = JSON.parse(respMessage);
    if (resp.PluginResponseValue.length > 0)
    {
      //listform.textOut.value = resp.PluginResponseValue;

      if (resp.PluginRequest == "Batch_SignData")
      {
        // 格式：签名值||证书数据
        var str = resp.PluginResponseValue;
        var pos = str.indexOf("||");
        if (pos == -1)
        {
          var omes = "响应消息格式错误";
          return;
        }
        // 证书数据
        var textCert = str.substr(pos + 2);
        // 签名值
        var textSign = str.substr(0, pos);
        let params = {
          strData: serR,
          strSign: textSign,
          strCert: textCert
        }
        return params
      }
    }
    else{
      var mhc1 =  1
      var omes = resp.PluginResponse;
      return 1
    }

  },

  getCertBsfNoIE(serR){
    var me = this
    var host = "ws://127.0.0.1:31212/";
    socket = new WebSocket(host);
    try
    {
      socket.onopen = function (msg)
      {
        console.log("CA连接成功！");
        pluginRequestID++;
        var req = {"PluginRequestID":pluginRequestID,"PluginRequest":"Batch_SignData","InData":serR};
        socket.send(JSON.stringify(req));
      };
      // socket.onclose = function (msg)
      // {
      //   alert("socket closed!");
      //   socket = null
      // };
      // socket.onerror  = function (msg)
      // {
      //   alert("socket error!");
      //   socket = null
      // };
      // 直接返回socket
      return socket;

      // socket.onmessage = function (msg)
      // {
      //   if (typeof msg.data == "string")
      //   {
      //     var updatas =  me.dealWithResponseMessage(msg.data, serR);
      //     return Promise.resolve(updatas)
      //     //return updatas
      //   }
      //   else
      //   {
      //     alert("非文本消息");
      //   }
      // };

    }
    catch (ex)
    {
      alert(ex.message);
      return false;
    }
  }

}

export default getCert
