"use client"
import {useEffect, useState} from "react";
import {fetchCard, fetchCards} from "@/utils/api";
interface Card {
    id: string;
    name: string;
    images: {
        small: string
    };
}
export default function DetailID(){
    //TODO: Bu sayfa tasarımsal olarak düzenlenmeli
    //TODO: Sayfada istek atılıp istenen pokemona göz atılmalı
    //TODO: Gelecek değerler => Card type, HP, abilities
    //TODO: Kullanıcı isterse bunu save yapıp localstorage'e kaydeder
    //TODO: Kullanıcı daha önce kaydetmişse remove butonu olup isterse remove edebilir

    const [card, setCard] = useState<Card | null >(null)

    useEffect(() => {
        const fetchCardData = async () => {
            const cardData = await fetchCard()
            setCard(cardData);
        };

        fetchCardData();
    }, []);

    useEffect(() => {
        console.log(card)
    }, [card]);

    return (
        <>
            {/*Image Container*/}
            <div>
            </div>
        </>
    )
}