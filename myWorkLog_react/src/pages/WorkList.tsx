import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaBullseye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import type { WorkType } from "../types/Work";
import { deleteWork } from "../store/workSlice";
import { IoMdClose } from "react-icons/io";
import { useConvertDateToText } from "../hooks/useConvertDateToText";

export const months = ["ocak", "şubat", "mart", "nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"];

export default function WorkList() {
    const date = new Date();
    const addWorkModal = useRef<HTMLDivElement>(null);
    const tableContentColumnsStyle: string = "border-1 border-black px-2";
    const [activeMonth, setActiveMonth] = useState<string>((date.getMonth() + 1).toString());
    const [activeYear, setActiveYear] = useState<number>(date.getFullYear());
    const [fullDate, setFullDate] = useState<string>(
        `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getDay()}`
    );
    const [textfullDate, setTextFullDate] = useState<string>(useConvertDateToText(fullDate).convert());
    const [addNewWorkModalState, setAddNewWorkModalState] = useState<boolean>(false);

    const works = useSelector((state: RootState) => state.work.works);
    const dispatch: AppDispatch = useDispatch();

    const increment = () => {
        let currentDay = new Date().getFullYear();
        if (activeYear < currentDay) {
            setActiveYear(prev => prev + 1)
        }
        setFullDate(`${date.getDate()}-${activeMonth}-${activeYear}`);
    }

    const decrement = () => {
        if (activeYear > 1950)
            setActiveYear(prev => prev - 1)
    }

    const deleteWorkBtnClick = (workId: number) => {
        dispatch(deleteWork(workId))
    }

    const addNewWorkLogBtnClick = () => {
        setAddNewWorkModalState(true);
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

    // useEffect(() => {
    // }, [activeMonth, activeYear])

    useEffect(() => {
        const addWorkModalClickFunc = (e: any) => {
            if (e.target.id === "addWorkModal")
                setAddNewWorkModalState(false);
        }

        addWorkModal.current?.addEventListener("click", addWorkModalClickFunc);

        return () => addWorkModal.current?.removeEventListener("click", addWorkModalClickFunc);
    })

    if (addNewWorkModalState) {
        return (
            <div ref={addWorkModal} id="addWorkModal" className="bg-[rgba(0,0,0,.4)] absolute left-0 top-0 bottom-0 right-0 duration-400 flex items-center justify-center">
                <div className="bg-blue-300 max-w-70 w-full rounded-xl p-2 mx-2">
                    <div className="text-right">
                        <IoMdClose onClick={() => setAddNewWorkModalState(false)} className="ml-auto text-2xl cursor-pointer" />
                    </div>
                    <div className="text-center">
                        <h1>EKle</h1>
                        <hr />
                        <div className="flex items-center justify-center flex-col gap-y-3 sm:flex-row gap-x-10 my-4">
                            <label htmlFor="explanation">Açıklama</label>
                            <input className="outline-0 border-b-1 border-b-yellow-600 placeholder:px-2 placeholder:text-xs text-xs px-2" type="text" name="explanation" placeholder="Opsiyonel Açıklama Gir..." />
                        </div>
                        <div className="text-center my-4">
                            <button className="bg-yellow-700 text-gray-300 font-bold px-4 py-2 rounded-2xl text-xs cursor-pointer duration-200 hover:bg-white hover:text-yellow-700 hover:border-1 hover:border-yellow-700" type="button">
                                Ekle
                            </button>
                        </div>
                        <div>
                            <span className="text-orange-800">Bugünün Tarihi:</span> <strong>{textfullDate}</strong>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="duration-400">
            <div className="text-center">
                <h1 className="font-bold text-xl md:text-3xl text-cyan-800">Çalışma Günlüğüm</h1>
            </div>

            <div className="flex items-center justify-center flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-10 my-10">
                <div>
                    <select value={activeMonth} onChange={(e) => setActiveMonth(e.target.value)} className="border-1 focus:outline-0 border-black" name="month" id="month">
                        {
                            months.map((month, index) => (
                                <option key={index} className="bg-gray-400" value={index}>{month[0].toUpperCase() + month.slice(1)}</option>
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
                <button
                    className="bg-green-600 px-3 sm:px-5 rounded-xl text-gray-200 duration-200 hover:text-green-600 hover:border-1 hover:border-green-600 hover:bg-gray-200 cursor-pointer"
                    onClick={addNewWorkLogBtnClick}
                    type="button">Yeni Kayıt</button>
            </div>

            <div className="mx-auto my-10 px-2 max-w-160 overflow-x-auto scrollbar-thumb-gray-500">
                <table className="w-full">
                    <caption className="select-none">Günler</caption>
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
                        {
                            works && works.map((work: WorkType) => {
                                const data = useConvertDateToText(work.date);
                                return (
                                    <tr key={work.id}>
                                        <td className={tableContentColumnsStyle}>{work.id}</td>
                                        <td className={tableContentColumnsStyle}>{data.convert()}</td>
                                        <td className={tableContentColumnsStyle}>{work.explanation}</td>
                                        <td className={tableContentColumnsStyle + " text-center"}>
                                            <button
                                                className="focus:outline-0 border-0 bg-red-700 text-white my-2 px-3 rounded-xl duration-200 hover:bg-transparent hover:text-red-700 hover:border-1 hover:border-red-700"
                                                onClick={() => deleteWorkBtnClick(work.id)}
                                                type="button">Sil</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}