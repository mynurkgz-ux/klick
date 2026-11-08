const scoreElement = document.querySelector("#score");
const clickButton = document.querySelector("#click-button");
const upgradeButton = document.querySelector("#upgrade-button");
const upgradeCostElement = document.querySelector("#upgrade-cost");
const clickPowerElement = document.querySelector("#click-power");
const resetButton = document.querySelector("#reset-button");

const savedGame = JSON.parse(localStorage.getItem("clicker-game") || "null");

let score = savedGame?.score ?? 0;
let clickPower = savedGame?.clickPower ?? 1;
let upgradeCost = savedGame?.upgradeCost ?? 10;

function formatNumber(value) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function saveGame() {
  localStorage.setItem(
    "clicker-game",
    JSON.stringify({ score, clickPower, upgradeCost }),
  );
}

function render() {
  scoreElement.textContent = formatNumber(score);
  clickPowerElement.textContent = formatNumber(clickPower);
  upgradeCostElement.textContent = `${formatNumber(upgradeCost)} очков`;
  upgradeButton.disabled = score < upgradeCost;
}

clickButton.addEventListener("click", () => {
  score += clickPower;
  saveGame();
  render();
});

upgradeButton.addEventListener("click", () => {
  if (score < upgradeCost) return;

  score -= upgradeCost;
  clickPower += 1;
  upgradeCost = Math.ceil(upgradeCost * 1.7);
  saveGame();
  render();
});

resetButton.addEventListener("click", () => {
  if (!window.confirm("Сбросить весь прогресс?")) return;

  score = 0;
  clickPower = 1;
  upgradeCost = 10;
  localStorage.removeItem("clicker-game");
  render();
});

render();
