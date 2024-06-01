
    function playAudio(url, button) {
      const container = button.parentElement;
      
      // Remove any existing iframe
      const existingIframe = container.querySelector('iframe');
      if (existingIframe) {
        existingIframe.remove();
      }
      
      // Create and append new iframe
      const audioPlayer = document.createElement('iframe');
      audioPlayer.src = url;
      audioPlayer.width = '100%';
      audioPlayer.height = '60px';
      audioPlayer.frameBorder = '0';
      audioPlayer.allow = 'autoplay';
      audioPlayer.tabIndex = 0;
      audioPlayer.title = "Audio Player";

      container.appendChild(audioPlayer);
    }
  