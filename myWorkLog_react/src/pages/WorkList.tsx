
import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import type { AddWork, WorkType } from "../types/Work";
import {
    addWork,
    clearFilteredWorks,
    deleteWork,
    getAllWorks,
    getFilteredWorks
} from "../store/workSlice";
import { IoMdClose } from "react-icons/io";
import { useConvertDateToText } from "../hooks/useConvertDateToText";

export const months = [
    "ocak", "şubat", "mart", "nisan", "mayıs", "haziran",
    "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"
];

// Hook kurallarına uygun olarak her kayıt için ayrı satır component'i.
function WorkRow({
    work,
    tableContentColumnsStyle,
    onDelete
}: {
    work: WorkType;
    tableContentColumnsStyle: string;
    onDelete: (id: string) => void;
}) {
    const data = useConvertDateToText(work.date);

    return (
        <tr>
            <td className={tableContentColumnsStyle}>{work['_id']}</td>
            <td className={tableContentColumnsStyle}>{data.convert()}</td>
            <td className={tableContentColumnsStyle}>{work.explanation}</td>
            <td className={`${tableContentColumnsStyle} text-center`}>
                <button
                    className="focus:outline-0 border-0 bg-red-700 text-white my-2 px-3 rounded-xl duration-200 hover:bg-transparent hover:text-red-700 hover:border-1 hover:border-red-700"
                    onClick={() => onDelete(work['_id'])}
                    type="button"
                >
                    Sil
                </button>
            </td>
        </tr>
    );
}

export default function WorkList() {
    const date = new Date();

    const tableContentColumnsStyle = "border-1 border-black px-2";

    const addWorkModalRef = useRef<HTMLDivElement>(null);
    const deleteWorkModalRef = useRef<HTMLDivElement>(null);
    const addWorkInputRef = useRef<HTMLInputElement>(null);

    const [addNewWorkModalState, setAddNewWorkModalState] =
        useState<boolean>(false);

    const [deleteWorkModalState, setDeleteWorkModalState] =
        useState<boolean>(false);

    const [activeMonth, setActiveMonth] = useState<string>(
        String(date.getMonth() + 1).padStart(2, "0")
    );

    const [activeYear, setActiveYear] = useState<number>(
        date.getFullYear()
    );

    const [fullDate, setFullDate] = useState<string>(
        `${date.getDate()}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}-${date.getDay()}`
    );

    const [textfullDate] = useState<string>(
        useConvertDateToText(fullDate).convert()
    );

    const [addWorkInput, setAddWorkInput] = useState<null | string>(null);
    const [activeWorkId, setActiveWorkId] = useState<string>('');

    const works = useSelector((state: RootState) => state.work.works);
    const filteredWorks = useSelector(
        (state: RootState) => state.work.filteredWorks
    );

    const dispatch: AppDispatch = useDispatch();

    const increment = () => {
        const currentYear = new Date().getFullYear();

        if (activeYear < currentYear) {
            setActiveYear(prev => prev + 1);
        }
    };

    const decrement = () => {
        if (activeYear > 1950) {
            setActiveYear(prev => prev - 1);
        }
    };

    const changeValuesWithOrder = (
        deleteWorkValue: boolean,
        addWorkValue: boolean
    ) => {
        setDeleteWorkModalState(deleteWorkValue);
        setAddNewWorkModalState(addWorkValue);
    };

    const handleModalClick = (
        e: MouseEvent,
        modal: HTMLDivElement
    ) => {
        if (e.target === modal) {
            setAddNewWorkModalState(false);
            setDeleteWorkModalState(false);
        }
    };

    useEffect(() => {
        dispatch(getAllWorks());
    }, [dispatch]);

    useEffect(() => {
        if (addNewWorkModalState) {
            setAddWorkInput("");
            addWorkInputRef.current?.focus();
        }
    }, [addNewWorkModalState]);

    useEffect(() => {
        const modal = addWorkModalRef.current;
        if (!modal) return;

        const handleClick = (e: MouseEvent) => {
            handleModalClick(e, modal);
        };

        modal.addEventListener("click", handleClick);

        return () => {
            modal.removeEventListener("click", handleClick);
        };
    }, [addNewWorkModalState]);

    useEffect(() => {
        const modal = deleteWorkModalRef.current;
        if (!modal) return;

        const handleClick = (e: MouseEvent) => {
            handleModalClick(e, modal);
        };

        modal.addEventListener("click", handleClick);

        return () => {
            modal.removeEventListener("click", handleClick);
        };
    }, [deleteWorkModalState]);

    useEffect(() => {
        if (Number(activeMonth) === 0) {
            dispatch(clearFilteredWorks());
            return;
        }

        setFullDate(
            `${date.getDate()}-${activeMonth}-${activeYear}-${date.getDay()}`
        );
    }, [activeMonth, activeYear, dispatch]);

    useEffect(() => {
        if (Number(activeMonth) !== 0) {
            dispatch(getFilteredWorks(fullDate));
        }
    }, [fullDate, activeMonth, dispatch, works]);

    const tableColumns = [
        { id: 1, title: "ID" },
        { id: 2, title: "Tarih" },
        { id: 3, title: "Açıklama" },
        { id: 4, title: "İşlemler" }
    ];

    const handleAddWork = () => {
        const obj: AddWork = {
            date: `${date.getDate()}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}-${date.getDay()}`
        };

        if (addWorkInput) {
            obj.explanation = addWorkInput;
        }

        dispatch(addWork(obj));
        dispatch(getFilteredWorks(fullDate));
        changeValuesWithOrder(false, false);
        setAddWorkInput("");
    };

    const handleDeleteWork = (id: string) => {
        setActiveWorkId(id);
        changeValuesWithOrder(true, false);
    };

    if (addNewWorkModalState) {
        return (
            <div
                ref={addWorkModalRef}
                id="addWorkModal"
                className="bg-[rgba(0,0,0,.4)] absolute left-0 top-0 bottom-0 right-0 duration-400 flex items-center justify-center"
            >
                <div className="bg-blue-300 max-w-70 w-full rounded-xl p-2 mx-2">
                    <div className="text-right">
                        <IoMdClose
                            onClick={() => setAddNewWorkModalState(false)}
                            className="ml-auto text-2xl cursor-pointer"
                        />
                    </div>

                    <div className="text-center">
                        <h1>Ekle</h1>
                        <hr />

                        <div className="flex items-center justify-center flex-col gap-y-3 sm:flex-row gap-x-10 my-4">
                            <label htmlFor="explanation">Açıklama</label>

                            <input
                                className="outline-0 border-b-1 border-b-yellow-600 placeholder:px-2 placeholder:text-xs text-xs px-2"
                                type="text"
                                name="explanation"
                                id="explanation"
                                value={addWorkInput ?? ""}
                                onChange={e => setAddWorkInput(e.target.value)}
                                ref={addWorkInputRef}
                                placeholder="Opsiyonel Açıklama Gir..."
                            />
                        </div>

                        <div className="text-center my-4">
                            <button
                                onClick={handleAddWork}
                                className="bg-yellow-700 text-gray-300 font-bold px-4 py-2 rounded-2xl text-xs cursor-pointer duration-200 hover:bg-white hover:text-yellow-700 hover:border-1 hover:border-yellow-700"
                                type="button"
                            >
                                Ekle
                            </button>
                        </div>

                        <div>
                            <span className="text-orange-800">
                                Bugünün Tarihi:
                            </span>{" "}
                            <strong>{textfullDate}</strong>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (deleteWorkModalState) {
        return (
            <div
                ref={deleteWorkModalRef}
                id="deleteWorkModal"
                className="bg-[rgba(0,0,0,.4)] absolute left-0 top-0 bottom-0 right-0 duration-400 flex items-center justify-center"
            >
                <div className="bg-blue-300 max-w-70 w-full rounded-xl p-2 mx-2">
                    <div className="mx-auto text-center">
                        <h1 className="text-xl text-gray-700 font-bold">
                            Kayıt Silinsin mi?
                        </h1>

                        <div className="flex items-center justify-end gap-x-3 px-2 mt-4">
                            <button
                                className="bg-green-700 text-white font-bold text-xs px-4 p-1 cursor-pointer duration-200 hover:bg-transparent hover:text-green-700 hover:border-1 hover:border-green-700"
                                onClick={() =>
                                    changeValuesWithOrder(false, false)
                                }
                                type="button"
                            >
                                İptal
                            </button>

                            <button
                                className="bg-red-700 text-white font-bold text-xs px-4 p-1 cursor-pointer duration-200 hover:bg-transparent hover:text-red-700 hover:border-1 hover:border-red-700"
                                type="button"
                                onClick={() => {
                                    dispatch(deleteWork(activeWorkId));
                                    changeValuesWithOrder(false, false);
                                }}
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="duration-400">
            <div className="text-center">
                <h1 className="font-bold text-xl md:text-3xl text-cyan-800">
                    Çalışma Günlüğüm
                </h1>
            </div>

            <div className="flex items-center justify-center flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-10 my-10">
                <div>
                    <select
                        value={activeMonth}
                        onChange={e => setActiveMonth(e.target.value)}
                        className="border-1 focus:outline-0 border-black"
                        name="month"
                        id="month"
                    >
                        <option className="bg-gray-400" value="0">
                            Tümü
                        </option>

                        {months.map((month, index) => (
                            <option
                                key={index + 1}
                                className="bg-gray-400"
                                value={String(index + 1).padStart(2, "0")}
                            >
                                {month[0].toUpperCase() + month.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-between gap-x-4">
                    <button
                        className="cursor-pointer"
                        onClick={decrement}
                        type="button"
                    >
                        <FaArrowAltCircleLeft />
                    </button>

                    <div>
                        {Number(activeMonth) !== 0 ? activeYear : "Tümü"}
                    </div>

                    <button
                        className="cursor-pointer"
                        onClick={increment}
                        type="button"
                    >
                        <FaArrowAltCircleRight />
                    </button>
                </div>
            </div>

            <div className="max-w-160 mx-auto text-right px-2">
                <button
                    className="bg-green-600 px-3 sm:px-5 rounded-xl text-gray-200 duration-200 hover:text-green-600 hover:border-1 hover:border-green-600 hover:bg-gray-200 cursor-pointer"
                    onClick={() => changeValuesWithOrder(false, true)}
                    type="button"
                >
                    Yeni Kayıt
                </button>
            </div>

            <div className="mx-auto my-10 px-2 max-w-160 overflow-x-auto scrollbar-thumb-gray-500">
                <table className="w-full">
                    <caption className="select-none">Günler</caption>

                    <thead>
                        <tr>
                            {tableColumns.map(column => (
                                <th
                                    className="border-1 border-black px-1 md:px-2 py-1"
                                    key={column.id}
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Number(activeMonth) === 0
                            ? works?.map((work: WorkType) => (
                                <WorkRow
                                    key={work['_id']}
                                    work={work}
                                    tableContentColumnsStyle={tableContentColumnsStyle}
                                    onDelete={handleDeleteWork}
                                />
                            ))
                            : filteredWorks?.map((work: WorkType) => (
                                <WorkRow
                                    key={work['_id']}
                                    work={work}
                                    tableContentColumnsStyle={tableContentColumnsStyle}
                                    onDelete={handleDeleteWork}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
