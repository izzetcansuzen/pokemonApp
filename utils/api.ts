export const fetchCards = async () => {
    const res = await fetch('https://api.pokemontcg.io/v2/cards');
    const data = await res.json();
    return data.data;
};
export const fetchCard = async (id : string) => {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
    const data = await res.json();
    return data;
};