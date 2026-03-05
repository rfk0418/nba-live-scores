const API_KEY = "bf7b52a8-b4de-40bf-bf89-0b4fc699306c";

async function getScores() {
  const today = new Date().toLocaleDateString("en-CA");

  const response = await fetch(
    `https://api.balldontlie.io/v1/games?dates[]=${today}`,
    {
      headers: {
        Authorization: API_KEY
      }
    }
  );

  const data = await response.json();
  displayScores(data.data);
}

function displayScores(games) {
  const scoresDiv = document.getElementById("scores");
  scoresDiv.innerHTML = "";

  games.forEach(game => {
    scoresDiv.innerHTML += `
      <div>
        <strong>${game.home_team.full_name}</strong> ${game.home_team_score}
        -
        ${game.visitor_team_score} <strong>${game.visitor_team.full_name}</strong>
        <br>
        Status: ${game.status}
        <hr>
      </div>
    `;
  });
}

getScores();
setInterval(getScores, 60000); // refresh every 60 seconds
