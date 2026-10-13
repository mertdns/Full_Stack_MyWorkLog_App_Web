import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function WorkList() {
    const tableContentColumnsStyle: string = "border-1 border-black px-2";
    const [activeMonth, setActiveMonth] = useState<string>("1");
    const [activeYear, setActiveYear] = useState<number>(parseInt(new Date().getFullYear().toString()));

    const months = ["ocak", "şubat", "mart", "nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"];

    const increment = () => {
        let currentDay = new Date().getFullYear();
        if (activeYear < currentDay) {
            setActiveYear(prev => prev + 1)
        }
    }

    const decrement = () => {
        if(activeYear > 1950)
            setActiveYear(prev => prev - 1)
    }

    const tableColumns = [
        {
            id: 1,
            title: "ID"
        },
        {
            id: 2,
            title: "Tarih"
        },
        {
            id: 3,
            title: "Açıklama"
        },
        {
            id: 4,
            title: "İşlemler"
        }
    ]

    useEffect(() => {
        console.log(activeMonth)
    }, [activeMonth])

    return (
        <div>
            <div className="text-center">
                <h1 className="font-bold text-xl md:text-3xl text-cyan-800">Çalışma Günlüğüm</h1>
            </div>

            <div className="flex items-center justify-center flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-10 my-10">
                <div>
                    <select value={activeMonth} onChange={(e) => setActiveMonth(e.target.value)} className="border-1 focus:outline-0 border-black" name="month" id="month">
                        {
                            months.map((month, index) => (
                                <option key={index} className="bg-gray-400" value={index + 1}>{month[0].toUpperCase() + month.slice(1)}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex items-center justify-between gap-x-4">
                    <button className="cursor-pointer" onClick={decrement}>
                        <FaArrowAltCircleLeft />
                    </button>
                    <div>{activeYear}</div>
                    <button className="cursor-pointer" onClick={increment}>
                        <FaArrowAltCircleRight />
                    </button>
                </div>
            </div>

            <div className="max-w-160 mx-auto text-right px-2">
                <button className="bg-green-600 px-3 sm:px-5 rounded-xl text-gray-200 duration-200 hover:text-green-600 hover:border-1 hover:border-green-600 hover:bg-gray-200" type="button">Yeni Kayıt</button>
            </div>

            <div className="mx-auto my-10 px-2 max-w-160 overflow-x-auto scrollbar-thumb-gray-500">
                <table className="w-full">
                    <caption>Günler</caption>
                    <thead>
                        <tr>
                            {
                                tableColumns.map(column => (
                                    <th className="border-1 border-black px-1 md:px-2 py-1" key={column.id}>{column.title}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={tableContentColumnsStyle}>1</td>
                            <td className={tableContentColumnsStyle}>12 Ekim Pazartesi {activeYear}</td>
                            <td className={tableContentColumnsStyle}>Göreve Geldi</td>
                            <td className={tableContentColumnsStyle + " text-center"}>
                                <button className="focus:outline-0 border-0 bg-red-700 text-white my-2 px-3 rounded-xl duration-200 hover:bg-transparent hover:text-red-700 hover:border-1 hover:border-red-700" type="button">Sil</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}