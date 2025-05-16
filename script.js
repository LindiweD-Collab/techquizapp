
const views = {
    setup: document.getElementById('setup-view'),
    quiz: document.getElementById('quiz-view'),
    score: document.getElementById('score-view'),
    admin: document.getElementById('admin-view'),
    leaderboard: document.getElementById('leaderboard-view')
};
const leaderboardUserSelect = document.getElementById('leaderboardUserSelect');
const removeUserScoresBtn = document.getElementById('removeUserScoresBtn');
const clearAllLeaderboardBtn = document.getElementById('clearAllLeaderboardBtn')
const userNameInput = document.getElementById('userName');
const categorySelect = document.getElementById('categorySelect');
const startQuizBtn = document.getElementById('startQuizBtn');
const toggleAdminViewBtn = document.getElementById('toggleAdminViewBtn');
const viewLeaderboardBtn = document.getElementById('viewLeaderboardBtn');
const timerDisplay = document.getElementById('timerDisplay');
const questionCounterDisplay = document.getElementById('questionCounter');
const progressBar = document.getElementById('progressBar');
const questionTextElem = document.getElementById('questionText');
const answerOptionsElem = document.getElementById('answerOptions');
const feedbackText = document.getElementById('feedbackText');
const userFinalScoreDisplay = document.getElementById('userFinalScore');
const highScoresListScoreViewElem = document.getElementById('highScoresListScoreView');
const playAgainBtn = document.getElementById('playAgainBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const viewLeaderboardFromScoreBtn = document.getElementById('viewLeaderboardFromScoreBtn');
const leaderboardListElem = document.getElementById('leaderboardList');
const backToHomeFromLeaderboardBtn = document.getElementById('backToHomeFromLeaderboardBtn');
const maxQuestionsConfigInput = document.getElementById('maxQuestionsConfig');
const adminCategorySelect = document.getElementById('adminCategorySelect');
const newCategoryNameInput = document.getElementById('newCategoryName');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const removeCategoryBtn = document.getElementById('removeCategoryBtn');
const questionTextAdminInput = document.getElementById('questionTextAdmin');
const optionInputsAdmin = [
    document.getElementById('option1Admin'),
    document.getElementById('option2Admin'),
    document.getElementById('option3Admin'),
    document.getElementById('option4Admin')
];
const addQuestionBtn = document.getElementById('addQuestionBtn');
const adminFeedback = document.getElementById('adminFeedback');
const backToUserViewBtn = document.getElementById('backToUserViewBtn');

let currentUserName = '';
let currentCategory = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

let quizData = {
    categories: {
        "JavaScript Basics": [
            { id: "js1", question: "What keyword is used to declare a variable in JavaScript?", options: ["var", "let", "const", "all of the above"], answer: "all of the above" },
            { id: "js2", question: "Which company developed JavaScript?", options: ["Netscape", "Microsoft", "Sun Microsystems", "Google"], answer: "Netscape" },
            { id: "js3", question: "What is `typeof null`?", options: ["object", "null", "undefined", "string"], answer: "object" },
            { id: "js4", question: "Which method is used to write to the browser console?", options: ["console.log()", "document.write()", "window.alert()", "console.write()"], answer: "console.log()" },
            { id: "js5", question: "What does 'NaN' stand for?", options: ["Not a Number", "No Available Name", "Null and None", "Negative Absolute Number"], answer: "Not a Number" },
            { id: "js6", question: "How do you create a function in JavaScript?", options: ["function myFunction()", "def myFunction():", "create function myFunction()", "function:myFunction()"], answer: "function myFunction()" },
            { id: "js7", question: "How do you call a function named 'myFunction'?", options: ["myFunction()", "call myFunction()", "execute myFunction", "myFunction.call"], answer: "myFunction()" },
            { id: "js8", question: "How to write an IF statement in JavaScript?", options: ["if (i == 5)", "if i = 5 then", "if i == 5 then", "if i = 5"], answer: "if (i == 5)" },
            { id: "js9", question: "How does a FOR loop start?", options: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)"], answer: "for (i = 0; i <= 5; i++)" },
            { id: "js10", question: "How can you add a comment in JavaScript?", options: ["//This is a comment", "", "'This is a comment", "/* This is a comment */"], answer: "//This is a comment" },
            { id: "js11", question: "What is the correct way to write a JavaScript array?", options: ["var colors = ['red', 'green', 'blue']", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green')"], answer: "var colors = ['red', 'green', 'blue']" },
            { id: "js12", question: "Which event occurs when the user clicks on an HTML element?", options: ["onclick", "onmouseclick", "onchange", "onmouseover"], answer: "onclick" }
        ],
        "HTML Fundamentals": [
            { id: "html1", question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTransfer Markup Language", "HyperText and links Markup Language"], answer: "HyperText Markup Language" },
            { id: "html2", question: "Which HTML tag is used to define an internal style sheet?", options: ["<style>", "<script>", "<css>", "<link>"], answer: "<style>" },
            { id: "html3", question: "Which HTML element is used to specify a footer for a document or section?", options: ["<footer>", "<bottom>", "<section-footer>", "<foot>"], answer: "<footer>" },
            { id: "html4", question: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<lb>", "<break>", "<newline>"], answer: "<br>" },
            { id: "html5", question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?", options: ["alt", "src", "title", "longdesc"], answer: "alt" },
            { id: "html6", question: "Which doctype is correct for HTML5?", options: ["<!DOCTYPE html>", "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN'>", "<!DOCTYPE HTML5>", "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN'>"], answer: "<!DOCTYPE html>" },
            { id: "html7", question: "Which HTML element is used for the largest heading?", options: ["<h1>", "<heading>", "<h6>", "<head>"], answer: "<h1>" },
            { id: "html8", question: "What is the correct HTML for creating a hyperlink?", options: ["<a href='url'>link text</a>", "<link src='url'>link text</link>", "<a>url</a>", "<hyperlink>url</hyperlink>"], answer: "<a href='url'>link text</a>" },
            { id: "html9", question: "How can you open a link in a new tab/browser window?", options: ["<a href='url' target='_blank'>", "<a href='url' new>", "<a href='url' target='new'>", "<a href='url' open='new_tab'>"], answer: "<a href='url' target='_blank'>" },
            { id: "html10", question: "Which of these elements are all <table> elements?", options: ["<table><tr><td>", "<table><head><tfoot>", "<thead><body><tr>", "<table><tr><tt>"], answer: "<table><tr><td>" },
            { id: "html11", question: "How can you make a numbered list?", options: ["<ol>", "<ul>", "<dl>", "<list>"], answer: "<ol>" },
            { id: "html12", question: "What is the correct HTML for making a checkbox?", options: ["<input type='checkbox'>", "<checkbox>", "<check>", "<input type='check'>"], answer: "<input type='checkbox'>" }
        ],
        "CSS Flexbox": [
            { id: "flex1", question: "Which property is used to make a container a flex container?", options: ["display: flex;", "flex-direction: row;", "align-items: center;", "justify-content: space-between;"], answer: "display: flex;" },
            { id: "flex2", question: "What does `justify-content: center;` do in a flex container?", options: ["Aligns items to the center of the main axis", "Aligns items to the center of the cross axis", "Stretches items to fill the container", "Distributes space around items"], answer: "Aligns items to the center of the main axis" },
            { id: "flex3", question: "Which `align-items` value stretches flex items to fill the container's cross axis?", options: ["stretch", "center", "flex-start", "baseline"], answer: "stretch" },
            { id: "flex4", question: "The `flex-direction` property defines:", options: ["The direction flex items are placed in the flex container", "The direction of the text", "The direction of the container itself", "How items wrap"], answer: "The direction flex items are placed in the flex container" },
            { id: "flex5", question: "What does `flex-wrap: wrap;` do?", options: ["Allows items to wrap to the next line if there isn't enough space", "Reverses the order of items", "Makes items shrink to fit", "Stretches items"], answer: "Allows items to wrap to the next line if there isn't enough space" },
            { id: "flex6", question: "The `order` property for a flex item:", options: ["Controls the order in which items appear in the flex container", "Orders items alphabetically", "Sets the z-index", "Is not a valid flex property"], answer: "Controls the order in which items appear in the flex container" },
            { id: "flex7", question: "Which property aligns a single flex item on the cross-axis, overriding `align-items`?", options: ["align-self", "justify-self", "place-self", "self-align"], answer: "align-self" },
            { id: "flex8", question: "`flex-grow: 1;` on a flex item means:", options: ["The item will take up available space along the main axis", "The item will grow to 100px", "The item is the first item", "The item has a fixed size"], answer: "The item will take up available space along the main axis" },
            { id: "flex9", question: "What is the default value of `flex-direction`?", options: ["row", "column", "row-reverse", "column-reverse"], answer: "row" },
            { id: "flex10", question: "To distribute space evenly between flex items, you can use:", options: ["justify-content: space-around;", "justify-content: flex-start;", "align-content: space-between;", "gap: auto;"], answer: "justify-content: space-around;" },
            { id: "flex11", question: "The `flex-basis` property specifies:", options: ["The initial main size of a flex item", "The base font size", "The minimum width of an item", "The maximum height of an item"], answer: "The initial main size of a flex item" },
            { id: "flex12", question: "Which is a shorthand property for `flex-grow`, `flex-shrink`, and `flex-basis`?", options: ["flex", "flex-flow", "flex-item", "flex-container"], answer: "flex" }
        ],
        "CSS Grid": [
            { id: "grid1", question: "Which property is used to make a container a grid container?", options: ["display: grid;", "grid-template-columns: auto;", "grid-gap: 10px;", "position: grid;"], answer: "display: grid;" },
            { id: "grid2", question: "How do you define three columns of equal width in CSS Grid?", options: ["grid-template-columns: 1fr 1fr 1fr;", "grid-columns: 3;", "columns: 1fr 1fr 1fr;", "grid-template: repeat(3, 1fr);"], answer: "grid-template-columns: 1fr 1fr 1fr;" },
            { id: "grid3", question: "What does the `grid-gap` property define?", options: ["The space between grid cells (gutters)", "The size of the grid tracks", "The alignment of items within the grid", "The overall width of the grid"], answer: "The space between grid cells (gutters)" },
            { id: "grid4", question: "The `fr` unit in CSS Grid stands for:", options: ["Fractional unit", "Free space ratio", "Fixed ratio", "Frame resolution"], answer: "Fractional unit" },
            { id: "grid5", question: "How can you make a grid item span 2 columns starting from column line 1?", options: ["grid-column: 1 / 3;", "grid-column-span: 2;", "grid-area: 1 / 1 / 1 / 3;", "column-span: 2;"], answer: "grid-column: 1 / 3;" },
            { id: "grid6", question: "Which property is a shorthand for `grid-row-gap` and `grid-column-gap`?", options: ["gap", "grid-spacing", "gutter", "grid-margin"], answer: "gap" },
            { id: "grid7", question: "`grid-auto-flow: column;` will:", options: ["Fill the grid column by column", "Create columns automatically", "Make all items flow into one column", "Reverse the column order"], answer: "Fill the grid column by column" },
            { id: "grid8", question: "To name grid areas, you use the property:", options: ["grid-template-areas", "grid-area-names", "define-grid-areas", "grid-layout-areas"], answer: "grid-template-areas" },
            { id: "grid9", question: "The `repeat()` function in `grid-template-columns` is used for:", options: ["Repeating a track listing", "Repeating the grid display", "Repeating item content", "Repeating animations"], answer: "Repeating a track listing" },
            { id: "grid10", question: "How do you align items along the block (column) axis within their grid area?", options: ["align-items", "justify-items", "place-items", "align-content"], answer: "align-items" },
            { id: "grid11", question: "What is the purpose of `grid-template-rows`?", options: ["Defines the size and number of rows in a grid layout", "Defines the template for row content", "Automatically flows content into rows", "Sets the color of row lines"], answer: "Defines the size and number of rows in a grid layout" },
            { id: "grid12", question: "To make a grid item start on row line 2 and end on row line 4, you use:", options: ["grid-row: 2 / 4;", "grid-row-span: 2;", "grid-row-start: 2; grid-row-end: 3;", "row: 2-4;"], answer: "grid-row: 2 / 4;" }
        ]
    },
    settings: {
        maxQuestionsPerQuiz: 30
    },
    highScores: [],
    userProgress: {}
};

function showView(viewId) {
    for (const id in views) {
        if (views[id]) { 
            views[id].classList.remove('active-view');
            views[id].classList.add('view');
        }
    }
    if (views[viewId]) { 
        views[viewId].classList.add('active-view');
        views[viewId].classList.remove('view');
    } else {
        console.error("View with ID '" + viewId + "' not found.");
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function saveData() {
    localStorage.setItem('interactiveQuizData', JSON.stringify(quizData));
}

function loadData() {
    const storedData = localStorage.getItem('interactiveQuizData');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        quizData.categories = parsedData.categories || quizData.categories; 
        quizData.settings = { ...quizData.settings, ...(parsedData.settings || {}) };
        quizData.highScores = parsedData.highScores || [];
        quizData.userProgress = parsedData.userProgress || {};
    }
    
    quizData.settings.maxQuestionsPerQuiz = quizData.settings.maxQuestionsPerQuiz || 15;
    if(maxQuestionsConfigInput) maxQuestionsConfigInput.value = quizData.settings.maxQuestionsPerQuiz;
}

function populateCategories() {
    if (!categorySelect || !adminCategorySelect) {
        console.error("Category select elements not found.");
        return;
    }
    categorySelect.innerHTML = '';
    adminCategorySelect.innerHTML = '';

    const categoryKeys = Object.keys(quizData.categories);

    if (categoryKeys.length === 0) {
        const defaultOptionHTML = "<option value=''>No categories available</option>";
        categorySelect.innerHTML = defaultOptionHTML;
        adminCategorySelect.innerHTML = defaultOptionHTML;
        if (removeCategoryBtn) removeCategoryBtn.disabled = true;
        return;
    }

    if (removeCategoryBtn) removeCategoryBtn.disabled = false;

    categoryKeys.forEach(categoryName => {
        const option = document.createElement('option');
        option.value = categoryName;
        option.textContent = categoryName;
        categorySelect.appendChild(option.cloneNode(true));
        adminCategorySelect.appendChild(option);
    });
}

function startQuiz() {
    if (!userNameInput || !categorySelect) return; 

    currentUserName = userNameInput.value.trim() || "Guest";
    currentCategory = categorySelect.value;

    if (!currentCategory || !quizData.categories[currentCategory] || quizData.categories[currentCategory].length === 0) {
        alert("Selected category has no questions or no category selected. Please add some in the Admin Panel or select a valid category.");
        return;
    }
    score = 0;
    currentQuestionIndex = 0;

    const allCategoryQuestions = [...quizData.categories[currentCategory]];
    const userCategoryKey = `${currentUserName}_${currentCategory}`;
    const answeredQuestionIds = quizData.userProgress[userCategoryKey] || [];

    let availableUnansweredQuestions = allCategoryQuestions.filter(q => !answeredQuestionIds.includes(q.id));

    if (availableUnansweredQuestions.length === 0 && allCategoryQuestions.length > 0) {
        alert(`You have answered all questions in the '${currentCategory}' category! Try another category or an admin can add more questions.`);
        return;
    }
     if (allCategoryQuestions.length === 0) {
        alert(`The category '${currentCategory}' currently has no questions. Please ask an admin to add some.`);
        return;
    }

    shuffleArray(availableUnansweredQuestions);
    const randomCountBase = Math.floor(Math.random() * 3) + 10;
    const maxAllowedByAdmin = quizData.settings.maxQuestionsPerQuiz;
    const numQuestionsToPlay = Math.min(randomCountBase, maxAllowedByAdmin, availableUnansweredQuestions.length);

    if (numQuestionsToPlay < 1) {
        alert(`Not enough new questions available in '${currentCategory}' to start a meaningful quiz. You've answered most or all!`);
        return;
    }

    questions = availableUnansweredQuestions.slice(0, numQuestionsToPlay);
    showView('quiz');
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }
    if (!feedbackText || !questionTextElem || !answerOptionsElem || !questionCounterDisplay) return; 

    feedbackText.textContent = '';
    const currentQ = questions[currentQuestionIndex];
    questionTextElem.textContent = currentQ.question;
    answerOptionsElem.innerHTML = '';

    const shuffledOptions = shuffleArray([...currentQ.options]);
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn', 'btn-answer', 'mb-2');
        button.onclick = () => selectAnswer(option, currentQ.answer, button, currentQ.id);
        answerOptionsElem.appendChild(button);
    });

    updateProgressBar();
    questionCounterDisplay.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    startTimer();
}

function selectAnswer(selectedOption, correctAnswer, buttonElem, questionId) {
    clearInterval(timer);
    disableAnswerButtons();

    const userCategoryKey = `${currentUserName}_${currentCategory}`;
    if (!quizData.userProgress[userCategoryKey]) {
        quizData.userProgress[userCategoryKey] = [];
    }
    if (!quizData.userProgress[userCategoryKey].includes(questionId)) {
        quizData.userProgress[userCategoryKey].push(questionId);
    }

    if (!feedbackText) return; 

    if (selectedOption === correctAnswer) {
        score++;
        buttonElem.classList.add('correct');
        feedbackText.textContent = "Correct!";
        feedbackText.className = 'mt-4 text-center font-medium text-green-400 min-h-[24px]';
    } else {
        buttonElem.classList.add('incorrect');
        feedbackText.textContent = `Wrong! Correct answer: ${correctAnswer}`;
        feedbackText.className = 'mt-4 text-center font-medium text-red-400 min-h-[24px]';
        Array.from(answerOptionsElem.children).forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1500);
}


function disableAnswerButtons() {
    if (!answerOptionsElem) return;
    Array.from(answerOptionsElem.children).forEach(button => {
        button.disabled = true;
    });
}

function startTimer() {
    timeLeft = 15;
    if (timerDisplay) timerDisplay.textContent = `Time: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        if (timerDisplay) timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            if(feedbackText) {
                feedbackText.textContent = "Time's up!";
                feedbackText.className = 'mt-4 text-center font-medium text-yellow-400 min-h-[24px]';
            }
            disableAnswerButtons();

            const currentQ = questions[currentQuestionIndex];
            const userCategoryKey = `${currentUserName}_${currentCategory}`;

            if (!quizData.userProgress[userCategoryKey]) {
                quizData.userProgress[userCategoryKey] = [];
            }
            if (currentQ && !quizData.userProgress[userCategoryKey].includes(currentQ.id)) {
                 quizData.userProgress[userCategoryKey].push(currentQ.id);
            }

            if (currentQ && answerOptionsElem) {
                Array.from(answerOptionsElem.children).forEach(btn => {
                    if (btn.textContent === currentQ.answer) {
                        btn.classList.add('correct');
                    }
                });
            }

            setTimeout(() => {
                currentQuestionIndex++;
                displayQuestion();
            }, 1500);
        }
    }, 1000);
}

function updateProgressBar() {
    if (!progressBar) return;
    const progressPercentage = (questions.length > 0) ? (currentQuestionIndex / questions.length) * 100 : 0;
    progressBar.style.width = `${progressPercentage}%`;
}

function endQuiz() {
    clearInterval(timer);
    if (progressBar) progressBar.style.width = '100%';
    if (userFinalScoreDisplay) userFinalScoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;

    saveHighScore(currentUserName, score, currentCategory, questions.length);
    if (highScoresListScoreViewElem) displayHighScores(highScoresListScoreViewElem);
    saveData();
    showView('score');
}

function saveHighScore(name, scoreValue, category, totalQuestions) {
    const percentageScore = totalQuestions > 0 ? Math.round((scoreValue / totalQuestions) * 100) : 0;
    quizData.highScores.push({ name, score: scoreValue, totalQuestions, percentage: percentageScore, category, date: new Date().toLocaleDateString() });
    quizData.highScores.sort((a, b) => {
        if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
        }
        return b.score - a.score; 
    });
    quizData.highScores = quizData.highScores.slice(0, 10);
}

function displayHighScores(targetListElement) {
    if (!targetListElement) return;
    targetListElement.innerHTML = '';

    if (quizData.highScores.length === 0) {
        targetListElement.innerHTML = '<li class="text-gray-400">No high scores yet. Be the first!</li>';
        return;
    }

    quizData.highScores.forEach((entry, index) => {
        const li = document.createElement('li');
        li.classList.add('leaderboard-item', 'text-gray-300'); 

        const rankSpan = document.createElement('span');
        rankSpan.textContent = `#${index + 1}`;
        rankSpan.classList.add('font-semibold', 'w-10', 'text-left'); 

        const nameSpan = document.createElement('span');
        nameSpan.textContent = entry.name;
        nameSpan.classList.add('flex-1', 'truncate', 'px-2', 'text-left');

        const scoreSpan = document.createElement('span');
        scoreSpan.textContent = `${entry.score}/${entry.totalQuestions} (${entry.percentage}%)`;
        scoreSpan.classList.add('w-28', 'text-right', 'text-blue-400'); 

        const categorySpan = document.createElement('span');
        categorySpan.textContent = entry.category;
        categorySpan.classList.add('w-24', 'truncate', 'text-right', 'text-gray-500', 'hidden', 'sm:inline');


        li.appendChild(rankSpan);
        li.appendChild(nameSpan);
        li.appendChild(scoreSpan);
        li.appendChild(categorySpan);
        targetListElement.appendChild(li);
    });
}


function startQuiz() {
    if (!userNameInput || !categorySelect) return;

    currentUserName = userNameInput.value.trim() || "Guest";
    currentCategory = categorySelect.value;

    if (!currentCategory || !quizData.categories[currentCategory]) { 
        alert("No category selected or category data is missing. Please select a valid category.");
        return;
    }
    
    const allCategoryQuestions = [...quizData.categories[currentCategory]];

    if (allCategoryQuestions.length === 0) {
         alert(`The category '${currentCategory}' currently has no questions. Please ask an admin to add some.`);
         return;
    }

    score = 0;
    currentQuestionIndex = 0;

    const userCategoryKey = `${currentUserName}_${currentCategory}`;
    const answeredQuestionIds = quizData.userProgress[userCategoryKey] || [];
    let availableUnansweredQuestions = allCategoryQuestions.filter(q => !answeredQuestionIds.includes(q.id));

    if (availableUnansweredQuestions.length === 0) {
        alert(`You have answered all available questions in the '${currentCategory}' category! Try another category or an admin can add more questions.`);
        return;
    }

    shuffleArray(availableUnansweredQuestions);

    let numQuestionsToPlay;
    const MIN_QUESTIONS_TARGET = 10; 

    if (availableUnansweredQuestions.length < MIN_QUESTIONS_TARGET) {
        numQuestionsToPlay = availableUnansweredQuestions.length;
    } else {
        const randomCountBase = Math.floor(Math.random() * 3) + MIN_QUESTIONS_TARGET; 
        numQuestionsToPlay = Math.min(randomCountBase, quizData.settings.maxQuestionsPerQuiz, availableUnansweredQuestions.length);
        if (quizData.settings.maxQuestionsPerQuiz >= MIN_QUESTIONS_TARGET) {
            numQuestionsToPlay = Math.max(numQuestionsToPlay, MIN_QUESTIONS_TARGET);
        } else {
            numQuestionsToPlay = Math.min(numQuestionsToPlay, quizData.settings.maxQuestionsPerQuiz);
        }
        numQuestionsToPlay = Math.min(numQuestionsToPlay, availableUnansweredQuestions.length);

    }
    
   
    if (numQuestionsToPlay < 1 && availableUnansweredQuestions.length > 0) {
        numQuestionsToPlay = availableUnansweredQuestions.length; 
    } else if (numQuestionsToPlay < 1) { 
        alert(`No new questions available in '${currentCategory}' to start a quiz.`);
        return;
    }


    questions = availableUnansweredQuestions.slice(0, numQuestionsToPlay);
    showView('quiz');
    displayQuestion();
}


function populateLeaderboardUserNamesForAdmin() {
    if (!leaderboardUserSelect) return;
    leaderboardUserSelect.innerHTML = '<option value="">-- Select User Name --</option>'; 

    const uniqueNames = [...new Set(quizData.highScores.map(score => score.name))];
    uniqueNames.sort().forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        leaderboardUserSelect.appendChild(option);
    });

    if (uniqueNames.length === 0) {
        leaderboardUserSelect.innerHTML = '<option value="">No users on leaderboard</option>';
        if(removeUserScoresBtn) removeUserScoresBtn.disabled = true;
    } else {
        if(removeUserScoresBtn) removeUserScoresBtn.disabled = false;
    }
}

function handleRemoveUserScoresByName() {
    if (!leaderboardUserSelect || leaderboardUserSelect.value === "") {
        showAdminFeedback("Please select a user name to remove their scores.", true);
        return;
    }
    const userNameToRemove = leaderboardUserSelect.value;
    if (confirm(`Are you sure you want to remove ALL scores for user "${userNameToRemove}"? This action cannot be undone.`)) {
        const originalCount = quizData.highScores.length;
        quizData.highScores = quizData.highScores.filter(score => score.name !== userNameToRemove);
        const removedCount = originalCount - quizData.highScores.length;

        if (removedCount > 0) {
            saveData();
            showAdminFeedback(`Removed ${removedCount} score(s) for user "${userNameToRemove}".`);
            populateLeaderboardUserNamesForAdmin(); 
        } else {
            
            showAdminFeedback(`No scores found for user "${userNameToRemove}".`, true);
        }
    }
}


function handleClearAllLeaderboardScores() {
    if (quizData.highScores.length === 0) {
        showAdminFeedback("Leaderboard is already empty.", true);
        return;
    }
    if (confirm("Are you sure you want to clear ALL scores from the leaderboard? This action cannot be undone.")) {
        quizData.highScores = [];
        saveData();
        showAdminFeedback("Leaderboard cleared successfully.");
        populateLeaderboardUserNamesForAdmin(); 
    }
}

function showAdminFeedback(message, isError = false) {
    if (!adminFeedback) return;
    adminFeedback.textContent = message;
    adminFeedback.className = `text-sm text-center min-h-[20px] ${isError ? 'text-red-400' : 'text-green-400'}`; 
    setTimeout(() => {
        if(adminFeedback) adminFeedback.textContent = '';
    }, 3000);
}

function getNextQuestionId(category) { 
    let maxIdNum = 0;
    Object.values(quizData.categories).flat().forEach(q => {
         if (q.id) {
            const numPart = parseInt(q.id.replace(/\D/g, ''), 10);
            if (!isNaN(numPart) && numPart > maxIdNum) {
                maxIdNum = numPart;
            }
         }
    });
    return `q${maxIdNum + 1}`;
}


if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz);
}
if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
        showView('setup');
    });
}
if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => showView('setup'));
}
if (toggleAdminViewBtn) {
    toggleAdminViewBtn.addEventListener('click', () => {
        populateCategories();
        showView('admin');
    });
}
if (toggleAdminViewBtn) {
    toggleAdminViewBtn.addEventListener('click', () => {
        populateCategories();
        populateLeaderboardUserNamesForAdmin(); 
        showView('admin');
    });
}

if (removeUserScoresBtn) {
    removeUserScoresBtn.addEventListener('click', handleRemoveUserScoresByName);
}

if (clearAllLeaderboardBtn) {
    clearAllLeaderboardBtn.addEventListener('click', handleClearAllLeaderboardScores);
}

if (backToUserViewBtn) {
    backToUserViewBtn.addEventListener('click', () => {
        populateCategories();
        showView('setup');
    });
}
if (viewLeaderboardBtn) {
    viewLeaderboardBtn.addEventListener('click', () => {
        if(leaderboardListElem) displayHighScores(leaderboardListElem);
        showView('leaderboard');
    });
}
if (viewLeaderboardFromScoreBtn) {
    viewLeaderboardFromScoreBtn.addEventListener('click', () => {
        if(leaderboardListElem) displayHighScores(leaderboardListElem);
        showView('leaderboard');
    });
}
if (backToHomeFromLeaderboardBtn) {
    backToHomeFromLeaderboardBtn.addEventListener('click', () => showView('setup'));
}

if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', () => {
        if (!newCategoryNameInput || !adminCategorySelect) return;
        const newCategory = newCategoryNameInput.value.trim();
        if (newCategory && !quizData.categories[newCategory]) {
            quizData.categories[newCategory] = [];
            saveData();
            populateCategories();
            newCategoryNameInput.value = '';
            showAdminFeedback(`Category "${newCategory}" added.`);
        } else if (quizData.categories[newCategory]) {
            showAdminFeedback(`Category "${newCategory}" already exists.`, true);
        } else {
            showAdminFeedback("Please enter a new category name.", true);
        }
    });
}

if (removeCategoryBtn) {
    removeCategoryBtn.addEventListener('click', () => {
        if (!adminCategorySelect) return;
        const categoryToRemove = adminCategorySelect.value;
        if (!categoryToRemove) {
            showAdminFeedback("Please select a category to remove.", true);
            return;
        }
        if (confirm(`Are you sure you want to remove the category "${categoryToRemove}" and all its questions? This will also clear user progress for this category.`)) {
            delete quizData.categories[categoryToRemove];

            for (const key in quizData.userProgress) {
                if (key.endsWith(`_${categoryToRemove}`)) {
                    delete quizData.userProgress[key];
                }
            }
            
            saveData();
            populateCategories();
            showAdminFeedback(`Category "${categoryToRemove}" removed.`);
        }
    });
}

if (addQuestionBtn) {
    addQuestionBtn.addEventListener('click', () => {
        if (!adminCategorySelect || !questionTextAdminInput || !optionInputsAdmin.every(Boolean)) return;

        const category = adminCategorySelect.value;
        const question = questionTextAdminInput.value.trim();
        const options = optionInputsAdmin.map(input => input.value.trim()).filter(opt => opt !== "");

        if (!category) {
            showAdminFeedback("Please select a category for the question.", true);
            return;
        }
        if (!question) {
            showAdminFeedback("Please enter question text.", true);
            return;
        }
        if (options.length < 2) {
            showAdminFeedback("Please provide at least two options (correct answer + one distractor).", true);
            return;
        }
        if (!options[0]) {
            showAdminFeedback("Correct answer (Option 1) cannot be empty.", true);
            return;
        }
        const newQuestion = {
            id: getNextQuestionId(category),
            question: question,
            options: options,
            answer: options[0]
        };
        if (!quizData.categories[category]) {
            quizData.categories[category] = [];
        }
        quizData.categories[category].push(newQuestion);
        saveData();
        showAdminFeedback("Question added successfully!");
        questionTextAdminInput.value = '';
        optionInputsAdmin.forEach(input => input.value = '');
    });
}

if (maxQuestionsConfigInput) {
    maxQuestionsConfigInput.addEventListener('change', () => {
        const count = parseInt(maxQuestionsConfigInput.value);
        if (count > 0) {
            quizData.settings.maxQuestionsPerQuiz = count;
            saveData();
            showAdminFeedback(`Max questions per quiz set to ${count}.`);
        } else {
            maxQuestionsConfigInput.value = quizData.settings.maxQuestionsPerQuiz;
            showAdminFeedback("Max questions must be at least 1.", true);
        }
    });
}


window.addEventListener('load', () => {
    loadData();
    populateCategories();
    showView('setup');
});