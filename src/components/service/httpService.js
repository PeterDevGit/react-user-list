class httpService{
    request = (route, method, getParams = null, body = false, headers = false) =>
        new Promise((resolve, reject) => {

            let newFormatParams = '?';
            if(getParams){
                for (let key in getParams){
                    newFormatParams += key+'='+getParams[key]+'&'
                }
            }

            let fullDataInfo = {
                headers: {
                    'Authorization': "Basic U2FpQWRtaW46bFhRV3B0UUZzdlZ2ZElXeQ==",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method
            };

            if(body){
                fullDataInfo.body = JSON.stringify(body);
            }

            const fullPath = 'https://wordpress.msk-search.ru/wp-json/wp/v2' + route + newFormatParams;
            fetch(fullPath, fullDataInfo).then(response => {
                if(headers){
                    return resolve( {
                        users: response.json(),
                        wpTotal: response.headers.get('x-wp-total')
                    })
                }
                return resolve(response.json())
            }).catch(err => { console.error('err http: ', err); })
        })
}

export default new httpService()