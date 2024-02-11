import { useEffect, useState } from "react";
import "./Quiz.css";
import { getQuestions } from "../services/triviaAPIservice";
import { Quizs } from "../models/triviaResponse";

interface Props {
  catagories: string[];
}

const Quiz = ({ catagories }: Props) => {
  const [questions, setQustions] = useState<Quizs[]>([]);
  const [score, setScore] = useState<number>(0);
  useEffect(() => {
    if (catagories.length > 0) {
      getQuestions(catagories).then((res) => {
        setQustions(() => {
          let copy = [...res];
          copy.forEach((item) => {
            item.shuffledAnswers = shuffleAnswers([
              item.correctAnswer,
              ...item.incorrectAnswers,
            ]);
          });
          return copy;
        });
      });
    }
  }, [catagories]);
  const shuffleAnswers = (questions: string[]) => {
    let arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const checkAnswer = (i: number, e: any) => {
    if (questions[i].correctAnswer === e.target.getAttribute("data-answer")) {
      setScore((prev) => prev + 1);
      e.target.classList.add("correct");
      e.target.parentNode.childNodes.forEach((item: any) => {
        if (!item.classList.contains("correct")) {
          item.classList.add("wrong");
        }
      });
    } else {
      e.target.parentNode.childNodes.forEach((item: any) => {
        if (item.getAttribute("data-answer") === questions[i].correctAnswer) {
          item.classList.add("correct");
        } else {
          item.classList.add("wrong");
        }
      });
    }
    e.target.parentNode.childNodes.forEach((item: any) => {
      item.disabled = true;
    });
  };
  console.log(questions[0]);
  return (
    <div className="Quiz">
      <div id="score">{score}/50</div>
      {questions.map((question, i) => (
        <li key={i}>
          <p>{question.question.text}</p>
          {question.shuffledAnswers && (
            <div className="answers-container">
              {question.shuffledAnswers?.map((item, k) => (
                <button
                  key={k}
                  data-answer={item}
                  onClick={(e: any) => {
                    checkAnswer(i, e);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </li>
      ))}
    </div>
  );
};

export default Quiz;
