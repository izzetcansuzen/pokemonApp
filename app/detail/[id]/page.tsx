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
    //TODO: Kullanıcı isterse bunu save yapıp localstorage'e kaydeder
    //TODO: Kullanıcı daha önce kaydetmişse remove butonu olup isterse remove edebilir
    const id: string = params.id
    const [card, setCard] = useState<Card>()

    useEffect(() => {
        const fetchCard = async () => {
            const res = await fetch(`https://api.pokemontcg.io/v2/cards/${params.id}`);
            const data = await res.json();
            setCard(data.data)
        };

        fetchCard();
    }, []);

    useEffect(() => {
        console.log(card)
    }, [card]);

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
                <div className='flex fixed bottom-0 w-full'>
                    {/*Kontrol eklenmeli*/}
                    <div className='w-full'>
                        <button className='w-full px-8 py-2 bg-red-500 text-white font-bold'>Delete Pokemon!</button>
                    </div>
                    <div className='w-full'>
                        <button className='w-full px-8 py-2 bg-green-500 text-white font-bold'>Save Pokemon!</button>
                    </div>
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