import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Calculator, Save } from "lucide-react";

export default function BMIForm({ 
    height, 
    weight, 
    unitSystem, 
    setHeight, 
    setWeight, 
    setUnitSystem,
    onSave,
    canSave
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0">
                <CardHeader className="text-center pb-6">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                        <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Calculate Your BMI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Unit System Toggle */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700">Unit System</Label>
                        <Tabs value={unitSystem} onValueChange={setUnitSystem} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-lg p-1">
                            <TabsTrigger 
                            value="metric" 
                            className="text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-colors"
                            >
                            Metric (kg, cm)
                            </TabsTrigger>
                            <TabsTrigger 
                            value="imperial" 
                            className="text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-colors"
                            >
                            Imperial (lbs, ft)
                            </TabsTrigger>
                        </TabsList>
                        </Tabs>
                    </div>

                    {/* Height Input */}
                    <div className="space-y-3">
                        <Label htmlFor="height" className="text-sm font-semibold text-gray-700">
                            Height {unitSystem === "metric" ? "(cm)" : "(feet.inches)"}
                        </Label>
                        <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder={unitSystem === "metric" ? "e.g., 175" : "e.g., 5.8"}
                            step={unitSystem === "metric" ? "1" : "0.1"}
                            className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-400 transition-colors text-black"
                        />
                        <p className="text-xs text-gray-500">
                            {unitSystem === "metric" 
                                ? "Enter your height in centimeters" 
                                : "Enter as feet.inches (e.g., 5.8 for 5'8\")"
                            }
                        </p>
                    </div>

                    {/* Weight Input */}
                    <div className="space-y-3">
                        <Label htmlFor="weight" className="text-sm font-semibold text-gray-700">
                            Weight {unitSystem === "metric" ? "(kg)" : "(lbs)"}
                        </Label>
                        <Input
                            id="weight"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder={unitSystem === "metric" ? "e.g., 70" : "e.g., 154"}
                            step="0.1"
                            className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-400 transition-colors text-black"
                        />
                    </div>

                    {/* Save Button */}
                    {canSave && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-4"
                        >
                            <Button
                                onClick={onSave}
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 h-auto"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save to History
                            </Button>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}