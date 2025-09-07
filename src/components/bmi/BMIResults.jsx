import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const categoryConfig = {
    underweight: {
        label: "Underweight",
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
        icon: TrendingDown,
        description: "Below normal weight range"
    },
    normal: {
        label: "Normal Weight",
        color: "bg-green-500",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        borderColor: "border-green-200",
        icon: Minus,
        description: "Healthy weight range"
    },
    overweight: {
        label: "Overweight",
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700",
        borderColor: "border-orange-200",
        icon: TrendingUp,
        description: "Above normal weight range"
    },
    obese: {
        label: "Obese",
        color: "bg-red-500",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        icon: TrendingUp,
        description: "Significantly above normal weight"
    }
};

export default function BMIResults({ bmi, category, height, weight, unitSystem }) {
    const config = categoryConfig[category];
    const Icon = config?.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
        >
            <Card className={`${config?.bgColor} ${config?.borderColor} border-2 shadow-lg`}>
                <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-12 h-12 ${config?.color} rounded-full flex items-center justify-center mb-4`}>
                        {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                        {bmi}
                    </CardTitle>
                    <Badge className={`${config?.color} text-white text-sm px-3 py-1`}>
                        {config?.label}
                    </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className={`${config?.textColor} font-medium`}>
                        {config?.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div>
                            <p className="text-sm text-gray-500">Height</p>
                            <p className="font-semibold text-gray-900">
                                {unitSystem === "metric" 
                                    ? `${height} cm`
                                    : `${Math.floor(height)}' ${Math.round((height % 1) * 12)}"`
                                }
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Weight</p>
                            <p className="font-semibold text-gray-900">
                                {weight} {unitSystem === "metric" ? "kg" : "lbs"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}