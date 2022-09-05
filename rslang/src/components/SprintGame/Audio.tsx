const rightAnswerSound = new Audio(
  'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav'
);
const wrongAnswerSound = new Audio(
  'https://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg'
);

export const rightAnswerPlay = () => {
  rightAnswerSound.play();
};

export const wrongAnswerPlay = () => {
  wrongAnswerSound.play();
};
