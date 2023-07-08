import React from 'react'

const Categories = () => {
    const data = [
        {
            cateImg: "./images/category/cat-1.png",
            cateName: "Apple",
        },
        {
            cateImg: "./images/category/cat-2.png",
            cateName: "Samasung",
        },
        {
            cateImg: "./images/category/cat-1.png",
            cateName: "Oppo",
        },
        {
            cateImg: "./images/category/cat-1.png",
            cateName: "Redmi",
        },
        {
            cateImg: "./images/category/cat-2.png",
            cateName: "Nokia",
        },
    ]
    return (
        // <>
        //     <div className='category'>
        //         {data.map((value, index) => {
        //             return (
        //                 <div className='box f_flex' key={index}>
        //                     <img src={value.cateImg} alt='' />
        //                     <span>{value.cateName}</span>
        //                 </div>
        //             )
        //         })}
        //     </div>
        // </>
        <>
            <div className='category'>
                <div className='chead d_flex'>
                    <h1>Brands </h1>
                    <h1>Shops </h1>
                </div>
                {data.map((value, index) => {
                    return (
                        <div className='box f_flex' key={index}>
                            <img src={value.cateImg} alt='' />
                            <span>{value.cateName}</span>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default Categories