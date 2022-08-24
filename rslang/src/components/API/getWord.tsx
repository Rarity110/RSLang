const id = '5e9f5ee35eb9e72bc21af4ad';
export const getWord = async () => {
  const wordResponse = await fetch(`https://rarity-rslang.herokuapp.com/words/${id}`, {
    method: 'GET'
    // headers: {
    // 	'Accept': 'application/json',
    // 	'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(user)
  });
  const content = await wordResponse.json();
  // console.log(content);
};
