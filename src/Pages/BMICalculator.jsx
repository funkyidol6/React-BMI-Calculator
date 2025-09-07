import React, { useState, useEffect } from "react";
import { BMIRecord } from "../entities/BMIRecord";
import { User } from "../entities/User";
import { motion } from "framer-motion";

import BMIForm from "../components/bmi/BMIForm";
import BMIResults from "../components/bmi/BMIResults";
import BMIScale from "../components/bmi/BMIScale";
import BMIHistory from "../components/bmi/BMIHistory";
import BMIEducation from "../components/bmi/BMIEducation";

export default function BMICalculator() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [unitSystem, setUnitSystem] = useState("metric");
    const [bmi, setBMI] = useState(null);
    const [category, setCategory] = useState("");
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
        loadHistory();
    }, []);

    const loadUser = async () => {
        try {
            const userData = await User.me();
            setUser(userData);
        } catch (error) {
            // User not logged in, that's fine
        }
    };

    const loadHistory = async () => {
        try {
            const records = await BMIRecord.list("-created_date", 10);
            setHistory(records);
        } catch (error) {
            console.error("Error loading history:", error);
        }
    };

    const calculateBMI = (heightValue, weightValue, units) => {
        if (!heightValue || !weightValue) {
            setBMI(null);
            setCategory("");
            return;
        }

        let heightInM, weightInKg;

        if (units === "metric") {
            heightInM = heightValue / 100;
            weightInKg = weightValue;
        } else {
            // Convert feet and inches to meters, pounds to kg
            const feet = Math.floor(heightValue);
            const inches = (heightValue - feet) * 12;
            heightInM = ((feet * 12) + inches) * 0.0254;
            weightInKg = weightValue * 0.453592;
        }

        const bmiValue = weightInKg / (heightInM * heightInM);
        const roundedBMI = Math.round(bmiValue * 10) / 10;

        setBMI(roundedBMI);

        // Determine category
        let cat;
        if (roundedBMI < 18.5) cat = "underweight";
        else if (roundedBMI < 25) cat = "normal";
        else if (roundedBMI < 30) cat = "overweight";
        else cat = "obese";

        setCategory(cat);
    };

    const saveBMIRecord = async () => {
        if (!bmi || !user) return;

        try {
            const record = {
                height: unitSystem === "metric" ? parseFloat(height) : parseFloat(height) * 30.48,
                weight: unitSystem === "metric" ? parseFloat(weight) : parseFloat(weight) * 0.453592,
                bmi: bmi,
                category: category,
                unit_system: unitSystem
            };

            await BMIRecord.create(record);
            loadHistory();
        } catch (error) {
            console.error("Error saving BMI record:", error);
        }
    };

    useEffect(() => {
        calculateBMI(parseFloat(height), parseFloat(weight), unitSystem);
    }, [height, weight, unitSystem]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        BMI Calculator
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Calculate your Body Mass Index and understand your health status with our comprehensive BMI tool
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column - Calculator */}
                    <div className="lg:col-span-5 space-y-6">
                        <BMIForm
                            height={height}
                            weight={weight}
                            unitSystem={unitSystem}
                            setHeight={setHeight}
                            setWeight={setWeight}
                            setUnitSystem={setUnitSystem}
                            onSave={saveBMIRecord}
                            canSave={!!bmi && !!user}
                        />

                        {bmi && (
                            <BMIResults 
                                bmi={bmi} 
                                category={category}
                                height={height}
                                weight={weight}
                                unitSystem={unitSystem}
                            />
                        )}
                    </div>

                    {/* Middle Column - Scale */}
                    <div className="lg:col-span-4">
                        <BMIScale currentBMI={bmi} category={category} />
                    </div>

                    {/* Right Column - History & Education */}
                    <div className="lg:col-span-3 space-y-6">
                        {user && history.length > 0 && (
                            <BMIHistory history={history} />
                        )}
                        <BMIEducation />
                    </div>
                </div>
            </div>
        </div>
    );
}