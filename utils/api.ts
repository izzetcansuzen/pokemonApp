export const fetchCards = async () => {
    const res = await fetch('https://api.pokemontcg.io/v2/cards');
    const data = await res.json();
    return data.data;
};

/*değer dinamik olarak güncellenmeli*/
export const fetchCard = async () => {
    const res = await fetch('https://api.pokemontcg.io/v2/cards/hgss4-1');
    const data = await res.json();
    return data;
};