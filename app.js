// Student Question Voting App
// Google Sheets API URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzIzo-OTXRg9vSjlNBwIp6w7fJbFCOAfaUEmDaZWEnY-vsvLtOZlhYbI7VEUpYr8UWKbg/exec';

class QuestionApp {
    constructor() {
        this.questions = [];
        this.votedQuestions = this.loadVotedQuestions();
        this.currentSort = 'votes';
        this.isLoading = false;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadQuestions();
        this.renderQuestions();

        // Auto-refresh every 10 seconds to show new questions from other students
        setInterval(() => this.loadQuestions(), 10000);
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('questionForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Sort change
        const sortSelect = document.getElementById('sortBy');
        sortSelect.addEventListener('change', (e) => this.handleSortChange(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.isLoading) return;

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

        this.isLoading = true;
        this.showLoadingMessage();

        try {
            // Post to Google Sheets
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'add',
                    ...question
                })
            });

            // Clear form
            nameInput.value = '';
            questionInput.value = '';

            // Show success feedback
            this.showSuccessMessage();

            // Reload questions from server
            setTimeout(() => this.loadQuestions(), 1000);

        } catch (error) {
            console.error('Error posting question:', error);
            alert('Failed to post question. Please try again.');
        } finally {
            this.isLoading = false;
        }
    }

    showLoadingMessage() {
        const form = document.getElementById('questionForm');
        const existingMsg = form.querySelector('.status-message');
        if (existingMsg) existingMsg.remove();

        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'status-message';
        loadingMsg.textContent = 'Posting question...';
        loadingMsg.style.cssText = `
            background: #2196F3;
            color: white;
            padding: 12px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: center;
            font-weight: 600;
        `;
        form.appendChild(loadingMsg);
    }

    showSuccessMessage() {
        const form = document.getElementById('questionForm');
        const existingMsg = form.querySelector('.status-message');
        if (existingMsg) existingMsg.remove();

        const successMsg = document.createElement('div');
        successMsg.className = 'status-message';
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

    async handleVote(questionId) {
        const question = this.questions.find(q => q.id === questionId);
        if (!question) return;

        // Check if already voted
        const hasVoted = this.votedQuestions.includes(questionId);

        if (hasVoted) {
            // Remove vote
            question.votes--;
            this.votedQuestions = this.votedQuestions.filter(id => id !== questionId);
        } else {
            // Add vote
            question.votes++;
            this.votedQuestions.push(questionId);
        }

        this.saveVotedQuestions();
        this.renderQuestions();

        try {
            // Update vote in Google Sheets
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'vote',
                    id: questionId,
                    votes: question.votes
                })
            });

            // Reload questions after a short delay
            setTimeout(() => this.loadQuestions(), 1000);

        } catch (error) {
            console.error('Error updating vote:', error);
            // Revert the vote on error
            if (hasVoted) {
                question.votes++;
                this.votedQuestions.push(questionId);
            } else {
                question.votes--;
                this.votedQuestions = this.votedQuestions.filter(id => id !== questionId);
            }
            this.saveVotedQuestions();
            this.renderQuestions();
            alert('Failed to update vote. Please try again.');
        }
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

    // Google Sheets API Methods
    async loadQuestions() {
        try {
            const response = await fetch(SCRIPT_URL);
            const data = await response.json();

            // Convert IDs to numbers for consistency
            this.questions = data.map(q => ({
                ...q,
                id: Number(q.id),
                votes: Number(q.votes) || 0
            }));

            this.renderQuestions();
        } catch (error) {
            console.error('Error loading questions:', error);
            // Don't show alert on auto-refresh errors
        }
    }

    // Local Storage Methods (only for voted questions tracking)
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
