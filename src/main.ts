import { getSlotValue } from 'ask-sdk-core'
import { sendMessageToSlack } from './slack'

export const handleIntent = (handlerInput) => {
    const value = getSlotValue(handlerInput.requestEnvelope, 'KEY')

    sendMessageToSlack('Mensagem para o slack')

    return 'Obrigado pelo sua participação!'
}
