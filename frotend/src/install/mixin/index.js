import toasted from 'vue-toasted'
import Vue from 'vue'
Vue.use(toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})
Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)
Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Erro na operação!' : payload.msg,
    { type: 'error', icon: 'close' }
)
Vue.mixin({
    methods: {
        $message (mensagem = 'Ok', type = 'error') {
            if (type === 'error') {
                Vue.toasted.global.defaultError({msg: mensagem})
            } else if (type === 'success'){
                Vue.toasted.global.defaultSuccess({ msg: mensagem })
            }
        }
    }
})