"use client"
import {useEffect, useState} from "react";
import {fetchCard, fetchCards} from "@/utils/api";
import Image from "next/image";
interface Card {
    id: string;
    name: string;
    images: {
        small: string
    };
    types: Array<string>;
    hp: number;
    abilities: Array<any>
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
                <div className='flex flex-col items-center gap-2'>
                    <div className='font-bold'>
                        <p>Name:</p>
                    </div>
                    <div className='px-8 py-2 rounded-full shadow-2xl bg-white font-bold'>
                        <p>{card?.name}</p>
                    </div>
                </div>
                {/*Card Type*/}
                <div className='flex flex-col items-center gap-2'>
                    <div className='font-bold'>
                        <p>Types:</p>
                    </div>
                    {card?.types?.map(item => {
                        /*TODO: birden fazla değer gelirse kontrol et*/
                        return (
                            <div className='px-8 py-2 rounded-full shadow-2xl bg-white font-bold'>
                                <p>{item}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <div className='font-bold'>
                        <p>HP:</p>
                    </div>
                    <div className='px-8 py-2 rounded-full shadow-2xl bg-white font-bold'>
                        <p>{card?.hp}</p>
                    </div>
                </div>
                {/*Burada abilities tüm pokemonlarda yok onu kontrol ediyoruz*/}
                {card?.abilities && <div className='flex flex-col items-center gap-2'>
                    <div className='font-bold'>
                        <p>Abilities:</p>
                    </div>
                    <div className='px-8 py-2 rounded-full shadow-2xl bg-white font-bold'>
                        {card?.abilities?.map(item => {
                            /*TODO: birden fazla değer gelirse kontrol et*/
                            return (
                                <div className='px-8 py-2 rounded-full shadow-2xl bg-white font-bold'>
                                    <p>{item}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>}
            </div>
        </>
    )
}