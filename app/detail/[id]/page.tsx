"use client"
import {useEffect, useState} from "react";
import {fetchCard, fetchCards} from "@/utils/api";
import Image from "next/image";
import PokemonDetailItem from "@/components/PokemonDetail/PokemonDetailItem";
interface Card {
    id: string;
    name: string;
    images: {
        small: string
    };
    types: Array<string>;
    hp: number;
    abilities: Array<string>
}

export default function DetailID({ params }: { params: { id: string } }){
    /*TODO: Loading ekranı ekle*/
    /*TODO: Birden fazla gelen kutucuklar için tasarım düzenlemesi yap*/

    const id: string = params.id
    const [card, setCard] = useState<Card>()
    const [savedCards, setsavedCards] = useState<string[]>([]);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        const fetchCardDetail = async () => {
            const cardDetail = await fetchCard(id)
            setCard(cardDetail);
        };

        fetchCardDetail();
    }, []);

    useEffect(() => {
        const savedPokemonIds = localStorage.getItem("savedCards");
        if (savedPokemonIds) {
            setsavedCards(JSON.parse(savedPokemonIds));
        }
    }, []);

    const handleSaveCard = () => {
        if (!savedCards.includes(id)) {
            const updatedPokemons = [...savedCards, id];
            localStorage.setItem("savedCards", JSON.stringify(updatedPokemons));
            setsavedCards(updatedPokemons);
            setIsSaved(true);
        }
    };

    const handleDeleteCard = () => {
        const updatedPokemons = savedCards.filter(pokemonId => pokemonId !== id);
        localStorage.setItem("savedCards", JSON.stringify(updatedPokemons));
        setsavedCards(updatedPokemons);
        setIsSaved(false);
    };

    useEffect(() => {
        setIsSaved(savedCards.includes(id));
    }, [savedCards]);

    return (
        <>
            {/*Image Container*/}
            <div className='flex justify-center items-center flex-col p-4 gap-6'>
                <div className='w-[220px] h-[320px] relative bg-red-500 rounded-md shadow-xl'>
                    <Image
                        src={card?.images?.small}
                        fill={true}
                        objectFit='cover'
                        alt="image"
                        className='absolute'
                    />
                </div>
                {/* Buttons */}
                <div className="flex fixed bottom-0 w-full">
                    {isSaved ? (
                        <button className="w-full px-8 py-2 bg-red-500 text-white font-bold" onClick={handleDeleteCard}>
                            Delete Pokemon!
                        </button>
                    ) : ""}
                    <button className="w-full px-8 py-2 bg-green-500 text-white font-bold" onClick={handleSaveCard}>
                        Save Pokemon!
                    </button>
                </div>
                {/*Name section*/}
                <div>name: {card?.name}</div>
                <PokemonDetailItem
                    label="Name"
                    data={card?.name}
                    isMultiple={false}
                />
                {/*HP Section*/}
                <PokemonDetailItem
                    label="HP"
                    data={card?.hp}
                    isMultiple={false}
                />
                {/*Card Type*/}
                <PokemonDetailItem
                    label="Card Type"
                    data={card?.types}
                    isMultiple={true}
                />
                {/*Abilities Section*/}
                {/*Card Type*/}
                {/*TODO: componentleştirme sırasında burasının bir dizi içerisinde geldiği anlaşıldığı için değiştirilmeli*/}
                <div className='flex flex-col items-center gap-2'>
                    <div className='font-bold'>
                        <p>Abilities</p>
                    </div>
                    {
                        card?.abilities?.map(item => (
                            <div className='px-8 py-2 rounded-full shadow-2xl bg-white font-bold'>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
}