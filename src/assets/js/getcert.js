/**
 * @file 内容验证
 * @author mhc（423822728@qq.com）
 */

const getCert = {

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
      strCert: ret,
    }
    return params
  },
}

export default getCert
