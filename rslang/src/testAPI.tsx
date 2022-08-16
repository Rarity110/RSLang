export const createUser = async () => {
  const rawResponse = await fetch('https://rarity-rslang.herokuapp.com/words', {
    method: 'GET'
    // headers: {
    // 	'Accept': 'application/json',
    // 	'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(user)
  });
  const content = await rawResponse.json();
  console.log(content);
};
