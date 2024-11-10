"use client";
import { createContext, useContext, useState } from "react";

const defaultTheme = {
    domain: "",
    topics: []
};

const FormDataContext = createContext<{
    formData: {
        domain: string;
        topics: string[];
    };
    setFormData: (formData: { domain: string; topics: string[] }) => void;
}>({
    formData: defaultTheme,
    setFormData: () => {},
});

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [formData, setFormData] = useState<{ domain: string; topics: string[] }>(defaultTheme);

    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => useContext(FormDataContext);