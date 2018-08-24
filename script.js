const table1 = document.getElementById('table1');
const table2 = document.getElementById('table2');

let captchaNumber;

const combinations = {
  '0': [ [1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1] ],
  '1': [ [0,0,1],[0,1,1],[0,0,1],[0,0,1],[0,0,1] ],
  '2': [ [1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1] ],
  '3': [ [1,1,1],[0,0,1],[0,1,1],[0,0,1],[1,1,1] ],
  '4': [ [1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1] ],
  '5': [ [1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1] ],
  '6': [ [1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1] ],
  '7': [ [1,1,1],[0,0,1],[0,1,0],[0,1,0],[0,1,0] ],
  '8': [ [1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1] ],
  '9': [ [1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1] ]
};

function buildCaptcha() {
  captchaNumber = getRandomNumber(0, 9);

  buildComboTable(captchaNumber[0], table1);
  buildComboTable(captchaNumber[1], table2);
}

function buildComboTable(key, table) {
  let str = '';

  combinations[key].forEach((outerItem, i) => {
    str += '<tr>';

    outerItem.forEach((innerItem, j) => {
      if(combinations[key][i][j] === 1) {
        str += '<td style="background-color: red;"></td>';
      } else {
        str += '<td></td>';
      }
    });

    str += '</tr>'
  });

  table.innerHTML = str;
}

function checkResult() {
  const input = document.forms[0].input;
  const result = document.getElementById('result');

  if (!input.value) {
    return;
  }

  if(input.value === captchaNumber) {
    result.innerHTML = '<b style="color: green">RIGHT!</b>';
    input.value = '';
    input.disabled = true;
  } else {
    result.innerHTML = '<b style="color: red">WRONG!</b>';
    buildCaptcha();
  }
}

function getRandomNumber(min, max) {
  const one =  Math.round(Math.random() * (max - min)) + min;
  const two =  Math.round(Math.random() * (max - min)) + min;

  return '' + one + two;
}