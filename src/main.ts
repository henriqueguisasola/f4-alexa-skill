import { sendMessageToSlack } from './slack'
import { getSlotValue } from 'ask-sdk-core'

export const handleIntent = (handlerInput) => {
    const username = getSlotValue(handlerInput.requestEnvelope, 'username')
    console.log(username)

    sendMessageToSlack(`Mensagem\nCom\nquebra de linha ${username}`)
    return 'Obrigado pelo sua participação! Um professor da Future Four entrará em contato com você'
}
