import React, { useEffect, useRef } from 'react';

// interface IKeyTarget {
//   key: string;
// }

// export const useKeyPress = (keyTarget: string) => {
//   const [isKeyPressed, setIsKeyPressed] = useState(false);

//   const downHandler = ({ key }: IKeyTarget) => {
//     if (key === keyTarget) setIsKeyPressed(true);
//   };

//   const upHandler = ({ key }: IKeyTarget) => {
//     if (key === keyTarget) setIsKeyPressed(false);
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', downHandler);
//     window.addEventListener('keyup', upHandler);

//     return () => {
//       window.removeEventListener('keydown', downHandler);
//       window.removeEventListener('keyup', upHandler);
//     };
//   }, []);

//   return isKeyPressed;
// };
