import { useState } from "react";
import CodeBlock from "./CodeBlock.jsx";

// A quiz: a few multiple-choice questions at the end of a module.
// A wrong answer explains why, and the student can just pick again - no score, no fail state.
export default function QuizPage({ task, onSolved }) {
    // The chosen option for each question (its index), or null if not answered yet
    const [chosen, setChosen] = useState(() => task.questions.map(() => null));

    const isCorrect = (answers) =>
        task.questions.every((question, i) => answers[i] !== null && question.options[answers[i]].correct);

    function choose(questionIndex, optionIndex) {
        const next = chosen.map((c, i) => (i === questionIndex ? optionIndex : c));
        setChosen(next);
        if (isCorrect(next)) onSolved(task.id);
    }

    return (
        <section className="task">
            <h2>{task.id} {task.title}</h2>
            <p className="task-text">
                {task.text || "Tjek, om du har styr på modulet. Vælg et svar - er det forkert, får du at vide hvorfor, og så kan du bare prøve igen."}
            </p>

            {task.questions.map((question, qi) => {
                const pick = chosen[qi];
                const picked = pick === null ? null : question.options[pick];
                return (
                    <div key={qi} className="quiz-question">
                        <p className="quiz-q"><strong>{qi + 1}. {question.question}</strong></p>
                        {question.code && <CodeBlock className="quiz-code" code={question.code} />}

                        <div className="quiz-options">
                            {question.options.map((option, oi) => {
                                let className = "quiz-option";
                                if (pick === oi) className += option.correct ? " correct" : " wrong";
                                return (
                                    <button key={oi} className={className} onClick={() => choose(qi, oi)} aria-pressed={pick === oi}>
                                        {option.text}
                                    </button>
                                );
                            })}
                        </div>

                        {picked && (
                            <p className={picked.correct ? "box feedback ok" : "box feedback not-yet"}>
                                {picked.correct ? "Rigtigt. " : "Ikke helt. "}
                                {picked.why}
                            </p>
                        )}
                    </div>
                );
            })}

            {isCorrect(chosen) && (
                <p className="box feedback ok">Godt klaret! Du har svaret rigtigt på alle spørgsmålene.</p>
            )}
        </section>
    );
}
