const validate = ( option, value) => {
    switch (option.type) {
        case 'text': {
            return value.length < option.minLength
                ? 'Должно быть минимум ' + option.minLength + ' буквы'
                : value.length > option.maxLength
                ? 'Имя должно быть не более 60 символов'
                : ''
        }
        case 'phone': {
            return /\D/.test(value)
                ? 'Должны быть только цыфры'
                : ''
        }
        case 'email': {
            return /^([a-z0-9_.-])+@[a-z0-9-]+.([a-z]{2,4}.)?[a-z]{2,4}$/i.test(value)
                ? ''
                : 'Email не валидный'
        }
        default: return ''
    }

}

export default validate