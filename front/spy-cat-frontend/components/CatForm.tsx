import { useState } from "react";
import { api } from "../lib/api";
import '../styles/globals.css';
type Props = {
    onSuccess: () => void;
};

export default function CatForm({ onSuccess }: Props) {
    const [form, setForm] = useState({
        name: "",
        experience_years: 0,
        breed: "",
        salary: 0,
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
    try {
        await api.post("/cats", {
        ...form,
        experience_years: Number(form.experience_years),
        salary: Number(form.salary),
        });
        setForm({ name: "", experience_years: 0, breed: "", salary: 0 });
        onSuccess();
        setError("");
    } catch (err: any) {
        const detail = err.response?.data?.detail;
        if (detail === "Invalid breed") {
        setError("Breed not found in TheCatAPI. Please enter a valid breed.");
        } else {
        setError(detail || "Failed to add cat");
        }
    }
    };

return (
    <div className="p-4 border rounded bg-white shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add Spy Cat</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        
        <div className="mb-3">
        <label htmlFor="name" className="block font-medium mb-1">Name</label>
        <input
            id="name"
            name="name"
            placeholder="Name"
            className="input w-full"
            value={form.name}
            onChange={handleChange}
        />
        </div>
        
        <div className="mb-3">
        <label htmlFor="experience_years" className="block font-medium mb-1">Experience (years)</label>
        <input
            id="experience_years"
            name="experience_years"
            type="number"
            placeholder="Experience"
            className="input w-full"
            value={form.experience_years}
            onChange={handleChange}
            min={0}
        />
        </div>
        
        <div className="mb-3">
        <label htmlFor="breed" className="block font-medium mb-1">Breed</label>
        <input
            id="breed"
            name="breed"
            placeholder="Breed"
            className="input w-full"
            value={form.breed}
            onChange={handleChange}
        />
        </div>
        
        <div className="mb-3">
        <label htmlFor="salary" className="block font-medium mb-1">Salary</label>
        <input
            id="salary"
            name="salary"
            type="number"
            placeholder="Salary"
            className="input w-full"
            value={form.salary}
            onChange={handleChange}
            min={0}
        />
        </div>
        
        <button className="btn mt-2" onClick={handleSubmit}>Create</button>
    </div>
);
}
