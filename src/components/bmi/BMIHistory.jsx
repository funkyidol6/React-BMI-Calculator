import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { History } from "lucide-react";

const categoryColors = {
    underweight: "bg-blue-100 text-blue-800",
    normal: "bg-green-100 text-green-800",
    overweight: "bg-orange-100 text-orange-800",
    obese: "bg-red-100 text-red-800"
};

export default function BMIHistory({ history }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
        >
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
                        <History className="w-5 h-5" />
                        BMI History
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                    {history.map((record, index) => (
                        <motion.div
                            key={record.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-900">{record.bmi}</span>
                                    <Badge className={categoryColors[record.category]}>
                                        {record.category}
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {format(new Date(record.created_date), "MMM d, yyyy")}
                                </p>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                                <p>{Math.round(record.height)}cm</p>
                                <p>{Math.round(record.weight)}kg</p>
                            </div>
                        </motion.div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );
}