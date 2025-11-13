# Uzbekistan Central Bank Dashboard

Internal administration system for the Central Bank of the Republic of Uzbekistan to process and document official meeting recordings.

## Features

- **Video Upload & Transcription** - Upload meeting recordings (MP4, MOV, AVI, WAV, MP3) and generate text transcripts using AI-powered speech-to-text API
- **Text to Speech** - Convert text into audio files (WAV format) using AI-powered TTS API
- **Letter Generation** - Convert transcripts into official letters in formal tone
- **Documents Archive** - View, search, and download previously generated PDF/DOCX files
- **Multilingual Support** - Uzbek (Latin), Uzbek (Cyrillic), Russian
- **Dark/Light Theme** - Professional government-appropriate styling
- **Real-time Backend Integration** - Connected to Uzbekistan Central Bank STT (Speech-to-Text) and TTS APIs

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **PDF Generation**: jsPDF
- **Notifications**: React Hot Toast
- **Backend API**: Uzbekistan Central Bank STT API (https://sst.xazna.uz)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured for deployment on Netlify.

### Netlify Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

### Environment Variables

No environment variables are required for basic functionality. API credentials are configured in the `Dashboard.jsx` component.

### CORS Configuration

**Important**: For local development, you may encounter CORS errors when calling the STT and TTS APIs. This requires backend server configuration to allow cross-origin requests from `localhost:3000`. Contact the backend administrator to add the appropriate CORS headers.

In production, ensure your production domain is whitelisted in the backend CORS configuration.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Top navigation bar
│   ├── Layout.jsx      # Main layout wrapper
│   └── Sidebar.jsx     # Left navigation sidebar
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard with video upload & transcription
│   ├── TextToSpeech.jsx # Text to speech conversion
│   └── DocumentsArchive.jsx # Document management
├── App.jsx             # Main application component
└── index.css           # Global styles
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Internal use only - Central Bank of Uzbekistan
