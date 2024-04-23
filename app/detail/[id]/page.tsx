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
export default function DetailID(){
    //TODO: Bu sayfa tasarımsal olarak düzenlenmeli
    //TODO: Kullanıcı isterse bunu save yapıp localstorage'e kaydeder
    //TODO: Kullanıcı daha önce kaydetmişse remove butonu olup isterse remove edebilir

    const [card, setCard] = useState<Card>()

    useEffect(() => {
        const fetchCardData = async () => {
            const cardData = await fetchCard()
            setCard(cardData.data);
        };

        fetchCardData();
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
                {card?.abilities && <PokemonDetailItem
                    label="Abilities"
                    data={card?.abilities}
                    isMultiple={true}
                />}
            </div>
        </>
    )
}