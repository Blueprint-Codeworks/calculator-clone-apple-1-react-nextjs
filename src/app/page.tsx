"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import { TbMathFunction } from "react-icons/tb";

import { IoIosCalculator } from "react-icons/io";

interface Calculation {
  operation: string;
  result: number;
  date: string;
}

type CalculatorMode =
  | "Básica"
  | "Científica"
  | "Notas matemáticas"
  | "Convertir";

const ScientificIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    className={className}
    width="24"
    height="24"
  >
    <path d="M114.6 468.5c-4.6-1.6-8.9-5.5-11.3-10.4-1.5-3-1.9-7.2-2.3-27.1l-0.5-23.5-24-0.5c-26.7-0.6-27.7-0.8-33.4-7.7-4.4-5.3-5.4-11.8-4.9-30.9 0.3-15.9 0.4-16.2 3.3-20.9 2-3.2 4.5-5.7 7.4-7.2 4.2-2.2 5.3-2.3 27.1-2.3 17 0 23-0.3 23.8-1.2 0.6-0.8 1.2-10.6 1.4-24.4l0.3-23.1 3-4.8c2-3.2 4.5-5.6 7.5-7.2 4.4-2.3 5-2.4 25.1-2.1 20.5 0.3 20.6 0.3 24.7 3.1 2.3 1.5 5.2 4.6 6.4 7 2.2 4 2.3 5.5 2.6 27.2 0.2 13.3 0.7 23.4 1.3 24 0.6 0.6 10.9 1.2 24.8 1.5l23.8 0.5 4.1 2.8c2.3 1.5 5.2 4.6 6.4 7 2.1 3.8 2.3 5.8 2.6 21.8 0.4 19.9-0.3 24.2-5.1 29.6-5.9 6.7-8.4 7.3-33.2 7.3-15.8 0-22.4 0.3-23.3 1.2-0.9 0.9-1.2 7.2-1.2 22.3 0 11.6-0.5 22.7-1.1 24.8-1.3 4.9-6.3 10.5-11.4 12.8-3.4 1.6-6.7 1.9-22 1.8-12.7 0-19.1-0.4-21.9-1.4zm38.8-16.1c1.4-1.3 1.6-4.9 1.6-24 0-24.4 0.5-26.8 6.2-32.1 5.1-4.8 8.3-5.3 31.7-5.3 18.6 0 22.2-0.2 23.5-1.6 1.3-1.3 1.6-4.3 1.6-16.8 0-10.6-0.4-15.7-1.2-16.9-1.1-1.4-4.4-1.6-24.4-1.9l-23.1-0.3-4.8-3c-3.2-2-5.6-4.5-7.2-7.4-2.2-4.2-2.3-5.3-2.3-26.3 0-13.2-0.4-22.7-1-23.9-1-1.8-2.3-1.9-18-1.9-15.7 0-17 0.1-18 1.9-0.6 1.2-1 10.8-1 24.3 0 21.3-0.1 22.5-2.3 26.3-2.5 4.4-7.2 8-12.6 9.5-2 0.5-13.1 1-24.8 1-20 0-21.3 0.1-22.3 1.9-0.5 1.1-1 8.3-1 16.3 0 20.4-2.1 18.8 25.3 18.8 24.5 0 27.3 0.6 32.9 6.6 4.4 4.8 4.8 7.2 4.8 30.2 0 18.1 0.3 22.1 1.6 24 1.5 2.1 2.1 2.2 17.4 2.2 13.1 0 16.1-0.3 17.4-1.6z" />
    <path d="M288.5 405.1c-5.8-2.6-10.1-8-11.5-14.3-0.8-3.4-1.1-11.4-0.9-21.9 0.4-16.4 0.4-16.6 3.4-21.4 2-3.2 4.5-5.6 7.4-7.2l4.4-2.3 82.7 0 82.7 0 4.4 2.3c2.9 1.6 5.4 4 7.4 7.2 3 4.8 3 5 3.4 21.4 0.4 19.5-0.6 25.6-5.2 30.8-6.7 7.7-1.4 7.3-92.7 7.3-76.7 0-81.7-0.2-85.5-1.9zm165.9-15.7c1.3-1.3 1.6-4.2 1.6-16.5 0-8.5-0.5-15.9-1-17-1-1.9-3-1.9-81-1.9-78 0-80 0-81 1.9-0.5 1.1-1 8.5-1 17 0 12.3 0.3 15.2 1.6 16.5 1.4 1.4 10 1.6 80.4 1.6 70.4 0 79-0.2 80.4-1.6z" />
    <path d="M366 251.5c-20.5-5.7-28.6-30.8-15.4-48.1 5.5-7.2 18.2-12.2 27.3-10.9 15.6 2.3 26.2 14.4 26.2 30 0 20.1-18.7 34.3-38.1 29zm13.3-15.9c1.8-0.7 4.5-2.8 6-4.5 2.2-2.7 2.7-4.2 2.7-8.6 0-4.6-0.5-6-3-8.9-5.5-6.2-13.1-7-19.7-2-8 6-6.2 19.9 3.1 24 4 1.7 6.9 1.7 10.9 0z" />
    <path d="M83.5 227.4c-4.7-2.4-28.5-26.4-30.6-30.9-2.4-5.1-2.4-10.9 0-16 1.1-2.4 8-10.1 17-19 11.5-11.4 15.1-15.6 15.1-17.5 0-1.9-3.6-6.1-15.1-17.5-9-8.9-15.9-16.6-17-19-2.4-5.1-2.4-10.9 0-16 2.2-4.8 27.3-29.9 31.4-31.4 4-1.6 11.2-1.3 15.4 0.4 2 0.9 10.1 8 19.2 17 9.5 9.3 16.5 15.5 17.7 15.5 1.2 0 7.8-5.9 16.9-15.1 8.3-8.3 16.7-15.9 18.7-17 4.4-2.3 11.5-2.5 16.4-0.4 4.8 2 27.8 24.7 30.4 30 2.4 4.9 2.6 12.1 0.5 17.2-0.9 2-8 10.1-17 19.2-8.5 8.7-15.5 16.3-15.5 17.1 0 0.8 7 8.4 15.5 17.1 9 9.1 16.1 17.2 17 19.2 2.1 5.1 1.9 12.3-0.5 17.2-2.6 5.3-25.6 28-30.4 30-4.9 2.1-12 1.9-16.4-0.4-2-1.1-10.4-8.7-18.7-17-9.1-9.2-15.7-15.1-16.9-15.1-1.2 0-8.2 6.2-17.7 15.5-9.1 9-17.2 16.1-19.2 17-4.7 1.9-12.4 1.9-16.2-0.1zm25-29.5c8.3-8.3 16.7-15.9 18.7-17 2.3-1.1 5.7-1.9 8.8-1.9 3.1 0 6.5 0.8 8.8 1.9 2 1.1 10.4 8.7 18.7 17 9.3 9.4 15.7 15.1 17 15.1 2.7 0 24.5-21.8 24.5-24.5 0-1.3-5.5-7.5-15.1-17-8.3-8.3-15.9-16.7-17-18.7-2.5-4.9-2.5-12.7 0-17.6 1.1-2 8.7-10.4 17-18.7 9.4-9.3 15.1-15.7 15.1-17 0-2.7-21.8-24.5-24.5-24.5-1.3 0-7.5 5.5-17 15.1-8.3 8.3-16.7 15.9-18.7 17-2.3 1.1-5.7 1.9-8.8 1.9-3.1 0-6.5-0.8-8.8-1.9-2-1.1-10.4-8.7-18.7-17-9.3-9.4-15.7-15.1-17-15.1-2.6 0-24.5 21.8-24.5 24.4 0 1.3 6.1 8.2 15.9 18.1 8.8 8.8 16.4 17.3 17 18.8 1.4 3.6 1.4 11.8 0 15.4-0.6 1.5-8.2 10-17 18.8-9.6 9.7-15.9 16.8-15.9 18 0 2.7 21.8 24.5 24.5 24.5 1.3 0 7.5-5.5 17-15.1z" />
    <path d="M288.5 179.1c-4.6-2.1-10.1-7.9-11.2-11.9-0.5-1.5-0.8-11.2-0.8-21.7 0-18.3 0.1-19.2 2.4-23.2 1.4-2.4 4.2-5.5 6.4-7l4-2.8 82.6-0.3c54.3-0.2 83.8 0.1 86.1 0.7 4 1.2 9.3 5.9 11.8 10.5 2.1 4 3 33.4 1.2 41.4-1.4 6.3-5.7 11.7-11.5 14.3-3.8 1.7-8.8 1.9-85.5 1.9-76.7 0-81.7-0.2-85.5-1.9zm166.5-16c0.5-1.1 1-8.4 1-16.6 0-8.2-0.5-15.5-1-16.6-1-1.9-3-1.9-81-1.9-78 0-80 0-81 1.9-0.5 1.1-1 8.5-1 17 0 12.3 0.3 15.2 1.6 16.5 1.4 1.4 10.1 1.6 80.9 1.6 77.5 0 79.5 0 80.5-1.9z" />
    <path d="M361.3 98c-6.7-3.3-11-7.6-14.5-14.3-3.2-6-3.2-18.2 0-25.2 10.1-22 41.8-23.5 53.5-2.6 2.6 4.5 3.1 6.8 3.5 13.7 0.4 7.2 0.1 8.9-2  13.5-5.1 11-14.4 17.1-26.8 17.7-6.8 0.3-8.1 0-13.7-2.8zm19.8-14.5c6.5-3.4 9-13.5 4.9-20.2-5.6-9.2-19.4-8.1-24.6 1.9-5.9 11.4 8 24.3 19.7 18.3z" />
  </svg>
);

export default function Calculator() {
  const [display, setDisplay] = useState<string>("0");
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState<boolean>(false);
  const [history, setHistory] = useState<Calculation[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showModeMenu, setShowModeMenu] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<CalculatorMode>("Básica");
  const historyMenuRef = useRef<HTMLDivElement>(null);
  const modeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("calculatorHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error parsing saved history:", error);
        setHistory([]);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        historyMenuRef.current &&
        !historyMenuRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
        setEditMode(false);
        setSelectedItems([]);
      }
      if (
        modeMenuRef.current &&
        !modeMenuRef.current.contains(event.target as Node)
      ) {
        setShowModeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const saveHistory = (calculation: Omit<Calculation, "date">) => {
    const now = new Date();
    const newCalculation: Calculation = {
      ...calculation,
      date: now.toISOString(),
    };
    const newHistory = [newCalculation, ...history.slice(0, 29)];
    setHistory(newHistory);
    localStorage.setItem("calculatorHistory", JSON.stringify(newHistory));
  };

  const handleNumberClick = (number: string) => {
    if (display === "0" || resetDisplay) {
      setDisplay(number);
      setCurrentOperation((prev) => prev + number);
      setResetDisplay(false);
    } else {
      setDisplay((prev) => prev + number);
      setCurrentOperation((prev) => prev + number);
    }
  };

  const handleOperationClick = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
      setCurrentOperation(display + " " + op + " ");
    } else if (operation) {
      const result = performOperation();
      setPreviousValue(result);
      setCurrentOperation(result + " " + op + " ");
      setDisplay(result.toString());
    }
    setOperation(op);
    setResetDisplay(true);
  };

  const performOperation = (): number => {
    const current = parseFloat(display);
    let result: number;
    switch (operation) {
      case "+":
        result = (previousValue || 0) + current;
        break;
      case "−":
        result = (previousValue || 0) - current;
        break;
      case "×":
        result = (previousValue || 0) * current;
        break;
      case "÷":
        result = (previousValue || 0) / current;
        break;
      case "^":
        result = Math.pow(previousValue || 0, current);
        break;
      default:
        result = current;
    }
    const calculation = {
      operation: currentOperation + " = " + result,
      result: result,
    };
    saveHistory(calculation);
    return result;
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = performOperation();
      setDisplay(result.toString());
      setCurrentOperation(currentOperation + " = " + result);
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setCurrentOperation("");
    setPreviousValue(null);
    setOperation(null);
  };

  const handlePlusMinus = () => {
    const newValue = (parseFloat(display) * -1).toString();
    setDisplay(newValue);
    setCurrentOperation((prev) => {
      const parts = prev.split(" ");
      parts[parts.length - 1] = newValue;
      return parts.join(" ");
    });
  };

  const handlePercent = () => {
    const newValue = (parseFloat(display) / 100).toString();
    setDisplay(newValue);
    setCurrentOperation((prev) => {
      const parts = prev.split(" ");
      parts[parts.length - 1] = newValue;
      return parts.join(" ");
    });
  };

  const handleComma = () => {
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
      setCurrentOperation((prev) => prev + ".");
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setEditMode(false);
    setSelectedItems([]);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedItems([]);
  };

  const toggleSelectItem = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const deleteSelectedItems = () => {
    const newHistory = history.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setHistory(newHistory);
    localStorage.setItem("calculatorHistory", JSON.stringify(newHistory));
    setSelectedItems([]);
  };

  const deleteAllHistory = () => {
    setHistory([]);
    localStorage.removeItem("calculatorHistory");
    setSelectedItems([]);
  };

  const formatNumber = (number: number | null | undefined): string => {
    if (number == null) {
        return ""; // O un valor predeterminado, como "0" o "N/A"
    }
    return number.toLocaleString("es-ES", { maximumFractionDigits: 6 });
};

  const loadHistoryItem = (item: Calculation) => {
    const [operation, result] = item.operation.split("=");
    setCurrentOperation(operation.trim());
    setDisplay(result.trim());
    setShowHistory(false);
  };

  const HistoryIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="4" cy="4" r="2" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="4" cy="20" r="2" />
      <line
        x1="8"
        y1="4"
        x2="20"
        y2="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="20"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const groupHistoryByDate = (history: Calculation[]) => {
    const grouped: { [key: string]: Calculation[] } = {};
    const today = new Date().toDateString();

    history.forEach((item) => {
      const date = new Date(item.date);
      const dateString = date.toDateString();
      const key = dateString === today ? "Hoy" : dateString;

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
    });

    return grouped;
  };

  const groupedHistory = groupHistoryByDate(history);

  const toggleModeMenu = () => {
    setShowModeMenu(!showModeMenu);
  };

  const handleModeChange = (mode: CalculatorMode) => {
    setCurrentMode(mode);
    setShowModeMenu(false);
  };

  const renderBasicCalculator = () => (
    <div className="grid grid-cols-4 gap-2">
      <button
        onClick={handleClear}
        className="col-span-1 bg-gray-300 text-black text-xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        AC
      </button>
      <button
        onClick={handlePlusMinus}
        className="col-span-1 bg-gray-300 text-black text-xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        +/-
      </button>
      <button
        onClick={handlePercent}
        className="col-span-1 bg-gray-300 text-black text-xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        %
      </button>
      <button
        onClick={() => handleOperationClick("÷")}
        className="col-span-1 bg-orange-500 text-white text-3xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        ÷
      </button>
      {[7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => handleNumberClick(num.toString())}
          className="col-span-1 bg-gray-700 text-white text-2xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => handleOperationClick("×")}
        className="col-span-1 bg-orange-500 text-white text-3xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        ×
      </button>
      {[4, 5, 6].map((num) => (
        <button
          key={num}
          onClick={() => handleNumberClick(num.toString())}
          className="col-span-1 bg-gray-700 text-white text-2xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => handleOperationClick("−")}
        className="col-span-1 bg-orange-500 text-white text-3xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        −
      </button>
      {[1, 2, 3].map((num) => (
        <button
          key={num}
          onClick={() => handleNumberClick(num.toString())}
          className="col-span-1 bg-gray-700 text-white text-2xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => handleOperationClick("+")}
        className="col-span-1 bg-orange-500 text-white text-3xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        +
      </button>
      <button
        onClick={toggleModeMenu}
        className="col-span-1 bg-gray-700 text-white text-2xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        <IoIosCalculator size={24} />
      </button>
      <button
        onClick={() => handleNumberClick("0")}
        className="col-span-1 bg-gray-700 text-white text-2xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        0
      </button>
      <button
        onClick={handleComma}
        className="col-span-1 bg-gray-700 text-white text-2xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        .
      </button>
      <button
        onClick={handleEquals}
        className="col-span-1 bg-orange-500 text-white text-3xl font-medium rounded-full p-4 flex items-center justify-center h-16 w-16"
      >
        =
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#171717] p-4">
      <h1 className="text-4xl font-bold text-white mb-2">
        iPhone Calculator #1
      </h1>
      <h2 className="text-xl text-gray-400 mb-8">
        La calculadora que siempre llevas contigo
      </h2>

      <div className="relative w-full max-w-xs">
        <button
          onClick={toggleHistory}
          className="absolute top-4 left-4 text-orange-500 text-2xl"
          aria-label="Toggle history"
        >
          <HistoryIcon />
        </button>
        <AnimatePresence>
          {showHistory && (
            <motion.div
              ref={historyMenuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed left-0 top-0 w-full sm:w-1/2 h-full bg-[#1a1a1a] p-4 flex flex-col z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <button onClick={toggleHistory} className="text-orange-500">
                  <HistoryIcon />
                </button>
                <button
                  onClick={toggleEditMode}
                  className="text-orange-500 text-lg"
                >
                  {editMode ? "Listo" : "Editar"}
                </button>
              </div>
              <div className="mt-6 flex-grow overflow-hidden">
                <h2 className="text-gray-500 text-sm mb-2">Últimos 30 días</h2>
                <hr className="border-gray-700 mb-4" />
                <div className="text-white overflow-y-auto h-[calc(100vh-200px)] pr-2 custom-scrollbar">
                  {Object.entries(groupedHistory).map(([date, items]) => (
                    <div key={date} className="mb-6">
                      <h3 className="text-gray-400 text-sm mb-2">{date}</h3>
                      <ul>
                        {items.map((item, index) => (
                          <li key={index}>
                            <div
                              className={`mb-4 p-2 rounded-lg flex items-center ${
                                editMode && selectedItems.includes(index)
                                  ? "bg-[#3a3a3a]"
                                  : ""
                              }`}
                              onClick={() => !editMode && loadHistoryItem(item)}
                            >
                              {editMode && (
                                <button
                                  onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    toggleSelectItem(index);
                                  }}
                                  className={`mr-2 w-6 h-6 rounded-full border ${
                                    selectedItems.includes(index)
                                      ? "bg-orange-500 border-orange-500"
                                      : "border-gray-500"
                                  } flex items-center justify-center`}
                                >
                                  {selectedItems.includes(index) && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-white"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </button>
                              )}
                              <div>
                                <div className="text-gray-500">
                                  {item.operation}
                                </div>
                                <div className="text-2xl">
                                  {formatNumber(item.result)}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              {editMode && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={deleteSelectedItems}
                    className="text-orange-500 px-4 py-2 rounded-lg"
                    disabled={selectedItems.length === 0}
                  >
                    Eliminar ({selectedItems.length})
                  </button>
                  <button
                    onClick={deleteAllHistory}
                    className="text-orange-500 px-4 py-2 rounded-lg"
                    disabled={history.length === 0}
                  >
                    Borrar todo
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full bg-black rounded-3xl overflow-hidden shadow-lg">
          <div className="p-4">
            <div className="text-right text-white mb-4 h-24 flex flex-col justify-end overflow-hidden">
              <div className="text-2xl text-gray-500 mb-1">
                {currentOperation}
              </div>
              <div className="text-5xl font-light leading-tight">
                {display.replace(".", ",")}
              </div>
            </div>
            {currentMode === "Básica" ? renderBasicCalculator() : <></>}
          </div>
        </div>
        <AnimatePresence>
          {showModeMenu && (
            <motion.div
              ref={modeMenuRef}
              initial={{ x: "-100%", y: "100%" }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "-100%", y: "100%" }}
              transition={{ type: "tween" }}
              className="absolute left-4 bottom-4 bg-[#1a1a1a] rounded-lg p-4 z-20"
            >
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleModeChange("Básica")}
                  className={`text-left flex items-center group ${
                    currentMode === "Básica"
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  <ScientificIcon
                    className={`w-6 h-6 mr-2 ${
                      currentMode === "Básica"
                        ? "text-orange-500"
                        : "text-white group-hover:text-orange-500"
                    }`}
                  />

                  <span className="group-hover:text-orange-500">Básica</span>
                </button>
                <button
                  onClick={() => handleModeChange("Básica")}
                  className={`text-left flex items-center group ${
                    currentMode === "Científica"
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  <TbMathFunction
                    className={`w-6 h-6 mr-2 ${
                      currentMode === "Científica"
                        ? "text-orange-500"
                        : "text-white group-hover:text-orange-500"
                    }`}
                  />

                  <span className="group-hover:text-orange-500">
                    Científica
                  </span>
                </button>
                <button
                  onClick={() => handleModeChange("Básica")}
                  className="text-left text-white group"
                >
                  <span className="text-white mr-2 group-hover:text-orange-500">
                    √
                  </span>
                  <span className="group-hover:text-orange-500">
                    Notas matemáticas
                  </span>
                </button>
                <div className="border-t border-black my-2"></div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-6 bg-gray-700 rounded-full p-1 flex items-center">
                    <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out"></div>
                  </div>
                  <button
                    onClick={() => handleModeChange("Convertir")}
                    className="text-left text-white hover:text-orange-500"
                  >
                    Convertir
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Blueprint Codeworks
        </h3>
        <p className="text-gray-400 mb-4">
          Síguenos en nuestras redes sociales
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="text-white hover:text-orange-500 transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="#"
            className="text-white hover:text-orange-500 transition-colors"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            className="text-white hover:text-orange-500 transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="#"
            className="text-white hover:text-orange-500 transition-colors"
          >
            <FaTiktok size={24} />
          </a>
          <a
            href="#"
            className="text-white hover:text-orange-500 transition-colors"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="#"
            className="text-white hover:text-orange-500 transition-colors"
          >
            <FaFacebook size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
