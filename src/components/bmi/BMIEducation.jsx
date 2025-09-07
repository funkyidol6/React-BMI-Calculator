import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpen, AlertTriangle, Heart, Activity } from "lucide-react";

const educationCards = [
    {
        icon: BookOpen,
        title: "What is BMI?",
        content: "Body Mass Index is a measure of body fat based on height and weight that applies to adults.",
        color: "bg-blue-500"
    },
    {
        icon: Heart,
        title: "Health Range",
        content: "BMI 18.5-24.9 is considered healthy for most adults, but individual factors matter.",
        color: "bg-green-500"
    },
    {
        icon: Activity,
        title: "Limitations",
        content: "BMI doesn't account for muscle mass, bone density, or body composition differences.",
        color: "bg-purple-500"
    },
    {
        icon: AlertTriangle,
        title: "Consult Doctor",
        content: "Always consult healthcare professionals for personalized health advice.",
        color: "bg-orange-500"
    }
];

export default function BMIEducation() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
        >
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">Good to Know</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {educationCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100"
                            >
                                <div className={`w-8 h-8 ${card.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                        {card.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {card.content}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </CardContent>
            </Card>
        </motion.div>
    );
}