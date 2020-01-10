import fetch from 'node-fetch'

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
          'Authorization': `Bearer ${process.env.TOKEN}`,
        },
    })
}
