const generate_password = (leng) => {
    let password = "";
    let symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=";
    for (let i = 0; i < leng; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
}

const cyr_to_latin = (text) => {
    return text.replace(/([а-яё])|([\s_-])|([^a-z\d])/gi,
        function (all, ch, space, words, i) {
            if (space || words) {
                return space ? '-' : '';
            }
            let code = ch.charCodeAt(0),
                index = code === 1025 || code === 1105 ? 0 :
                    code > 1071 ? code - 1071 : code - 1039,
                t = ['yo', 'a', 'b', 'v', 'g', 'd', 'e', 'zh',
                    'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p',
                    'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh',
                    'shch', '', 'y', '', 'e', 'yu', 'ya'
                ];
            return t[index];
        });
}

const nowDateFormat = (nowDate) => {

    let curr_date = nowDate.getDate()
    let curr_month = nowDate.getMonth() + 1
    let curr_year = nowDate.getFullYear()

    if(curr_date < 10){ curr_date = '0'+curr_date }
    if(curr_month < 10){ curr_month = '0'+curr_month }

    return (curr_date + "." + curr_month + "." + curr_year);
}

export { generate_password, nowDateFormat, cyr_to_latin }