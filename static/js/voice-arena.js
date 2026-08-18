/* static/js/voice-arena.js */
window.openVoiceArenaModal = function() {
  document.getElementById('voiceArenaModal').style.display = 'grid';
};

window.closeVoiceArenaModal = function() {
  document.getElementById('voiceArenaModal').style.display = 'none';
  if (window.vaRecognition) {
    window.vaRecognition.stop();
  }
};

let vaIsMicActive = false;
let vaRecognition = null;
let vaSynth = window.speechSynthesis;

window.toggleVoiceArenaMic = function() {
  const btn = document.getElementById('vaStartMicBtn');
  const wave = document.getElementById('vaMicWave');
  const transcript = document.getElementById('vaTranscript');
  
  if (vaIsMicActive) {
    vaIsMicActive = false;
    btn.innerHTML = '🎙️ Start Live Mic Discovery';
    btn.classList.remove('active');
    wave.classList.remove('active');
    if (vaRecognition) vaRecognition.stop();
  } else {
    vaIsMicActive = true;
    btn.innerHTML = '⏹️ Stop Mic & Analyze';
    btn.classList.add('active');
    wave.classList.add('active');
    
    startSpeechRecognition();
  }
};

function startSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    appendVaMessage('System', 'Speech Recognition API not supported in this browser.', 'va-system-msg');
    window.toggleVoiceArenaMic();
    return;
  }
  
  if (!vaRecognition) {
    vaRecognition = new SpeechRecognition();
    vaRecognition.continuous = false;
    vaRecognition.interimResults = false;
    
    vaRecognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      appendVaMessage('You', speechResult, 'va-user-msg');
      simulateAiResponse(speechResult);
    };
    
    vaRecognition.onend = () => {
      if (vaIsMicActive) {
        // Automatically stopped by pause, we can restart or just let it process
        window.toggleVoiceArenaMic();
      }
    };
  }
  
  try {
    vaRecognition.start();
    appendVaMessage('System', 'Listening...', 'va-system-msg');
  } catch (e) {
    console.error(e);
  }
}

function appendVaMessage(sender, text, className) {
  const transcript = document.getElementById('vaTranscript');
  const msg = document.createElement('div');
  msg.className = className;
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  transcript.appendChild(msg);
  transcript.scrollTop = transcript.scrollHeight;
}

function simulateAiResponse(userText) {
  const persona = document.getElementById('vaPersonaSelect').value;
  
  // Show thinking state
  document.getElementById('vaWhisperText').innerText = "Analyzing speech pattern...";

  fetch('/api/voice-roleplay-turn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ persona: persona, text: userText })
  })
  .then(res => {
    if(!res.ok) throw new Error("API not available");
    return res.json();
  })
  .then(data => {
    handleAiReply(data.reply, data.coachHint);
  })
  .catch(err => {
    // Fallback if API doesn't exist
    let aiReply = '';
    let coachHint = '';
    
    if (persona === 'cfo') {
      aiReply = "I hear you, but in this economy, any new tool needs to show hard ROI within 6 months. Can you guarantee that?";
      coachHint = "They are pushing on ROI. Pivot to your cost-savings calculator or specific case studies.";
    } else if (persona === 'vp_sales') {
      aiReply = "My reps are already overwhelmed with 5 different tools. I don't want to add another login.";
      coachHint = "Acknowledge tool fatigue. Emphasize seamless CRM integration and no new logins.";
    } else {
      aiReply = "Send me an email with the details and I'll look at it next quarter.";
      coachHint = "Standard brush-off. Use a pattern interrupt or ask a specific diagnostic question.";
    }
    
    setTimeout(() => {
      handleAiReply(aiReply, coachHint);
    }, 1000);
  });
}

function handleAiReply(aiReply, coachHint) {
  appendVaMessage('AI Prospect', aiReply, 'va-ai-msg');
  document.getElementById('vaWhisperText').innerText = coachHint;
  playAiSpeech(aiReply);
  
  // Update stats randomly for effect
  const qScore = Math.floor(Math.random() * 40) + 50;
  document.getElementById('vaQualityGauge').style.setProperty('--val', qScore + '%');
  document.getElementById('vaQualityVal').innerText = qScore + '/100';
  
  const repRatio = Math.floor(Math.random() * 30) + 30;
  document.getElementById('vaRatioGauge').style.setProperty('--val', repRatio + '%');
  document.getElementById('vaRatioVal').innerText = repRatio + '/' + (100 - repRatio);
}

function playAiSpeech(text) {
  fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      voice: 'en-US-AriaNeural',
      rate: '+0%'
    })
  })
  .then(resp => {
    if (!resp.ok) throw new Error('TTS error');
    return resp.blob();
  })
  .then(blob => {
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  })
  .catch(() => {
    // Fallback to SpeechSynthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const persona = document.getElementById('vaPersonaSelect').value;
      if (persona === 'cfo') {
        utterance.pitch = 0.8;
        utterance.rate = 1.1;
      } else {
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
      }
      window.speechSynthesis.speak(utterance);
    }
  });
}
