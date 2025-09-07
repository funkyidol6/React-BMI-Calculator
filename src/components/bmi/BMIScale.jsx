import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const bmiRanges = [
    { min: 0, max: 18.5, label: "Underweight", color: "bg-blue-500", lightColor: "bg-blue-100" },
    { min: 18.5, max: 25, label: "Normal", color: "bg-green-500", lightColor: "bg-green-100" },
    { min: 25, max: 30, label: "Overweight", color: "bg-orange-500", lightColor: "bg-orange-100" },
    { min: 30, max: 40, label: "Obese", color: "bg-red-500", lightColor: "bg-red-100" }
];

export default function BMIScale({ currentBMI, category }) {
    const getBMIPosition = (bmi) => {
        if (bmi < 18.5) return (bmi / 18.5) * 25;
        if (bmi < 25) return 25 + ((bmi - 18.5) / 6.5) * 25;
        if (bmi < 30) return 50 + ((bmi - 25) / 5) * 25;
        return 75 + Math.min(((bmi - 30) / 10) * 25, 25);
    };

    return (
        <div className="lg:col-span-4 h-screen overflow-y-auto lg:sticky px-0">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="sticky top-0"
        >
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold text-gray-900">BMI Scale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Visual Scale */}
                    <div className="relative">
                        <div className="flex h-8 rounded-full overflow-hidden">
                            {bmiRanges.map((range, index) => (
                                <div
                                    key={index}
                                    className={`${range.color} flex-1`}
                                />
                            ))}
                        </div>
                        
                        {/* BMI Indicator */}
                        {currentBMI && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="absolute -top-2 w-4 h-12 bg-gray-900 rounded-sm shadow-lg"
                                style={{ 
                                    left: `calc(${getBMIPosition(currentBMI)}% - 8px)`,
                                    transform: "translateX(0)"
                                }}
                            >
                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                            </motion.div>
                        )}
                    </div>

                    {/* Scale Labels */}
                    <div className="space-y-3">
                        {bmiRanges.map((range, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                    category === range.label.toLowerCase().replace(' ', '_') 
                                        ? range.lightColor + " border-2 " + range.color.replace('bg-', 'border-')
                                        : "bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-4 h-4 ${range.color} rounded-full`}></div>
                                    <span className="font-semibold text-gray-900">{range.label}</span>
                                </div>
                                <span className="text-sm text-gray-600">
                                    {range.min} - {range.max === 40 ? "40+" : range.max}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Current BMI Display */}
                    {currentBMI && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-center pt-4 border-t border-gray-200"
                        >
                            <p className="text-sm text-gray-500">Your BMI</p>
                            <p className="text-2xl font-bold text-gray-900">{currentBMI}</p>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
        </div>
    );
}