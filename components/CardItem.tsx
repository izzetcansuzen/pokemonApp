import Image from "next/image";
import Link from "next/link";
interface CardItemProps {
    id: string;
    name: string;
    image: string;
}
export default function CardItem ({name, image, id}: CardItemProps){
    return (
        <Link href={`/detail/${id}`}>
            <div className="w-[150px] h-[auto] bg-white rounded-md shadow-2xl relative cursor-pointer">
                {/*Pokemon card image*/}
                <div className='w-full h-[220px] relative rounded-md'>
                    <Image
                        src={image}
                        alt="image"
                        fill={true}
                        objectFit="cover"
                        className='absolute rounded-tl-md rounded-tr-md'
                    />
                </div>
                {/*Pokemon card name*/}
                <div className='w-full h-auto bg-white p-2 text-black text-center font-bold rounded-md'>
                    <p>{name}</p>
                </div>
            </div>
        </Link>
    )
}