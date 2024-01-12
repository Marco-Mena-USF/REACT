import uuid from "uuid";

/* Select a random element from values array. */
const choice = (values) => {
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
};

/* Format response data from the Deck of Cards API,
 * extracting just the image url. */
const formatCard = (data) => ({
  image: data.cards[0].image,
  id: uuid()
});

/* Format response data from the Pokemon API,
 * extracting the front image, back image,
 * and array of relevant stat information. */
const formatPokemon = (data) => ({
  id: uuid(),
  front: data.sprites.front_default,
  back: data.sprites.back_default,
  name: data.name,
  stats: data.stats.map(stat => ({
    value: stat.base_stat,
    name: stat.stat.name
  }))
});

export { choice, formatCard, formatPokemon };
