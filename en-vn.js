class AVDictionary {
  constructor() {
    // Define your dictionary properties here
    this.name = 'anhviet';
    this.displayName = 'en_US-Anh_Viet';
    this.urlPattern = 'https://your-dictionary.com/search?word={your-word}';
    this.sourceLang = 'en';
    this.targetLang = 'vi';
  }

  findTerm(word) {
    return new Promise((resolve, reject) => {
      // Construct the query URL
      let queryUrl = this.urlPattern.replace('{your-word}', word);

      // Send an AJAX request to the dictionary website
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Parse the response to get the definition
          let parser = new DOMParser();
          let doc = parser.parseFromString(xhr.responseText, 'text/html');
          let definition = doc.querySelector('#definition').innerHTML;

          // Resolve the definition to the extension
          resolve(definition);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
          reject(new Error('Could not fetch definition.'));
        }
      };
      xhr.open('GET', queryUrl, true);
      xhr.send();
    });
  }
}

// Create a new instance of the dictionary and add it to the extension
let avDictionary = new AVDictionary();
chrome.runtime.sendMessage({type: 'ADD_DICTIONARY', dictionary: avDictionary});
