export const fetchCards = async () => {
    const res = await fetch('https://api.pokemontcg.io/v2/cards');
    const data = await res.json();
    return data.data;
};