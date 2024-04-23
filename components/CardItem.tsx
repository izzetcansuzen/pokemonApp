import Image from "next/image";

export default function CardItem(){
    return (
        <div>
            <div className="w-[150px] h-[auto] bg-white rounded-md shadow-2xl relative">
                {/*Pokemon card image*/}
                <div className='w-full h-[150px] relative rounded-md'>
                    <Image
                        src="/profile_image.jpeg"
                        alt="image"
                        fill={true}
                        objectFit="cover"
                        className='absolute rounded-tl-md rounded-tr-md'
                    />
                </div>
                {/*Pokemon card name*/}
                <div className='w-full h-auto bg-white p-2 text-black text-center font-bold rounded-md'>
                    <p>Kurosaki Ichigo</p>
                </div>
            </div>
        </div>
    )
}