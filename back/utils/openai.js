const axios = require('axios');
//async function to connect and prompt open ai with api key
async function getLeisureSuggestionOpenAI(taskName) {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `Suggest one non productive or leisure activity for someone that wants to complete this task: "${taskName}" . Give me only the activity, nothing else, 20 tokens max`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un asistente creativo que sugiere actividades de descanso y ocio.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 50
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
}

module.exports = getLeisureSuggestionOpenAI;
