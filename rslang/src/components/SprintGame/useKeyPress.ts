import React, { useEffect, useState } from 'react';

interface IKeyTarget {
  code: string | number;
}

export const useKeyPress = (keyTarget: string | number) => {
  let isKeyPressed = false;

  const downHandler = ({ code }: IKeyTarget) => {
    if (code === keyTarget) isKeyPressed = true;
  };

  const upHandler = ({ code }: IKeyTarget) => {
    if (code === keyTarget) isKeyPressed = false;
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return isKeyPressed;
};
