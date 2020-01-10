import { getSlotValue } from 'ask-sdk-core'

export const handleIntent = (handlerInput) => {
    const value = getSlotValue(handlerInput.requestEnvelope, 'KEY')

    return 'Obrigado pelo sua participação!'
}
