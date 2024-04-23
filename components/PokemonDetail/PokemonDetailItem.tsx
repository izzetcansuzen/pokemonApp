interface PokemonDetail {
    label: string,
    data: Array<string> | string | number,
    isMultiple: boolean
}
export default function PokemonDetailItem({ label, data, isMultiple }: PokemonDetail) {
    return (
        <div className='flex flex-col items-center gap-2'>
            <div className='font-bold'>
                <p>{label}:</p>
            </div>
            {/*TODO: componentleştir*/}
            {isMultiple ?
                (data as Array<string>)?.map(item => (
                    <div key={item} className='px-8 py-2 rounded-full shadow-2xl bg-white font-bold'>
                        <p>{item}</p>
                    </div>
                ))
                :
                (
                    <div className='px-8 py-2 rounded-full shadow-2xl bg-white font-bold'>
                        <p>{data}</p>
                    </div>
                )
            }
        </div>
    )
}