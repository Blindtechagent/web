
    function analyze() {
      const startTime = performance.now();
      const input = document.getElementById('input').value;
      const words = input.trim().split(/\s+/);
      const wordCount = words.length;
      const charCount = input.length;
      const sentenceCount = input.split(/[.!?]+/).length - 1;
      const lineCount = input.split(/\r?\n/).length;
      const wordFreq = words.reduce((freq, word) => ((freq[word] = (freq[word] || 0) + 1), freq), {});
      const mostRepeatedWord = Object.keys(wordFreq).reduce((a, b) => wordFreq[a] > wordFreq[b] ? a : b);
      const maxFreq = wordFreq[mostRepeatedWord];
      const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / wordCount;
      announce("text analysed successfully");
      const output = document.getElementById('output');
      output.innerHTML = `
    <div>Word count: ${wordCount}</div>
    <div>Character count: ${charCount}</div>
    <div>Sentence count: ${sentenceCount}</div>
    <div>Line count: ${lineCount}</div>
    <div>Average word length: ${avgWordLength.toFixed(2)}</div>
    <div>Most repeated word: ${mostRepeatedWord}</div>
    <div>Number of times repeated: ${maxFreq}</div>
  `;
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      document.getElementById('time-taken').innerHTML = `Time taken: ${timeTaken.toFixed(2)} ms`;
    }

  