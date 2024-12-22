let userSymbol = "X",
  computerSymbol = "O",
  count = 1,
  needRandom,
  checkUser = true,
  gotoSecond = true,
  temp,
  userCount,
  emptyCount,
  computerCount,
  userInput,
  result,
  computerInput,
  smartGame = false,
  positionCounter = 0,
  randomValue,
  intelligentValue;
const userArray = [],
  computerArray = [];

let board = [
  ["","" ,"" ],
  ["","" , ""],
  ["","" ,"" ],
];

function displayBoard() {
  let id = 1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      document.getElementById(id).innerHTML = board[i][j];
      id++;
    }
  }
}
function play(e) {
  let text = parseInt(e.target.id);
  if (text == NaN) {
    alert("Invalid Input");
  } else {
    getUserInput(text);
  }
}
function displayResult(){
  document.getElementById("result").style.display="block"
  document.getElementById("restart").style.display="block"
}
function getUserInput(txt) {
  if (checkUser) {
    userInput = txt;

    if (
      userInput == "X" ||
      userInput == "O" ||
      userArray.includes(userInput) ||
      computerArray.includes(userInput)
    ) {
      alert("Invalid Input");
    } else {
      console.log("user:", userInput);
      console.log("user array: ", userArray);
      console.log("computer array : ", computerArray);
      userArray.push(userInput);
      assignValue(userInput, "X");
      if (count === 1) {
        count++;
        if (userInput == 5 && smartGame == false) {
          playWithPlan();
        } else if (userInput != 5) {
          if (userInput == 1) {
            assignValue(9, "O");
            computerArray.push(9);
          } else if (userInput == 3) {
            assignValue(7, "O");
            computerArray.push(7);
          } else if (userInput == 7) {
            assignValue(3, "O");
            computerArray.push(3);
          } else if (userInput == 9) {
            assignValue(1, "O");
            computerArray.push(9);
          } else {
            assignValue(5, "O");
            computerArray.push(5);
          }
        } else {
          getComputerInput();
        }
      } else {
        if (smartGame == true) {
          //playSmart();
          //getComputerInput();
          secondCheck();
        } else {
          getComputerInput();
        }
      }
    }
  }
}
function secondCheck() {
  smartGame = true;
  positionCounter = 0;
  for (let i = 0; i < 3; i++) {
    userCount = 0;
    temp = 2;
    for (let j = 0; j < 3; j++) {
      positionCounter++;
      if (board[i][j] == "X") {
        userCount++;
      }
      if (userCount == 2 && board[i][temp] != "O") {
        if (board[i][temp] != "X") {
          board[i][temp] = "O";
          console.log(i, temp);
          computerArray.push(switchPosition(i, temp));
          smartGame = false;

          displayBoard();
        }
      }
      if (board[i][j] != "X" && board[i][j] != "O") {
        temp = j;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    userCount = 0;
    temp = 2;
    positionCounter = 0;
    for (let j = 0; j < 3; j++) {
      positionCounter++;
      if (board[j][i] == "X") {
        userCount++;
      }
      if (userCount == 2 && board[temp][i] != "O") {
        if (board[temp][i] != "X") {
          board[temp][i] = "O";
          console.log(temp, i);
          displayBoard();

          computerArray.push(switchPosition(temp, i));

          smartGame = false;
        }
      }
      if (board[j][i] != "X" && board[j][i] != "O") {
        temp = j;
      }
    }
  }
  if (smartGame == true) {
    playSmart();
  }
}

function playWithPlan() {
  const cornerArray = [1, 3, 7, 9];
  let position = Math.floor(Math.random() * cornerArray.length);
  computerInput = cornerArray[position];

  assignValue(computerInput, "O");
  computerArray.push(computerInput);
  smartGame = true;
}

function playSmart() {
  let row, colum;
  if (computerArray[0] == 1) {
    (row = 0), (colum = 0);
  }
  if (computerArray[0] == 3) {
    (row = 0), (colum = 2);
  }
  if (computerArray[0] == 7) {
    (row = 2), (colum = 0);
  }
  if (computerArray[0] == 9) {
    (row = 2), (colum = 2);
  }
  let i = row;

  emptyCount = 0;
  for (let j = 0; j < board.length; j++) {
    if (board[i][j] != "X") {
      emptyCount++;
    }
    if (emptyCount === 3) {
      if (board[i][j] != "O") {
        board[i][j] = "O";
        computerArray.push(switchPosition(i, j));
      } else {
        board[i][j - 1] = "O";
        computerArray.push(switchPosition(i, j - 1));
      }

      displayBoard();
      smartGame = false;
      gotoSecond = false;
    }
  }

  if (gotoSecond) {
    let j = colum;
    emptyCount = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] != "X") {
        emptyCount++;
      }
      if (emptyCount === 3) {
        if (board[i][j] != "O") {
          board[i][j] = "O";
          computerArray.push(switchPosition(i, j));
        } else {
          board[i - 1][j] = "O";
          computerArray.push(switchPosition(i - 1, j));
        }

        displayBoard();
        smartGame = false;
      }
    }
  }
}

function getComputerInput() {
  if (userArray.length + computerArray.length == 9) {
    document.getElementById("result").innerHTML = "GAME DRAWN";
    displayResult();
    checkUser = false;
  }
  positionCounter = 0;
  for (let i = 0; i < 3; i++) {
    computerCount = 0;

    temp = 2;
    for (let j = 0; j < 3; j++) {
      positionCounter++;
      if (board[i][j] == "O") {
        computerCount++;
      }
      if (computerCount == 2 && board[i][temp] != "X") {
        if (board[i][temp] != "O") {
          board[i][temp] = "O";
          console.log(i, temp);
          computerArray.push(switchPosition(i, temp));

          displayBoard();
          document.getElementById("result").innerHTML = "COMPUTER WON";
          displayResult();
          checkUser = false;
          break;
        }
      }
      if (board[i][j] != "X" && board[i][j] != "O") {
        temp = j;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    computerCount = 0;
    temp = 2;
    positionCounter = 0;
    for (let j = 0; j < 3; j++) {
      positionCounter++;
      if (board[j][i] == "O") {
        computerCount++;
      }
      if (computerCount == 2 && board[temp][i] != "O") {
        if (board[temp][i] != "X") {
          board[temp][i] = "O";
          console.log(temp, i);
          displayBoard();

          computerArray.push(switchPosition(temp, i));
          document.getElementById("result").innerHTML = "COMPUTER WON";
          displayResult();
          checkUser = false;
          break;
        }
      }
      if (board[j][i] != "X" && board[j][i] != "O") {
        temp = j;
      }
    }
  }
  if (checkUser) {
    needRandom = true;
    positionCounter = 0;
    for (let i = 0; i < 3; i++) {
      userCount = 0;
      temp = 2;
      for (let j = 0; j < 3; j++) {
        positionCounter++;
        if (board[i][j] == "X") {
          userCount++;
        }
        if (userCount == 2 && board[i][temp] != "O") {
          if (board[i][temp] != "X") {
            board[i][temp] = "O";
            console.log(i, temp);
            computerArray.push(switchPosition(i, temp));
            needRandom = false;

            displayBoard();
          }
        }
        if (board[i][j] != "X" && board[i][j] != "O") {
          temp = j;
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      userCount = 0;
      temp = 2;
      positionCounter = 0;
      for (let j = 0; j < 3; j++) {
        positionCounter++;
        if (board[j][i] == "X") {
          userCount++;
        }
        if (userCount == 2 && board[temp][i] != "O") {
          if (board[temp][i] != "X") {
            board[temp][i] = "O";
            console.log(temp, i);
            displayBoard();

            computerArray.push(switchPosition(temp, i));

            needRandom = false;
          }
        }
        if (board[j][i] != "X" && board[j][i] != "O") {
          temp = j;
        }
      }
    }
    if (needRandom == true) {
      getRandomValue();
      //playSmart();
    }
    //if(needRandom==true && smartGame ==false){
    //getRandomValue();
    // }
  }
}
function getRandomValue() {
  randomValue = Math.floor(Math.random() * 10);
  if (randomValue === 10 || randomValue === 0) {
    getRandomValue();
  } else if (
    userArray.includes(randomValue) ||
    computerArray.includes(randomValue)
  ) {
    getRandomValue();
  } else {
    computerInput = randomValue;

    computerArray.push(computerInput);
    console.log("computer: ", computerInput);
    assignValue(computerInput, "O");
  }
}

function switchPosition(row, clm) {
  if (row == 0 && clm == 0) {
    return 1;
  }
  if (row == 0 && clm == 1) {
    return 2;
  }
  if (row == 0 && clm == 2) {
    return 3;
  }
  if (row == 1 && clm == 0) {
    return 4;
  }
  if (row == 1 && clm == 1) {
    return 5;
  }
  if (row == 1 && clm == 2) {
    return 6;
  }
  if (row == 2 && clm == 0) {
    return 7;
  }
  if (row == 2 && clm == 1) {
    return 8;
  }
  if (row == 2 && clm == 2) {
    return 9;
  }
}
function assignValue(value, symbol) {
  if (value == 1) {
    board[0][0] = symbol;
  } else if (value == 2) {
    board[0][1] = symbol;
  } else if (value == 3) {
    board[0][2] = symbol;
  } else if (value == 4) {
    board[1][0] = symbol;
  } else if (value == 5) {
    board[1][1] = symbol;
  } else if (value == 6) {
    board[1][2] = symbol;
  } else if (value == 7) {
    board[2][0] = symbol;
  } else if (value == 8) {
    board[2][1] = symbol;
  } else {
    board[2][2] = symbol;
  }

  displayBoard();
}
