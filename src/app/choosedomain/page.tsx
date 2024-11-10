"use client";
import React, { use, useEffect, useState } from 'react';
import { selectForm } from '@/assets/formData';
import { useFormData } from '@/context/formData-provider';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const { formData, setFormData } = useFormData();
    const router = useRouter();
    
    useEffect(() => {
        setOptions(selectForm.map((data) => data.domain));
    }, [selectForm]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormData({domain: selectedOption, topics: []});
        console.log(formData);
        router.push('/choosetopic');
    }

    return (
        <div>
            {options.length > 0 && (
                <form onSubmit={handleSubmit}>
                {options.map((option) => (
                    <div key={option} className=''>
                        <label>
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleChange}
                            />
                            {option}
                        </label>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            )}
        </div>
    );
}
