import type { FAQQuestion } from '@/types';

const cleanAnswerText = (text: string): string => {
  let cleanedText = text;
  cleanedText = cleanedText.replace(/```mermaid[\s\S]*?```/g, '');
  cleanedText = cleanedText.replace(/```/g, '');
  cleanedText = cleanedText.replace(/> \[![\w\s]+\]/g, '');
  cleanedText = cleanedText.replace(/\^\[\d+\]/g, '');
  cleanedText = cleanedText.replace(/[#*_`>|┌├└─→]/g, '');
  cleanedText = cleanedText.replace(/\\n/g, '\n'); // Convert escaped newlines to actual newlines for paragraph breaks
  cleanedText = cleanedText.replace(/\s\s+/g, ' ').trim();
  return cleanedText;
};

export function QuestionSchema({ question }: { question: FAQQuestion }) {
  const questionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: question.question,
    answerCount: 1,
    acceptedAnswer: {
      '@type': 'Answer',
      text: cleanAnswerText(question.answer),
      dateCreated: question.last_updated,
      upvoteCount: question.ratingCount && question.averageRating ? Math.round(question.averageRating * question.ratingCount / 5) : 0,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(questionSchema) }}
    />
  );
}
