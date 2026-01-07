import OpenAI from 'openai';

// Initialize OpenAI client (will use environment variable OPENAI_API_KEY)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Generate AI response to user's review
export async function generateUserResponse(rating: number, review: string): Promise<string> {
  try {
    // If no API key, return a fallback response
    if (!process.env.OPENAI_API_KEY) {
      return getFallbackUserResponse(rating);
    }

    const prompt = `You are a customer service representative. A customer has submitted a ${rating}-star review. 
${review ? `Their review says: "${review}"` : 'They did not provide additional comments.'}

Generate a brief, friendly, and professional response (2-3 sentences) that:
- Thanks them for their feedback
- Acknowledges their ${rating}-star rating
- ${rating >= 4 ? 'Expresses appreciation and encourages them to continue using the service.' : 'Shows understanding and commitment to improvement.'}

Keep it concise and warm.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || getFallbackUserResponse(rating);
  } catch (error) {
    console.error('Error generating user response:', error);
    return getFallbackUserResponse(rating);
  }
}

// Generate AI summary of the review
export async function generateSummary(rating: number, review: string): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return getFallbackSummary(rating, review);
    }

    const prompt = `Summarize this customer review in one concise sentence (max 20 words):
Rating: ${rating}/5 stars
Review: ${review || 'No additional comments provided'}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
      temperature: 0.5,
    });

    return completion.choices[0]?.message?.content || getFallbackSummary(rating, review);
  } catch (error) {
    console.error('Error generating summary:', error);
    return getFallbackSummary(rating, review);
  }
}

// Generate recommended actions
export async function generateRecommendedActions(rating: number, review: string): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return getFallbackRecommendedActions(rating);
    }

    const prompt = `Based on this ${rating}-star review, suggest 1-2 specific, actionable next steps for the business:
${review ? `Review: "${review}"` : 'No additional comments provided.'}

Provide brief, practical recommendations (max 30 words).`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 80,
      temperature: 0.6,
    });

    return completion.choices[0]?.message?.content || getFallbackRecommendedActions(rating);
  } catch (error) {
    console.error('Error generating recommended actions:', error);
    return getFallbackRecommendedActions(rating);
  }
}

// Fallback functions when LLM is unavailable
function getFallbackUserResponse(rating: number): string {
  if (rating >= 4) {
    return 'Thank you for your positive feedback! We\'re thrilled to hear about your experience and appreciate you taking the time to share it with us.';
  } else if (rating === 3) {
    return 'Thank you for your feedback. We value your input and are always working to improve our service.';
  } else {
    return 'Thank you for sharing your feedback. We take all reviews seriously and are committed to addressing your concerns.';
  }
}

function getFallbackSummary(rating: number, review: string): string {
  if (review && review.trim().length > 0) {
    const truncated = review.length > 100 ? review.substring(0, 100) + '...' : review;
    return `${rating}-star review: ${truncated}`;
  }
  return `${rating}-star rating with no additional comments`;
}

function getFallbackRecommendedActions(rating: number): string {
  if (rating >= 4) {
    return 'Consider reaching out to thank the customer and ask if they would be willing to provide a testimonial.';
  } else if (rating === 3) {
    return 'Follow up with the customer to understand their experience better and identify areas for improvement.';
  } else {
    return 'Immediately contact the customer to address their concerns and offer a resolution. Review internal processes to prevent similar issues.';
  }
}
