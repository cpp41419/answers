import type { FAQQuestion } from '@/types';

const cleanAnswerText = (text: string): string => {
  // A best-effort cleaning of markdown/custom syntax for plain text schema
  let cleanedText = text;
  // Remove mermaid blocks
  cleanedText = cleanedText.replace(/```mermaid[\s\S]*?```/g, '');
  // Remove code fences
  cleanedText = cleanedText.replace(/```/g, '');
  // Remove callout headers like > [!tip]
  cleanedText = cleanedText.replace(/> \[![\w\s]+\]/g, '');
  // Remove footnotes like ^[1]
  cleanedText = cleanedText.replace(/\^\[\d+\]/g, '');
  // Remove markdown characters and box drawing chars
  cleanedText = cleanedText.replace(/[#*_`>|┌├└─→]/g, '');
  // Collapse multiple newlines/spaces into a single space
  cleanedText = cleanedText.replace(/\s\s+/g, ' ').trim();
  return cleanedText;
};

export function FaqSchema({ questions }: { questions: FAQQuestion[] }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: cleanAnswerText(q.answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
