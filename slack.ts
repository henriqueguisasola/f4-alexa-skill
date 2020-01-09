import fetch from 'node-fetch'

const TOKEN = 'xoxp-897101481383-894785777060-889965710673-fc2fd646791199643fa5137f9c5832fe'
const CHANNEL_ID = 'CSJBRMRDL'

export const sendMessageToSlack = async (message) => {
    await fetch('https://slack.com/api/chat.postMessage', {
        method: 'post',
        body: JSON.stringify({
            channel: CHANNEL_ID,
            text: message,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`,
        },
    })
}
