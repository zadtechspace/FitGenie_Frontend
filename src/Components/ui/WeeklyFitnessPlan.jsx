"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"


const exerciseData = [
    { day: "Monday", exercise: "Chest & Triceps", duration: "60 min", intensity: "High", calories: "450" },
    { day: "Tuesday", exercise: "Back & Biceps", duration: "55 min", intensity: "High", calories: "420" },
    { day: "Wednesday", exercise: "Cardio & Core", duration: "45 min", intensity: "Medium", calories: "380" },
    { day: "Thursday", exercise: "Legs & Glutes", duration: "65 min", intensity: "High", calories: "500" },
    { day: "Friday", exercise: "Full Body", duration: "50 min", intensity: "Medium", calories: "400" },
    { day: "Saturday", exercise: "HIIT Training", duration: "30 min", intensity: "Very High", calories: "350" },
    { day: "Sunday", exercise: "Rest Day", duration: "—", intensity: "Rest", calories: "0" },
]

const nutritionData = [
    { day: "Monday", meal: "Breakfast", calories: "450", protein: "35g", carbs: "60g", fat: "12g" },
    { day: "Tuesday", meal: "Lunch", calories: "650", protein: "45g", carbs: "80g", fat: "18g" },
    { day: "Wednesday", meal: "Dinner", calories: "550", protein: "40g", carbs: "70g", fat: "15g" },
    { day: "Thursday", meal: "Snack", calories: "200", protein: "15g", carbs: "25g", fat: "5g" },
    { day: "Friday", meal: "Breakfast", calories: "480", protein: "38g", carbs: "65g", fat: "13g" },
    { day: "Saturday", meal: "Lunch", calories: "680", protein: "48g", carbs: "85g", fat: "19g" },
    { day: "Sunday", meal: "Dinner", calories: "580", protein: "42g", carbs: "75g", fat: "16g" },
]

export function WeeklyFitnessPlan() {
    const [activeTab, setActiveTab] = useState("exercise")
    const [fitnessPlan, setFitnessPlan] = useState()
    const [generatingPlan, setGeneratingPlan] = useState(false)
    const [fetchingPlan, setFetchingPlan] = useState(true)
    const baseUrl = import.meta.env.VITE_BASE_URL
    //   fetch 

    console.log(fitnessPlan?.weeklyPlan[0].workout)

    useEffect(() => {
        handleFetchCurrentPlan()
    }, [])
    const handleFetchCurrentPlan = async () => {
        setFetchingPlan(true)
        try {
            const res = await fetch(`${baseUrl}/api/fit-plan/latest`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                }
            })
            const data = await res.json()
            setFitnessPlan(data.plan)
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setFetchingPlan(false)
        }
    }

    // handle create plan
    const handleCreatePlan = async () => {
        setGeneratingPlan(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/fit-plan/create`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (!data.success) {
                throw new Error(data.message)
            } else {
                toast.success("Plan generated successfully.")
            }
            console.log(data)
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Unable to generate plan. try again")
        } finally {
            setGeneratingPlan(false)
        }
    }

    if (fetchingPlan) {
        return (
            <div>
                <p>Loading fitness plan...</p>
            </div>
        )
    }

    return (
        <div>
            {
                fitnessPlan ? (

                    <div className="mt-8 rounded-lg border border-border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="mb-4 text-xl font-semibold text-foreground">Weekly Fitness Plan</h2>
                            <div className="flex gap-2 border-b border-border">
                                <button
                                    onClick={() => setActiveTab("exercise")}
                                    className={`px-4 py-2 font-medium transition-colors ${activeTab === "exercise"
                                        ? "border-b-2 border-accent text-accent"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    Exercise
                                </button>
                                <button
                                    onClick={() => setActiveTab("nutrition")}
                                    className={`px-4 py-2 font-medium transition-colors ${activeTab === "nutrition"
                                        ? "border-b-2 border-accent text-accent"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    Nutrition
                                </button>
                            </div>
                        </div>


                        {activeTab === "exercise" && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Day</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Exercise</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Duration</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Intensity</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Calories</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exerciseData.map((row, idx) => (
                                            <tr key={idx} className="border-b border-border hover:bg-secondary/20 transition-colors">
                                                <td className="px-4 py-3 text-sm font-medium text-foreground">{row.day}</td>
                                                <td className="px-4 py-3 text-sm text-foreground">{row.exercise}</td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">{row.duration}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span
                                                        className={`rounded px-2 py-1 text-xs font-medium ${row.intensity === "Rest"
                                                            ? "bg-secondary/30 text-muted-foreground"
                                                            : row.intensity === "Very High"
                                                                ? "bg-destructive/20 text-destructive"
                                                                : row.intensity === "High"
                                                                    ? "bg-accent/20 text-accent"
                                                                    : "bg-primary/20 text-primary"
                                                            }`}
                                                    >
                                                        {row.intensity}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-foreground">{row.calories} cal</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === "nutrition" && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Day</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Meal</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Calories</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Protein</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Carbs</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Fat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nutritionData.map((row, idx) => (
                                            <tr key={idx} className="border-b border-border hover:bg-secondary/20 transition-colors">
                                                <td className="px-4 py-3 text-sm font-medium text-foreground">{row.day}</td>
                                                <td className="px-4 py-3 text-sm text-foreground">{row.meal}</td>
                                                <td className="px-4 py-3 text-sm font-medium text-accent">{row.calories}</td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">{row.protein}</td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">{row.carbs}</td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">{row.fat}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                        }
                    </div>
                ) : (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem"
                    }}>
                        <h2>No fitness plans yet</h2>
                        <p>Start by creating a personalized fitness and diet plan tailored to your specific goals and needs</p>
                        <Link
                            to="/private/generate-plan"
                            style={{
                                background: "black",
                                padding: ".5rem 1rem",
                                borderRadius: "8px",
                                color: "white",
                                textAlign: "center"
                            }}> Create Your First Plan </Link>
                    </div>
                )}
        </div>
    )
}
