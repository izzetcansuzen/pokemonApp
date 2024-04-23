"use client"
import {useEffect, useRef, useState} from 'react';
import CardItem from "@/components/CardItem";
import {fetchCards} from "@/utils/api";

interface Card {
    id: string;
    name: string;
    images: {
        small: string
    };
}
export default function List(){
    /*States*/
    const [cards, setCards] = useState<Card[]>([]);

    /*TODO: Loading ekranı ekle*/

    //Pokemon datalarını alıp state içerisine ekliyoruz
    useEffect(() => {
        const fetchCardsData = async () => {
            const cardsData = await fetchCards()
            setCards(cardsData);
        };

        fetchCardsData();
    }, []);

        /*TODO: Bu alan içerisinde sonra ki süreçler;
        *  page isimli bir state aç
        *  kullanıcı 95% scroll gerçekleştirdiğinde page isimli bir state'i güncelle
        *  başka bir state daha aç ve ona visible ismi ver
        *  visible state'e güncel kartların olduğu state'den slice işlemi yaparak güncellenmesini sağla
        * */
        useEffect(() => {
            const handleScroll = () => {
                const scrollHeight = document.documentElement.scrollHeight;
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const clientHeight = document.documentElement.clientHeight;

                const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
                if (scrollPercentage >= 95) {
                    console.log('You have scrolled 95% of the page.');
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
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