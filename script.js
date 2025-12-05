document.addEventListener('DOMContentLoaded', function() {
    // Create starfield background
    createStarfield();
    
    // Initialize interactive elements
    initCodeInspect();
    initQuiz();
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function createStarfield() {
    const starfield = document.getElementById('starfield');
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 1000);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random star properties
        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--delay', `${delay}s`);
        
        // Add twinkle effect
        star.style.opacity = Math.random();
        
        starfield.appendChild(star);
    }
}

function initCodeInspect() {
    const viewGeoBtn = document.getElementById('view-geo-btn');
    const geoLayerElements = document.querySelectorAll('.geo-layer');
    const viewToggle = document.getElementById('view-toggle');
    const viewDropdown = document.getElementById('view-dropdown');
    const viewMode = document.getElementById('view-mode');
    const codeDisplay = document.getElementById('code-display');

    if (!viewGeoBtn || !viewToggle || !viewDropdown || !viewMode || !codeDisplay) {
        // Safeguard: if markup changes, avoid runtime errors.
        return;
    }

    let currentMode = 'human';
    let geoVisible = false;

    function applyMode(mode) {
        currentMode = mode;

        // Update label text
        viewMode.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);

        if (mode === 'human') {
            // Human view → hide GEO annotations by default
            codeDisplay.classList.remove('machine-view');
            geoVisible = false;
            geoLayerElements.forEach(el => el.classList.add('hidden'));
            viewGeoBtn.textContent = 'View GEO Layer';
        } else {
            // Machine view → show GEO annotations and highlight machine layer
            codeDisplay.classList.add('machine-view');
            geoVisible = true;
            geoLayerElements.forEach(el => el.classList.remove('hidden'));
            viewGeoBtn.textContent = 'Hide GEO Layer';
        }
    }

    // Initial state: Human view
    applyMode('human');

    // Toggle GEO layer visibility manually (works in both modes)
    viewGeoBtn.addEventListener('click', function () {
        geoVisible = !geoVisible;

        geoLayerElements.forEach(el => {
            el.classList.toggle('hidden', !geoVisible);
        });

        this.textContent = geoVisible ? 'Hide GEO Layer' : 'View GEO Layer';
    });

    // Toggle view mode dropdown open/closed
    viewToggle.addEventListener('click', function () {
        viewDropdown.classList.toggle('hidden');
    });

    // Handle view mode selection (Human / Machine)
    document.querySelectorAll('#view-dropdown a').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const mode = this.getAttribute('data-mode'); // "human" or "machine"
            viewDropdown.classList.add('hidden');
            applyMode(mode);  // <-- actually change the view now
        });
    });
}


function initQuiz() {
    const quizData = [
        {
            question: "What does GEO stand for?",
            options: [
                "Graphical Engine Optimization",
                "Generative Engine Optimization",
                "Google Engine Optimization",
                "General Engine Output"
            ],
            answer: 1
        },
        {
            question: "Which is NOT a GEO optimization technique?",
            options: [
                "Using semantic HTML",
                "Keyword stuffing",
                "Adding structured data",
                "Clear term definitions"
            ],
            answer: 1
        },
        {
            question: "GEO primarily optimizes for:",
            options: [
                "Human readers",
                "AI models",
                "Search engine crawlers",
                "Social media platforms"
            ],
            answer: 1
        },
        {
            question: "Which format is commonly used for GEO structured data?",
            options: [
                "JSON-LD",
                "CSV",
                "XML",
                "YAML"
            ],
            answer: 0
        },
        {
            question: "What's a key difference between SEO and GEO?",
            options: [
                "SEO is for AI, GEO is for humans",
                "SEO focuses on keywords, GEO focuses on meaning",
                "GEO is obsolete, SEO is modern",
                "They are exactly the same"
            ],
            answer: 1
        }
    ];
    
    const startQuizBtn = document.getElementById('start-quiz');
    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextQuestionBtn = document.getElementById('next-question');
    const quizProgress = document.getElementById('quiz-progress');
    const quizScore = document.getElementById('quiz-score');
    const finalScore = document.getElementById('final-score');
    const resultText = document.getElementById('result-text');
    const resultStars = document.getElementById('result-stars');
    const restartQuizBtn = document.getElementById('restart-quiz');
    
    let currentQuestion = 0;
    let score = 0;
    let quizActive = false;
    
    // Start quiz
    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', startQuiz);
    
    // Next question
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    
    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        quizActive = true;
        
        quizIntro.classList.add('hidden');
        quizResults.classList.add('hidden');
        quizQuestions.classList.remove('hidden');
        
        updateScore();
        showQuestion();
    }
    
    function showQuestion() {
        const question = quizData[currentQuestion];
        quizProgress.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
        questionText.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('quiz-option', 'bg-cosmic-800', 'hover:bg-cosmic-700', 'p-4', 'rounded-md', 'cursor-pointer', 'border', 'border-cosmic-700');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(optionElement);
        });
        
        nextQuestionBtn.classList.add('hidden');
    }
    
    function selectAnswer(selectedIndex) {
        if (!quizActive) return;
        
        const question = quizData[currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Mark correct/incorrect
        if (selectedIndex === question.answer) {
            options[selectedIndex].classList.add('correct');
            score++;
            updateScore();
        } else {
            options[selectedIndex].classList.add('incorrect');
            options[question.answer].classList.add('correct');
        }
        
        quizActive = false;
        nextQuestionBtn.classList.remove('hidden');
    }
    
    function showNextQuestion() {
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            quizActive = true;
            showQuestion();
            nextQuestionBtn.classList.add('hidden');
        } else {
            showResults();
        }
    }
    
    function showResults() {
        quizQuestions.classList.add('hidden');
        quizResults.classList.remove('hidden');
        
        finalScore.textContent = `${score}/${quizData.length}`;
        
        // Add appropriate stars based on score
        resultStars.innerHTML = '';
        const starsCount = Math.ceil((score / quizData.length) * 5);
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.innerHTML = i < starsCount ? 
                '<i data-feather="star" class="text-yellow-400 fill-current"></i>' : 
                '<i data-feather="star" class="text-cosmic-500"></i>';
            resultStars.appendChild(star);
        }
        
        // Set result message based on score
        let message = '';
        if (score === quizData.length) {
            message = 'Cosmic Master! You know your GEO inside out.';
        } else if (score >= quizData.length * 0.7) {
            message = 'Great job! You have solid GEO knowledge.';
        } else if (score >= quizData.length * 0.5) {
            message = 'Good start! Keep learning about GEO.';
        } else {
            message = 'Keep exploring the cosmos of GEO!';
        }
        resultText.textContent = message;
        
        feather.replace();
    }
    
    function updateScore() {
        quizScore.textContent = `Score: ${score}`;
    }
}