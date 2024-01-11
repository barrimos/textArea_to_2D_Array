const TEXTAREAS = document.querySelectorAll('[data-area=txtToarray]'); // initial
let txtArray = [];
let cols = 0;
let rows = 0;
let isTextDown = false;


const getTextAreaData = (tableArea) => {
  Array.from(tableArea ?? TEXTAREAS).forEach(area => {
    area.addEventListener('input', e => {
      // If insert between number or split from one number with 2 digits into 2 numbers one digit each 
      if (e.inputType === 'insertText' && e.data === ' ' && isTextDown === false) {
        isTextDown = true;
      }
      if (e.inputType === 'insertLineBreak') {
        isTextDown = true;
      }
      if (e.inputType === 'insertFromPaste' && e.data === null) {
        rows = 0;
        cols = 0;
        isTextDown = true;
      }
      if (e.inputType === 'deleteContentBackward' || e.inputType === 'deleteWordBackward' && e.data === null || /^\s*$/.test(e.target.value)) {
        rows = 0;
        cols = 0;
        isTextDown = false;
        if (e.target.value === null || e.target.value === '' || /^\s*$/.test(e.target.value)) {
          txtArray = [];
        } else {
          isTextDown = true;
        }
      }
      if (e.inputType === 'insertText' && e.data !== null && e.data !== ' ') {
        isTextDown = true;
      }
      if (isTextDown) {
        txtArray = e.target.value.trim().replace(/^\n+/g, '');
        txtArray = txtArray.split(/\n+/g).map(t => {

          // Comma after digit
          t = t.replace(/,/g, ' ');

          // whitespace between digits to one whitespace
          t = t.replace(/\s+/g, ' ');

          // new line
          t = t.replace(/\n+/g, '\n');

          // whitespace with new line or whitespace at end line to empty
          t = t.replace(/\s+\n+|\s+$/g, '');

          return t.trim();
        }).map(t => {
          t = t.replace(/\s+/g, ',');
          isTextDown = false;
          return t.split(',');
        }).map(t => {
          isTextDown = false;
          return t.map(n => isNaN(n) ? n : parseInt(n));
        });
      }

      document.getElementById(e.target.dataset.id).innerHTML = JSON.stringify(txtArray);
    });
  });
}
getTextAreaData();
