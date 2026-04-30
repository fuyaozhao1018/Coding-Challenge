const fs = require("node:fs");
const path = require("node:path");

//To my understanding, the lips are represented by the six tildes on the face-outline line.
//And the pupils are represented by the two bullet points on either side of the face's middle semicolon.
//so the final score is 32 + 10 * 2 = 52

function getAngelicaArt() {
  const challenge = fs.readFileSync(path.join(__dirname, "README.md"), "utf8");
  const codeBlocks = [...challenge.matchAll(/```(?:\w+)?\n([\s\S]*?)```/g)];

  // The second fenced code block is Angelica's ASCII art.
  return codeBlocks[1][1].trimEnd();
}

function computePolkadotScore() {
  const lines = getAngelicaArt().split("\n");

  // Angelica's lips are the six tildes on this face-outline line.
  const lips = "~~~~~~";
  const lipsLine = lines.find((line) => line.includes("~            ~~~~~~' ' ` ,-'"));
  const lipsStart = lipsLine.indexOf(lips);
  const lipsEnd = lipsStart + lips.length - 1;

  // Her pupils are the two bullet characters around the face's middle semicolon.
  const pupilLine = lines.find((line) => line.includes("• ; •"));
  const pupilChars = [...pupilLine.matchAll(/•/g)].length;

  let insideLipsRange = 0;
  let outsideLipsRange = 0;

  for (const line of lines) {
    [...line].forEach((char, x) => {
      if (char !== "O") return;

      if (x >= lipsStart && x <= lipsEnd) {
        insideLipsRange += 1;
      } else {
        outsideLipsRange += 1;
      }
    });
  }

  return outsideLipsRange + insideLipsRange * pupilChars;
}

if (require.main === module) {
  console.log(computePolkadotScore());
}

module.exports = { computePolkadotScore };
