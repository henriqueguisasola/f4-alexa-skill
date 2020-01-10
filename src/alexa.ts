import { getRequestType, getIntentName, SkillBuilders } from 'ask-sdk-core'
import { handleIntent } from './main'
import { LAUCH_MESSAGE, HELP_MESSAGE, ERROR_MESSAGE, FALLBACK_MESSAGE, CANCEL_MESSAGE } from './messages'

/* *
 * LaunchIntent triggers when a customer says the keyword to start your skill,
 * used as a welcome message to your user
 * */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    },
    handle(handlerInput) {
        const speakOutput = LAUCH_MESSAGE

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse()
    },
}

/* *
 * Código específico, nome da intent deve ser igual ao criado no console da alexa!
 * */
const FutureIntentHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'futureIntent'
    },
    handle: async (handlerInput) => {
        const speakOutput = handleIntent(handlerInput)

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse()
    },
}

/* *
 * HelpIntent triggers when a customer says the keyword to request alexa help,
 * used to tell your user what he can do with your skill.
 * */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    },
    handle(handlerInput) {
        const speakOutput = HELP_MESSAGE

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse()
    },
}

/* *
 * CancelIntent triggers when a customer says the keyword to stop the skill execution
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
    },
    handle(handlerInput) {
        const speakOutput = CANCEL_MESSAGE

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse()
    },
}
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent'
    },
    handle(handlerInput) {
        const speakOutput = FALLBACK_MESSAGE

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse()
    },
}
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`)
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse() // notice we send an empty response
    },
}
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    },
    handle(handlerInput) {
        const intentName = getIntentName(handlerInput.requestEnvelope)
        const speakOutput = handlerInput.t('REFLECTOR_MSG', {intentName})

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse()
    },
}
/* *
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
    canHandle() {
        return true
    },
    handle(handlerInput, error) {
        const speakOutput = ERROR_MESSAGE
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`)

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse()
    },
}

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FutureIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .lambda()
