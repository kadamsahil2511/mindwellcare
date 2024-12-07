interface AIResponse {
  model: string;
  message: {
    role: string;
    content: string;
    images: null;
  };
  done: boolean;
}

export const analyzeAssessment = async (answers: { question: string; answer: string }[]) => {
  try {
    const messages = [
      {
        role: "user",
        content: `Please analyze these mental health assessment answers and provide a detailed report:
          ${answers.map(a => `Question: ${a.question}\nAnswer: ${a.answer}`).join('\n\n')}
          
          Please provide a comprehensive analysis including:
          1. Key concerns identified
          2. Potential risk factors
          3. Recommended actions
          4. Areas that need immediate attention`
      }
    ];

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',
        messages
      }),
    });

    const data: AIResponse = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Error analyzing assessment:', error);
    return 'Unable to analyze assessment at this time.';
  }
};

export const getChatResponse = async (
  message: string,
  assessmentReport?: string,
  chatHistory: { role: string; content: string }[] = []
) => {
  try {
    const context = assessmentReport 
      ? `Context from previous assessment: ${assessmentReport}\n\nUser's message: ${message}`
      : message;

    const messages = [
      ...chatHistory,
      {
        role: "user",
        content: context
      }
    ];

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',
        messages
      }),
    });

    const data: AIResponse = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Error getting chat response:', error);
    return 'I apologize, but I am unable to respond at the moment. Please try again later.';
  }
}; 