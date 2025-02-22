const axios = require('axios');


async function chatBot(prompt,callback) {
    
    const options = {
        method: 'POST',
        url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.CHAT_API,
          'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'
        },
        data: {
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          model: 'gpt-4-turbo-preview',
          max_tokens: 200,
          temperature: 0.9
        }
      };
      
      try {
          const response = await axios.request(options);

          console.log(response.data);

          callback(response.data.choices[0].message.content);
          
      } catch (error) {
          console.error(error);
      }

}


module.exports = chatBot;