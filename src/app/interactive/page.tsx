
'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Terminal, Lightbulb, CheckCircle2, XCircle, ThumbsUp, ThumbsDown, ArrowLeft, Code, Pilcrow, FileCode } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const quizData = {
  'JavaScript': {
    icon: (props: any) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>JavaScript</title><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.82-2.22-2.123-3.345-.81-.675-1.636-1.26-2.437-1.785.12-.135.255-.27.39-.42.63-.705.945-1.425.945-2.16 0-.75-.33-1.44-.99-2.07-.645-.63-1.44-.945-2.385-.945-1.02 0-1.86.345-2.52 1.035-.66.69-.99 1.515-.99 2.475 0 1.035.33 1.89.99 2.565.66.675 1.515 1.012 2.565 1.012.705 0 1.32-.165 1.845-.495.24-.15.465-.345.675-.585.525.465 1.11.99 1.755 1.575.81.675 1.635 1.26 2.475 1.755.255.15.51.285.765.405.09.045.18.06.27.06.24 0 .465-.09.66-.27.195-.18.285-.405.285-.675 0-.195-.06-.39-.18-.585zm-9.015-3.525c-.27-.285-.405-.63-.405-1.035 0-.42.135-.78.405-1.08.27-.3.615-.45 1.035-.45.42 0 .78.15 1.08.45.3.3.45.66.45 1.08 0 .405-.15.75-.45 1.035-.3.285-.66.435-1.08.435-.42 0-.765-.15-1.035-.435zM4.78 18.284c-.18-1.095-.824-2.22-2.128-3.344-.81-.676-1.637-1.26-2.437-1.786.12-.134.255-.27.39-.42.63-.705.945-1.425.945-2.16 0-.75-.33-1.44-.99-2.07-.645-.63-1.44-.945-2.385-.945-1.02 0-1.86.345-2.52 1.035-.66.69-.99 1.515-.99 2.475 0 1.035.33 1.89.99 2.565.66.675 1.514 1.013 2.564 1.013.706 0 1.32-.165 1.846-.495.24-.15.465-.345.675-.585.525.465 1.11.99 1.755 1.575.81.675 1.635 1.26 2.475 1.755.255.15.51.285.765.405.09.045.18.06.27.06.24 0 .465-.09.66-.27.195-.18.285-.405.285-.675 0-.195-.06-.39-.18-.585zM1.96 14.76c-.27-.284-.405-.63-.405-1.036 0-.42.135-.78.405-1.08.27-.3.615-.45 1.035-.45.42 0 .78.15 1.08.45.3.3.45.66.45 1.08 0 .405-.15.75-.45 1.035-.3.285-.66.436-1.08.436-.42 0-.765-.15-1.035-.435z" fill="currentColor"/></svg>,
    description: "Test your knowledge of JavaScript's tricky parts and weird behaviors.",
    questions: [
        {
            question: "What will `console.log(typeof null)` output?",
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
            question: "What will `[] + {}` evaluate to?",
            code: "console.log([] + {});",
            options: ["'[]{}'", "'[object Object]'", "0", "TypeError"],
            answer: "'[object Object]'",
            explanation: "When using the `+` operator, JavaScript's type coercion rules are applied. The empty array `[]` is converted to an empty string `''`. The empty object `{}` is converted to the string `'[object Object]'`. The result is the concatenation of these two strings."
        }
    ]
  },
  'Python': {
    icon: (props: any) => <Pilcrow {...props} />,
    description: "How well do you know Python's syntax and standard library quirks?",
    questions: [
      {
        question: "What is the output of `print('hello'[-1])`?",
        code: "print('hello'[-1])",
        options: ["'h'", "'o'", "IndexError", "'l'"],
        answer: "'o'",
        explanation: "Python supports negative indexing for sequences. `-1` refers to the last element, `-2` to the second last, and so on."
      },
      {
        question: "What will be the value of `my_list` after this code runs?",
        code: "my_list = [1, 2, 3]\nmy_list.append([4, 5])",
        options: ["[1, 2, 3, [4, 5]]", "[1, 2, 3, 4, 5]", "TypeError", "[1, 2, 3, 4]"],
        answer: "[1, 2, 3, [4, 5]]",
        explanation: "The `append()` method adds its argument as a single element to the end of a list. The list `[4, 5]` is added as one nested element."
      },
      {
        question: "What does `print(type(lambda: None))` output?",
        code: "print(type(lambda: None))",
        options: ["<class 'function'>", "<class 'lambda'>", "<class 'NoneType'>", "SyntaxError"],
        answer: "<class 'function'>",
        explanation: "Lambda expressions in Python create anonymous functions. Their type is simply 'function', just like functions defined with `def`."
      }
    ]
  },
  'HTML': {
    icon: (props: any) => <FileCode {...props} />,
    description: "Challenge your understanding of HTML tags, attributes, and semantics.",
    questions: [
      {
        question: "Which of these tags is a 'void' element (cannot have content)?",
        code: "1. <div>\n2. <p>\n3. <br>\n4. <span>",
        options: ["<div>", "<span>", "<br>", "<p>"],
        answer: "<br>",
        explanation: "Void elements in HTML are elements that cannot have any child nodes (i.e., nested elements or text). `<br>`, `<img>`, `<hr>`, and `<input>` are common examples."
      },
      {
        question: "What is the purpose of the `<datalist>` tag?",
        code: "<label for='browser'>Choose:</label>\n<input list='browsers' name='browser' id='browser'>\n<datalist id='browsers'>...</datalist>",
        options: ["To create a dropdown list", "To style a list of data", "To provide autocomplete options for an <input>", "To define a list of commands"],
        answer: "To provide autocomplete options for an <input>",
        explanation: "The `<datalist>` element contains a set of `<option>` elements that represent predefined options for an `<input>` element. It creates an autocomplete feature."
      },
      {
        question: "Which attribute is used to make an input field required?",
        code: "<input type='text' ...>",
        options: ["validate", "mandatory", "required", "important"],
        answer: "required",
        explanation: "The `required` boolean attribute specifies that the user must fill in a value before submitting a form."
      }
    ]
  }
};

type Language = keyof typeof quizData;

export default function InteractivePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
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
  
  if (!selectedLanguage) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="text-center mb-12">
            <div className="inline-block rounded-full p-3 bg-primary/10 mb-4 ring-4 ring-primary/5">
                <Code className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Tech Quiz Arena</h1>
            <p className="text-muted-foreground mt-2 text-lg">Choose your battlefield and test your knowledge.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 animate-in fade-in-50 duration-500">
          {Object.keys(quizData).map((lang) => {
            const language = lang as Language;
            const Icon = quizData[language].icon;
            return (
              <Card 
                key={language} 
                onClick={() => setSelectedLanguage(language)}
                className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex flex-col text-center"
              >
                <CardHeader>
                  <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-2">
                    <Icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle>{language}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{quizData[language].description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const quiz = quizData[selectedLanguage];
  const quizQuestions = quiz.questions;
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

  const handleRestartQuiz = (changeLanguage = false) => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    if (changeLanguage) {
        setSelectedLanguage(null);
    }
  };

  if (showResult) {
    const finalScore = isAnswered && isCorrect ? score + 1 : score;
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
            <CardDescription className="text-lg">You've completed the {selectedLanguage} Quirks Quiz.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className={`text-5xl font-bold ${isWinner ? 'text-green-500' : 'text-red-500'}`}>
              {finalScore} / {quizQuestions.length}
            </p>
            <p className="text-muted-foreground">{isWinner ? "You're a true wizard!" : "Don't worry, these questions are tricky!"}</p>
            <div className='flex gap-2 justify-center'>
                <Button onClick={() => handleRestartQuiz(false)} size="lg">
                 Play Again
                </Button>
                <Button onClick={() => handleRestartQuiz(true)} size="lg" variant="outline">
                    Change Language
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => handleRestartQuiz(true)}>
            <ArrowLeft className="mr-2 h-4 w-4"/>
            Change Language
        </Button>
      </div>
      <Card className="transition-transform duration-300 ease-in-out hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
             <Terminal/> {selectedLanguage} Quirks Quiz
          </CardTitle>
          <CardDescription>Test your knowledge of {selectedLanguage}'s tricky parts. Question {currentQuestionIndex + 1} of {quizQuestions.length}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="p-4 space-y-2 rounded-lg bg-secondary/30">
                <div className="font-medium">{currentQuestion.question}</div>
                <pre className="bg-background/50 p-4 rounded-md text-sm whitespace-pre-wrap font-code">
                    <code>{currentQuestion.code}</code>
                </pre>
            </div>

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

