// Student Question Voting App
class QuestionApp {
    constructor() {
        this.questions = this.loadQuestions();
        this.votedQuestions = this.loadVotedQuestions();
        this.currentSort = 'votes';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderQuestions();
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('questionForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Sort change
        const sortSelect = document.getElementById('sortBy');
        sortSelect.addEventListener('change', (e) => this.handleSortChange(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const nameInput = document.getElementById('studentName');
        const questionInput = document.getElementById('questionText');

        const name = nameInput.value.trim();
        const text = questionInput.value.trim();

        if (!name || !text) {
            alert('Please fill in all fields');
            return;
        }

        // Create new question
        const question = {
            id: Date.now(),
            author: name,
            text: text,
            votes: 0,
            timestamp: new Date().toISOString()
        };

        this.questions.push(question);
        this.saveQuestions();

        // Clear form
        nameInput.value = '';
        questionInput.value = '';

        // Show success feedback
        this.showSuccessMessage();

        // Render updated list
        this.renderQuestions();
    }

    showSuccessMessage() {
        const form = document.getElementById('questionForm');
        const successMsg = document.createElement('div');
        successMsg.textContent = '✓ Question posted successfully!';
        successMsg.style.cssText = `
            background: #4caf50;
            color: white;
            padding: 12px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: center;
            font-weight: 600;
        `;
        form.appendChild(successMsg);

        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }

    handleVote(questionId) {
        const question = this.questions.find(q => q.id === questionId);
        if (!question) return;

        // Check if already voted
        if (this.votedQuestions.includes(questionId)) {
            // Remove vote
            question.votes--;
            this.votedQuestions = this.votedQuestions.filter(id => id !== questionId);
        } else {
            // Add vote
            question.votes++;
            this.votedQuestions.push(questionId);
        }

        this.saveQuestions();
        this.saveVotedQuestions();
        this.renderQuestions();
    }

    handleSortChange(e) {
        this.currentSort = e.target.value;
        this.renderQuestions();
    }

    getSortedQuestions() {
        const sorted = [...this.questions];

        if (this.currentSort === 'votes') {
            sorted.sort((a, b) => b.votes - a.votes);
        } else if (this.currentSort === 'recent') {
            sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }

        return sorted;
    }

    renderQuestions() {
        const questionsList = document.getElementById('questionsList');
        const emptyState = document.getElementById('emptyState');

        if (this.questions.length === 0) {
            questionsList.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        const sortedQuestions = this.getSortedQuestions();

        questionsList.innerHTML = sortedQuestions.map(question => {
            const hasVoted = this.votedQuestions.includes(question.id);
            const timeAgo = this.getTimeAgo(question.timestamp);

            return `
                <div class="question-card">
                    <div class="question-header">
                        <div class="question-info">
                            <div class="question-author">${this.escapeHtml(question.author)}</div>
                            <div class="question-time">${timeAgo}</div>
                        </div>
                        <div class="vote-section">
                            <div class="vote-count">${question.votes}</div>
                            <button
                                class="btn btn-vote ${hasVoted ? 'voted' : ''}"
                                onclick="app.handleVote(${question.id})"
                            >
                                ${hasVoted ? '✓ Voted' : '↑ Vote'}
                            </button>
                        </div>
                    </div>
                    <div class="question-text">${this.escapeHtml(question.text)}</div>
                </div>
            `;
        }).join('');
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const then = new Date(timestamp);
        const seconds = Math.floor((now - then) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

        return then.toLocaleDateString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Local Storage Methods
    loadQuestions() {
        const stored = localStorage.getItem('studentQuestions');
        return stored ? JSON.parse(stored) : [];
    }

    saveQuestions() {
        localStorage.setItem('studentQuestions', JSON.stringify(this.questions));
    }

    loadVotedQuestions() {
        const stored = localStorage.getItem('votedQuestions');
        return stored ? JSON.parse(stored) : [];
    }

    saveVotedQuestions() {
        localStorage.setItem('votedQuestions', JSON.stringify(this.votedQuestions));
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new QuestionApp();
});
