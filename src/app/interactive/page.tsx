'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Terminal, Lightbulb, CheckCircle2, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const quizQuestions = [
  {
    question: "What will be logged to the console?",
    code: "console.log(typeof null);",
    options: ["'null'", "'object'", "'undefined'", "'function'"],
    answer: "'object'",
    explanation: "This is a long-standing bug in JavaScript. The `typeof null` returns 'object', which is incorrect but maintained for historical reasons."
  },
  {
    question: "What is the output of this code?",
    code: "console.log(0.1 + 0.2 === 0.3);",
    options: ["true", "false", "undefined", "TypeError"],
    answer: "false",
    explanation: "JavaScript uses floating-point numbers, which can't represent all decimals with perfect precision. `0.1 + 0.2` results in a value slightly different from `0.3`."
  },
  {
    question: "What will this code output?",
    code: "console.log('5' + 3);",
    options: ["8", "'53'", "NaN", "TypeError"],
    answer: "'53'",
    explanation: "The `+` operator, when used with a string and a number, performs string concatenation. It converts the number `3` to a string and joins it with '5'."
  },
  {
    question: "What will be the value of `b`?",
    code: "const a = {};\nconst b = {};\nconsole.log(a === b);",
    options: ["true", "false", "null", "undefined"],
    answer: "false",
    explanation: "Objects in JavaScript are compared by reference, not by value. Since `a` and `b` are two separate objects in memory, they are not equal."
  },
  {
    question: "What does this expression evaluate to?",
    code: "console.log([] + {});",
    options: ["'[]{}'", "'[object Object]'", "0", "TypeError"],
    answer: "'[object Object]'",
    explanation: "When using the `+` operator, JavaScript's type coercion rules are applied. The empty array `[]` is converted to an empty string `''`. The empty object `{}` is converted to the string `'[object Object]'`. The result is the concatenation of these two strings."
  }
];

export default function InteractivePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.answer;

  const handleNextQuestion = () => {
    if (isAnswered && isCorrect) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleSubmitAnswer = () => {
      if(selectedOption) {
          setIsAnswered(true);
      }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  if (showResult) {
    // We need to add the final point if the last question was answered correctly
    const finalScore = isCorrect ? score + 1 : score;
    const isWinner = finalScore > quizQuestions.length / 2;

    return (
      <div className="container mx-auto max-w-2xl py-12 px-4 flex items-center justify-center min-h-[60vh]">
        {isWinner && windowSize.width > 0 && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />}
        <Card className="text-center w-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl animate-in fade-in-50">
          <CardHeader>
            <div className="flex justify-center items-center mb-4">
              {isWinner ? (
                <ThumbsUp className="h-16 w-16 text-green-500" />
              ) : (
                <ThumbsDown className="h-16 w-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-3xl">{isWinner ? 'Congratulations!' : 'Better Luck Next Time!'}</CardTitle>
            <CardDescription className="text-lg">You've completed the JavaScript Quirks Quiz.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className={`text-5xl font-bold ${isWinner ? 'text-green-500' : 'text-red-500'}`}>
              {finalScore} / {quizQuestions.length}
            </p>
            <p className="text-muted-foreground">{isWinner ? "You're a true JavaScript wizard!" : "Don't worry, these questions are tricky!"}</p>
            <Button onClick={handleRestartQuiz} size="lg">
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="transition-transform duration-300 ease-in-out hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
             <Terminal/> JavaScript Quirks Quiz
          </CardTitle>
          <CardDescription>Test your knowledge of JavaScript's tricky parts. Question {currentQuestionIndex + 1} of {quizQuestions.length}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Card className="bg-secondary/30">
                <CardContent className="p-4">
                    <p className="font-medium mb-2">{currentQuestion.question}</p>
                    <pre className="bg-background/50 p-4 rounded-md text-sm whitespace-pre-wrap font-code">
                        <code>{currentQuestion.code}</code>
                    </pre>
                </CardContent>
            </Card>

            <RadioGroup
                value={selectedOption || ''}
                onValueChange={setSelectedOption}
                disabled={isAnswered}
                className="gap-3"
            >
                {currentQuestion.options.map((option, index) => (
                  <Label key={index} htmlFor={`option-${index}`} className={`flex items-center space-x-3 p-3 rounded-md border-2 transition-all ${selectedOption === option ? 'border-primary' : 'border-border'} ${isAnswered ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-primary'}`}>
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <span className="text-base font-mono">{option}</span>
                  </Label>
                ))}
            </RadioGroup>
            
            <Separator />

            {isAnswered ? (
                 <div className="space-y-4 animate-in fade-in duration-500">
                    <div className={`p-4 rounded-md flex items-start gap-3 ${isCorrect ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-red-500/10 text-red-700 dark:text-red-300'}`}>
                        {isCorrect ? <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" /> : <XCircle className="h-5 w-5 mt-0.5 shrink-0" />}
                        <div>
                            <p className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
                            {!isCorrect && <p className="text-sm">The correct answer is: <span className="font-mono">{currentQuestion.answer}</span></p>}
                        </div>
                    </div>
                     <div className="p-4 rounded-md flex items-start gap-3 bg-blue-500/10 text-blue-700 dark:text-blue-300">
                        <Lightbulb className="h-5 w-5 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-bold">Explanation</p>
                            <p className="text-sm">{currentQuestion.explanation}</p>
                        </div>
                    </div>
                    <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                 </div>
            ) : (
                <Button onClick={handleSubmitAnswer} className="w-full" disabled={!selectedOption}>
                    Submit Answer
                </Button>
            )}

        </CardContent>
      </Card>
    </div>
  );
}
