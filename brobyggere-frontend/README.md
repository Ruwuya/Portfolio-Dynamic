# Python for brobyggere

A browser-based Python course for *brobyggere*: pupils in 8th–10th grade who visit a vocational school to try out the field. Most have never written code before. The course is in Danish and is meant to give them a taste of programming in one to four hours, not to get them through a curriculum.

**Live:** https://rehi01.skp-dp.sde.dk/brobyggere/

The Python code runs in the pupil's own browser with [Pyodide](https://pyodide.org). The server only hands out static files, so a whole class can use the course at the same time without any backend.

## What the course contains

| Module | Topic | Tasks |
|---|---|---|
| 1 | Hvad er kode? (`print`, several lines, comments, a first variable) | 4 + quiz |
| 2 | Variabler (naming rules, text vs. numbers, `str` and `int`) | 5 + quiz |
| 3 | Input (`input()`, joining text with `+`, `int()` and `str()`) | 4 + quiz |
| 4 | Tal og regning (`+ - * /`, calculating with variables, `+=`) | 4 + quiz |
| 5 | If-sætninger (`if`/`elif`/`else`, constants, `=` vs `==`, a password check) | 5 + quiz |
| 6 | Tilfældige tal (`random`, a guessing game with one guess) | 3 + quiz |
| 7 | Løkker (`for`, `range`, `while`, the finished guessing game) | 6 + quiz |
| – | Legeplads: a free editor with no task or check | – |

Modules 1–4 take about an hour. The rest is for longer days or quick pupils.

Every task has a short explanation, a code editor with a Kør button, an automatic check, hints shown one at a time, a solution that unlocks after two failed tries, and a "Godt at vide" box once the task is solved.

## Features

- **Real Python in the browser.** Pyodide (CPython compiled to WebAssembly) runs in a Web Worker.
- **`input()` works.** The program's question appears at the bottom of the output with an answer field underneath, like a terminal.
- **Infinite loops are stopped** after 5 seconds with a friendly message, instead of freezing the page.
- **Python's errors explained in Danish**, with the line number. This covers e.g. missing quotation marks, a missing colon, indentation, `=` instead of `==`, invalid variable names, `x` used as multiplication, and text + number.
- **Automatic checks** that test what the program *does*, not just what the code looks like (see below).
- **Syntax highlighting** in the editor, the quiz questions and the solutions.
- **Progress is saved** in the browser (localStorage), so a reload doesn't lose any work. "Start hele kurset forfra" clears everything for the next group.
- **Direct links** to every task, e.g. `/brobyggere/#5.3`.
- **Works on phones.** The menu folds away behind an "Opgaver" button.

## How it works

### Python in a Web Worker
[`public/worker.js`](public/worker.js) loads Pyodide from a CDN and runs the pupil's code. [`src/python.js`](src/python.js) starts the worker and exposes `runPython(code, inputs, seed)`.

The worker is what makes the 5-second limit possible: Python can't be interrupted from inside, but a worker can be killed. If no answer has arrived after 5 seconds, `python.js` terminates the worker and starts a fresh one.

### `input()` without blocking
A Web Worker can't pause and wait for the user to type something (not without special server headers). Instead, `input()` is replaced by a Python function that either returns an answer that's already known, or stops the program and reports the question to the page. The page asks the pupil, then **runs the whole program again from the start** with all the answers so far.

`random` gets the same seed on every rerun, so the secret number in the guessing game stays the same while the pupil keeps guessing.

### Checks
Each task in [`src/lessons.js`](src/lessons.js) has a `check(output, code, { run })` function. It returns `true`, or a message saying what's missing.

Simple tasks look at the output and the code. Tasks with `if`/`else` or `input()` use `run` to **run the pupil's code again in the background with other inputs**. For example, the guessing game is tested by replacing `random.randint(1, 10)` with a fixed number and checking that a guess that's too high, too low and correct each gets the right answer. This catches mistakes such as swapped messages, which a check of the code text alone would miss. The helper `expectOutput` keeps these checks short.

### Danish error messages
[`src/errors.js`](src/errors.js) reads Python's traceback, picks out the error type, the message and the line number, and maps the most common beginner mistakes to a Danish explanation. Python's own message is still available in a fold-out box.

### Syntax highlighting
[`src/highlight.js`](src/highlight.js) splits code into tokens (comment, text, number, keyword, built-in, constant) with one regular expression. The editor ([`CodeEditor.jsx`](src/components/CodeEditor.jsx)) is an ordinary `<textarea>` with transparent text, placed exactly on top of a `<pre>` that shows the same code in colour. This keeps the editor's own features: Tab, auto-indent after `:`, Ctrl+Enter to run, and normal undo.

## Project structure

```
public/
  worker.js            Pyodide in a Web Worker - runs the code and handles input()
src/
  App.jsx              Layout, navigation via the URL hash, progress
  lessons.js           All modules, tasks, quizzes and checks (the content of the course)
  python.js            Starts the worker, runPython(), the 5-second limit
  errors.js            Python errors explained in Danish
  highlight.js         Tokenizer for syntax highlighting
  storage.js           Progress in localStorage
  easterEgg.js         A small surprise for anyone who writes "67"
  components/
    TaskPage.jsx       A code task: editor, Kør, output, check, hints, solution
    QuizPage.jsx       A multiple-choice quiz at the end of each module
    CodeEditor.jsx     The editor with Tab, auto-indent and highlighting
    CodeBlock.jsx      Read-only code with highlighting (quizzes, solutions)
    InputBox.jsx       The answer field for input()
    Sidebar.jsx        The menu with modules and tasks
```

## Adding a task

All content is in [`src/lessons.js`](src/lessons.js). A code task looks like this:

```js
{
    id: "4.2",
    title: "Regn med variabler",
    text: "The explanation the pupil sees above the editor.",
    starter: "# The code already in the editor\n",
    solution: "number1 = 17\nnumber2 = 9\nresult = number1 + number2\nprint(result)",
    goodToKnow: "Shown when the task is solved.",
    hints: ["The first hint.", "The second, more specific hint."],
    check: (output, code) => {
        if (!lines(output).includes("26")) return "What's missing, in Danish.";
        return true;
    },
},
```

A quiz uses `type: "quiz"` and a list of `questions`, each with `options`, where exactly one has `correct: true`. Each wrong option has a `why` explaining the mistake.

New tasks should be added at the end of a module, so existing ids don't change and pupils' saved progress still matches.

## Running it locally

Requires Node.js.

```bash
npm install
npm run dev
```

Then open http://localhost:5173/brobyggere/. Run `npm run lint` to check the code with ESLint.

## Deployment

The course is built to static files and uploaded to the school's web server:

```bash
npm run build
```

Upload the **contents** of `dist/` to the `brobyggere/` folder on the server (via SFTP/FileZilla). The base path `/brobyggere/` is set in [`vite.config.js`](vite.config.js). Because navigation uses the URL hash (`#2.1`), no server rewrite rules are needed.

## Built with

- [React](https://react.dev) and [Vite](https://vite.dev)
- [Pyodide](https://pyodide.org) 0.26 for Python in the browser
- No other runtime dependencies

The tasks are inspired by the GF2 exercise booklet *Python Øvehæfte 2024*, made gentler for pupils with no prior experience.