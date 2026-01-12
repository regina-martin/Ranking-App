# Student Question Voting App

A simple, user-friendly web application for college classrooms where students can post questions and vote on questions they'd like answered.

## Features

- **Post Questions**: Students can submit questions with their name
- **Vote on Questions**: Upvote questions to show interest
- **Real-time Ranking**: Questions are automatically ranked by votes
- **Sorting Options**: Sort by most votes or most recent
- **Data Persistence**: Questions and votes are saved locally in the browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **No Server Required**: Runs entirely in the browser

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
- No external dependencies or frameworks required
- Uses LocalStorage for data persistence

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

- Questions and votes are stored in the browser's LocalStorage
- Data persists between sessions on the same browser
- Each browser/device has its own separate data
- To share data across devices, consider using a backend service (requires additional setup)

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

- No data is sent to external servers
- All data stays in the student's browser
- No personal information is collected beyond what students choose to enter
- Students can use anonymous names if preferred

## Troubleshooting

**Questions not appearing?**
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Try clearing browser cache and reload

**Votes not saving?**
- LocalStorage must be enabled in browser settings
- Some browsers in private/incognito mode may not persist data

**Can't see the app?**
- Ensure all three files (index.html, styles.css, app.js) are in the same folder
- Try a different browser

## License

Free to use for educational purposes.

## Support

For issues or questions, please open an issue in this repository.
