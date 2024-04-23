"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from "next/image";
import CardItem from "@/components/CardItem";
interface Card {
    id: string;
    name: string;
    images: {
        small: string
    };
}
export default function List(){
    //TODO: sayfa başına 10 scroll olucak
    //TODO: scroll yapıldığında devamı yüklenecek (sınırsız scroll)

    /*States*/
    const [cards, setCards] = useState<Card[]>([]);

    /*TODO: İstekten değerler geç geliyor kontrol et*/
    //Pokemon datalarını alıp state içerisine ekliyoruz
    useEffect(() => {
        const fetchCards = async () => {
            const res = await fetch('https://api.pokemontcg.io/v2/cards');
            const data = await res.json();
            setCards(data.data);
        };

        fetchCards();
    }, []);

    return (
        <div className='max-w-[1440px] mx-auto my-0 bg-red-500'>
            <h1 className='text-center text-2xl font-bold p-4'>Select Your Pokemon!</h1>
            {/*Pokemon list container*/}
            <div className='card-container'>
                {/*Pokemon Card Container*/}
                {cards.map(item => {
                    return (
                        <CardItem
                            key={item.id}
                            name={item.name}
                            image={item.images.small}
                            id={item.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}