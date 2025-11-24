"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

const PRICING = {
    monthly: 10000,
    quarterly: 28000,
    yearly: 99999,
}

const FREE_FEATURES = [
    "Basic fitness tracking",
    "Weekly meal plans",
    "Limited workouts library",
    "Community access",
    "Mobile app access",
]

const PRO_FEATURES = [
    "Advanced fitness analytics",
    "Personalized meal plans",
    "Full workouts library (500+)",
    "Priority community support",
    "AI-powered recommendations",
    "Export & share plans",
    "Ad-free experience",
    "Weekly coaching tips",
]

export default function SubscriptionPage() {
    const [billingPeriod, setBillingPeriod] = useState("monthly") // <"monthly" | "quarterly" | "yearly">
    const [selectedPlan, setSelectedPlan] = useState("free") // <"free" | "pro">
    const [activating, setActivating] = useState(false)
    const baseUrl = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()



    const initiateSubscription = async () => {
        setActivating(true)
        try {
            const res = await fetch(`${baseUrl}/api/subscription/initialize`, {
                method: "POST",
                body: JSON.stringify({ plan: billingPeriod }),
                headers: {
                    authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            navigate(data.data.authorization_url)
            // console.log(data.data.authorization_url)
        } catch (error) {
            console.log(error)
        } finally {
            setActivating(false)
        }
    }
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0a0f2c 0%, #1a1f4d 100%)",
                padding: "40px 20px",
                fontFamily: "Geist, sans-serif",
            }}
        >
            {/* Header */}
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "60px",
                    maxWidth: "800px",
                    margin: "0 auto 60px",
                }}
            >
                <h1
                    style={{
                        fontSize: "42px",
                        fontWeight: "700",
                        color: "#f5f5f5",
                        marginBottom: "12px",
                    }}
                >
                    Choose Your Plan
                </h1>
                <p
                    style={{
                        fontSize: "18px",
                        color: "#a0a0a0",
                        marginBottom: "30px",
                    }}
                >
                    Upgrade to Pro for unlimited access to personalized fitness and nutrition plans
                </p>
            </div>

            {/* Billing Period Selector */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "16px",
                    marginBottom: "50px",
                    flexWrap: "wrap",
                }}
            >
                {(["monthly", "quarterly", "yearly"]).map((period) => (
                    <button
                        key={period}
                        onClick={() => setBillingPeriod(period)}
                        style={{
                            padding: "12px 24px",
                            fontSize: "14px",
                            fontWeight: "600",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            background: billingPeriod === period ? "rgb(177, 129, 255)" : "rgba(255, 255, 255, 0.1)",
                            color: billingPeriod === period ? "#0a0f2c" : "#a0a0a0",
                            textTransform: "capitalize",
                        }}
                    >
                        {period}
                    </button>
                ))}
            </div>

            {/* Plans Container */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                    gap: "32px",
                    maxWidth: "1000px",
                    margin: "0 auto",
                }}
            >
                {/* Free Plan */}
                <div
                    onClick={() => setSelectedPlan("free")}
                    style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: selectedPlan === "free" ? "2px solid rgb(177, 129, 255)" : "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "16px",
                        padding: "40px 30px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: selectedPlan === "free" ? "scale(1.02)" : "scale(1)",
                        position: "relative",
                    }}
                >
                    <div style={{ marginBottom: "24px" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                color: "#f5f5f5",
                                marginBottom: "8px",
                            }}
                        >
                            Free
                        </h2>
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#a0a0a0",
                            }}
                        >
                            Perfect for beginners
                        </p>
                    </div>

                    <div
                        style={{
                            marginBottom: "32px",
                            paddingBottom: "32px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        <div style={{ marginBottom: "8px" }}>
                            <span
                                style={{
                                    fontSize: "14px",
                                    color: "#a0a0a0",
                                }}
                            >
                                Price
                            </span>
                        </div>
                        <div
                            style={{
                                fontSize: "36px",
                                fontWeight: "700",
                                color: "#f5f5f5",
                            }}
                        >
                            Free
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedPlan("free")
                        }}
                        style={{
                            width: "100%",
                            padding: "12px 24px",
                            background: "rgba(255, 255, 255, 0.1)",
                            color: "#f5f5f5",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            marginBottom: "32px",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                        }}
                    >
                        Current Plan
                    </button>

                    <div>
                        <p
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#a0a0a0",
                                marginBottom: "16px",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                            }}
                        >
                            What's Included
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {FREE_FEATURES.map((feature) => (
                                <li
                                    key={feature}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginBottom: "12px",
                                        fontSize: "14px",
                                        color: "#d0d0d0",
                                    }}
                                >
                                    <Check size={18} color="rgb(177, 129, 255)" style={{ flexShrink: 0 }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Pro Plan */}
                <div
                    onClick={() => setSelectedPlan("pro")}
                    style={{
                        background: "linear-gradient(135deg, rgba(177, 129, 255, 0.15) 0%, rgba(177, 129, 255, 0.05) 100%)",
                        border: selectedPlan === "pro" ? "2px solid rgb(177, 129, 255)" : "1px solid rgba(177, 129, 255, 0.3)",
                        borderRadius: "16px",
                        padding: "40px 30px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: selectedPlan === "pro" ? "scale(1.02)" : "scale(1)",
                        position: "relative",
                    }}
                >
                    {/* Popular Badge */}
                    <div
                        style={{
                            position: "absolute",
                            top: "-12px",
                            left: "24px",
                            background: "rgb(177, 129, 255)",
                            color: "#0a0f2c",
                            padding: "6px 16px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Most Popular
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                color: "#f5f5f5",
                                marginBottom: "8px",
                            }}
                        >
                            Pro
                        </h2>
                        <p
                            style={{
                                fontSize: "14px",
                                color: "#a0a0a0",
                            }}
                        >
                            For serious fitness enthusiasts
                        </p>
                    </div>

                    <div
                        style={{
                            marginBottom: "32px",
                            paddingBottom: "32px",
                            borderBottom: "1px solid rgba(177, 129, 255, 0.2)",
                        }}
                    >
                        <div style={{ marginBottom: "8px" }}>
                            <span
                                style={{
                                    fontSize: "14px",
                                    color: "#a0a0a0",
                                }}
                            >
                                {billingPeriod === "monthly" && "Monthly"}
                                {billingPeriod === "quarterly" && "Quarterly"}
                                {billingPeriod === "yearly" && "Yearly"}
                            </span>
                        </div>
                        <div
                            style={{
                                fontSize: "36px",
                                fontWeight: "700",
                                color: "#f5f5f5",
                            }}
                        >
                            ₦{PRICING[billingPeriod].toLocaleString()}
                        </div>
                        <p
                            style={{
                                fontSize: "12px",
                                color: "#a0a0a0",
                                marginTop: "8px",
                            }}
                        >
                            {billingPeriod === "monthly" && "per month, cancel anytime"}
                            {billingPeriod === "quarterly" && "billed quarterly"}
                            {billingPeriod === "yearly" && "billed yearly (save 34%)"}
                        </p>
                    </div>

                    <button
                        disabled={activating}
                        onClick={(e) => {
                            e.stopPropagation()
                            initiateSubscription()
                        }}
                        style={{
                            width: "100%",
                            padding: "12px 24px",
                            background: "rgb(177, 129, 255)",
                            color: "#0a0f2c",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            marginBottom: "32px",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgb(195, 145, 255)"
                            e.currentTarget.style.transform = "translateY(-2px)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgb(177, 129, 255)"
                            e.currentTarget.style.transform = "translateY(0)"
                        }}
                    >
                        {activating ? "Activating..." : "Upgrade to Pro"}
                    </button>

                    <div>
                        <p
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#a0a0a0",
                                marginBottom: "16px",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                            }}
                        >
                            Everything in Free, Plus:
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {PRO_FEATURES.map((feature) => (
                                <li
                                    key={feature}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginBottom: "12px",
                                        fontSize: "14px",
                                        color: "#d0d0d0",
                                    }}
                                >
                                    <Check size={18} color="rgb(177, 129, 255)" style={{ flexShrink: 0 }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* FAQ or Bottom CTA */}
            <div
                style={{
                    textAlign: "center",
                    marginTop: "60px",
                    maxWidth: "600px",
                    margin: "60px auto 0",
                }}
            >
                <p
                    style={{
                        fontSize: "14px",
                        color: "#a0a0a0",
                    }}
                >
                    Need help choosing?{" "}
                    <span style={{ color: "rgb(177, 129, 255)", cursor: "pointer" }}>Contact our support team</span>
                </p>
            </div>
        </div>
    )
}
