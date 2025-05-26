import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import CatForm from "../../components/CatForm";

type Cat = {
    id: number;
    name: string;
    experience_years: number;
    breed: string;
    salary: number;
};

export default function CatPage() {
    const [cats, setCats] = useState<Cat[]>([]);
    const [editingSalaryId, setEditingSalaryId] = useState<number | null>(null);
    const [salaryValue, setSalaryValue] = useState<number>(0);

    const fetchCats = async () => {
        const res = await api.get("/cats");
        setCats(res.data);
    };

    const deleteCat = async (id: number) => {
        await api.delete(`/cats/${id}`);
        fetchCats();
    };
    const startEditing = (cat: Cat) => {
    setEditingSalaryId(cat.id);
    setSalaryValue(cat.salary);
    };
    const cancelEditing = () => {
        setEditingSalaryId(null);
    };
    const saveSalary = async (id: number) => {
        try {
        await api.patch(`/cats/${id}`, { salary: salaryValue });
        setEditingSalaryId(null);
        fetchCats();
        } catch (err) {
        alert("Failed to update salary");
        }
    };

    useEffect(() => {
        fetchCats();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Spy Cats</h1>
        <CatForm onSuccess={fetchCats} />
        <ul className="mt-6 space-y-2">
                {cats.map((cat) => (
                <li
                    key={cat.id}
                    className="p-4 bg-white border rounded shadow flex justify-between items-center"
                >
                    <div>
                    <p>
                        <strong>{cat.name}</strong> — {cat.breed} — {cat.experience_years} yrs
                    </p>
                    <p>
                        Salary:{" "}
                        {editingSalaryId === cat.id ? (
                        <input
                            type="number"
                            value={salaryValue}
                            onChange={(e) => setSalaryValue(Number(e.target.value))}
                            className="border rounded px-2 py-1 w-24"
                        />
                        ) : (
                        `$${cat.salary}`
                        )}
                    </p>
                    </div>
                    <div className="flex space-x-2">
                    {editingSalaryId === cat.id ? (
                        <>
                        <button
                            onClick={() => saveSalary(cat.id)}
                            className="btn bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={cancelEditing}
                            className="btn bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                        </>
                    ) : (
                        <>
                        <button
                            onClick={() => startEditing(cat)}
                            className="btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteCat(cat.id)}
                            className="btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                        </>
                    )}
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
}
