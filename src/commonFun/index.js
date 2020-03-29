import axios from 'axios';
//type:请求类型；url：请求接口api； data:传入参数，类型是对象,callback执行成功的回调函数
function myRequest(type, url, data, callback) {
    let sendData = ''
    for(let key in data) {
        sendData += key+'='+data[key]+'&'
    }
    sendData = sendData.substr(0, sendData.length - 1)
    if (window.plus) {
        var xhr = null;
        xhr = new plus.net.XMLHttpRequest();
        if (type.toLowerCase() === 'get') {
            xhr.open(type, url + '?' + sendData);
            xhr.send();
        } else {
            xhr.open(type, url);
            xhr.send(sendData);
        }
        xhr.onload = function (result) {
            callback(result)
        }
        return
    }
    if (type.toLowerCase() === 'get') {
        axios.get(url+'?'+sendData).then((res)=>{
            callback(res)
        })
    }else if(type.toLowerCase() === 'post'){
        axios.post(url,sendData).then((res)=>{
            callback(res)
        })
    }
}

export default myRequest