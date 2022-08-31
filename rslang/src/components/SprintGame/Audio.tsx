const rightAnswerSound = new Audio(
  'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav'
);
const wrongAnswerSound = new Audio(
  'http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg'
);

export const rightAnswerPlay = () => {
  rightAnswerSound.play();
};

export const wrongAnswerPlay = () => {
  wrongAnswerSound.play();
};
