# Student Question Voting App

A simple, user-friendly web application for college classrooms where students can post questions and vote on questions they'd like answered.

## Features

- **Post Questions**: Students can submit questions with their name
- **Vote on Questions**: Upvote questions to show interest
- **Real-time Ranking**: Questions are automatically ranked by votes
- **Shared Data**: All students see the same questions in real-time using Google Sheets
- **Sorting Options**: Sort by most votes or most recent
- **Auto-refresh**: Questions update automatically every 10 seconds
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Instructor Dashboard**: View all questions in a Google Sheet

## How to Use

### For Instructors

1. **Download or clone this repository**
2. **Open `index.html` in any web browser** (Chrome, Firefox, Safari, Edge, etc.)
3. **Share the file with students** or host it on a web server
   - For local classroom use: Copy the files to a shared drive
   - For online use: Host on GitHub Pages, Netlify, or any web server

### For Students

1. **Post a Question**:
   - Enter your name in the "Your Name" field
   - Type your question in the "Your Question" text area
   - Click "Post Question"
   - Your question will appear in the list below

2. **Vote on Questions**:
   - Click the "↑ Vote" button on any question you'd like answered
   - The vote count will increase
   - Click "✓ Voted" to remove your vote
   - You can vote on multiple questions

3. **View Questions**:
   - Questions are displayed with the author's name and time posted
   - Sort by "Most Votes" (default) to see the highest-ranked questions
   - Sort by "Most Recent" to see the newest questions first

## Technical Details

### Files

- `index.html` - Main application page
- `styles.css` - Styling and responsive design
- `app.js` - Application logic and functionality

### Technology Stack

- Pure HTML5, CSS3, and JavaScript (ES6+)
- Google Sheets API for shared data storage
- No external frameworks required
- LocalStorage for tracking individual votes

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Hosting Options

### Option 1: Local File (Simplest)
Just open `index.html` in a browser. Perfect for single-computer use.

### Option 2: GitHub Pages (Free Online Hosting)
1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select main branch as source
4. Your app will be available at `https://yourusername.github.io/Ranking-App`

### Option 3: Shared Network Drive
Place files in a shared folder accessible to all students in the classroom.

### Option 4: Web Server
Upload files to any web hosting service.

## Data Storage

- **Questions and votes** are stored in Google Sheets and shared across all students
- **Vote tracking** (which questions each student voted on) is stored locally in the browser
- Questions appear in real-time for all students
- Instructors can view/export all data from the Google Sheet

## Google Sheets Setup (For Instructors)

The app is already configured with a Google Sheet backend. If you need to set up your own:

### Step 1: Create Your Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet named "Student Questions"
3. Add these headers in row 1: `id`, `author`, `text`, `votes`, `timestamp`

### Step 2: Create Apps Script
1. In your sheet: Extensions → Apps Script
2. Replace all code with the script from the deployment documentation
3. Save the project

### Step 3: Deploy as Web App
1. Click Deploy → New deployment
2. Select type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy and copy the URL

### Step 4: Update app.js
1. Open `app.js`
2. Replace the `SCRIPT_URL` at the top with your new URL
3. Save and redeploy to GitHub Pages

### Viewing Your Data
Open your Google Sheet anytime to see all questions and votes in a spreadsheet format. You can:
- Export to Excel or CSV
- Analyze voting patterns
- Delete inappropriate questions
- Archive questions for future reference

## Customization

### Change Colors
Edit `styles.css` and modify the gradient values:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change App Title
Edit the `<h1>` tag in `index.html`:
```html
<h1>📚 Student Questions</h1>
```

### Modify Form Fields
Add or remove fields in the `index.html` form section.

## Privacy Notes

- Questions and votes are stored in a Google Sheet owned by the instructor
- Student names are only what students choose to enter
- Students can use anonymous or first names only if preferred
- No email addresses or login credentials are collected
- Data is only accessible to the sheet owner (instructor) and anyone with the sheet link

## Troubleshooting

**Questions not appearing?**
- Wait 10 seconds for auto-refresh, or reload the page
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Verify the Google Apps Script is deployed and accessible

**Votes not saving?**
- Check your internet connection
- Ensure the Google Sheet Apps Script is properly deployed
- Check that "Who has access" is set to "Anyone" in the deployment settings

**Can't see the app?**
- Ensure all three files (index.html, styles.css, app.js) are in the same folder
- Try a different browser
- Make sure you're accessing via HTTPS (GitHub Pages)

**Questions appearing slowly?**
- Normal - there's a 1-2 second delay when posting
- Questions auto-refresh every 10 seconds
- Manual refresh (F5) will load immediately

## License

Free to use for educational purposes.

## Support

For issues or questions, please open an issue in this repository.
