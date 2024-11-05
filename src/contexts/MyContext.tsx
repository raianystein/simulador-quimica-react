// MyContext.tsx
import { createContext, useState, ReactNode, FC, useContext } from 'react';
import React from 'react';

// Define a interface para o contexto
interface ContextProps {
    finalPression: string;
    finalTemperature: string;
    finalVolume: string;
    initialPression: string;
    initialTemperature: string;
    initialVolume: string;
    processType: string;
    setFinalPression: (value: string) => void;
    setFinalTemperature: (value: string) => void;
    setFinalVolume: (value: string) => void;
    setInitialPression: (value: string) => void;
    setInitialTemperature: (value: string) => void;
    setInitialVolume: (value: string) => void;
    setProcessType: (value: string) => void;
    Q: string;
    W: string;
    U: string;
    setQ: (value: string) => void;
    setW: (value: string) => void;
    setU: (value: string) => void;
}

// Cria o contexto com valores iniciais
const MyContext = createContext<ContextProps>({
    finalPression: "",
    finalTemperature: "",
    finalVolume: "",
    initialPression: "",
    initialTemperature: "",
    initialVolume: "",
    processType: "",
    Q:"0",
    W:"0",
    U:"0",
    setFinalPression: () => {},
    setFinalTemperature: () => {},
    setFinalVolume: () => {},
    setInitialPression: () => {},
    setInitialTemperature: () => {},
    setInitialVolume: () => {},
    setProcessType: () => {},
    setQ: () => {},
    setW: () => {},
    setU: () => {},
});

interface Props {
    children: ReactNode;
}

// Criar um provedor de contexto
export const MyProvider: FC<Props> = ({ children }) => {
    const [finalPression, setFinalPression] = useState("");
    const [finalTemperature, setFinalTemperature] = useState("");
    const [finalVolume, setFinalVolume] = useState("");
    const [initialPression, setInitialPression] = useState("");
    const [initialTemperature, setInitialTemperature] = useState("");
    const [initialVolume, setInitialVolume] = useState("");
    const [processType, setProcessType] = useState("");
    const [Q, setQ] = useState("0");
    const [W, setW] = useState("0");
    const [U, setU] = useState("0");

    return (
        <MyContext.Provider 
            value={{
                finalPression, setFinalPression,
                finalTemperature, setFinalTemperature,
                finalVolume, setFinalVolume,
                initialPression, setInitialPression,
                initialTemperature, setInitialTemperature,
                initialVolume, setInitialVolume,
                processType, setProcessType,
                Q, setQ,
                W, setW,
                U, setU
            }}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);
export default MyContext;