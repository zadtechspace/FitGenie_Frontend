import { useState } from "react";
import vapi from "../lib/vapi.sdk"


export default function GeneratePlan() {
    const [connecting, setConnecting] = useState(false)
    console.log(import.meta.env.VITE_VAPI_AGENT_ID)
    const startCall = async () => {
        console.log("Connecting...")
        setConnecting(true)
        try {
            await vapi.start("b725db21-c602-4117-9262-265518c0bf5b", {
                variableValues: {
                    userName: "Peter babs"
                }
            })

        } catch (error) {
            console.log(error)
        } finally {
            setConnecting(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#030712] text-white px-4 md:px-10 py-20">
            {/* Title Section */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Generate Your <span className="text-cyan-400">FITNESS PROGRAM</span>
                </h1>
                <p className="text-gray-400 mt-3 text-lg">
                    Have a voice conversation with our AI assistant to create your personalized plan
                </p>
            </div>

            {/* Card Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* AI Card */}
                <div className="bg-[#0b1020] rounded-2xl p-10 flex flex-col items-center shadow-lg">
                    <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-cyan-400 mb-4">
                        <img src="/fitgenie.png" alt="AI Coach" className="h-full w-full object-cover" />
                    </div>

                    <h2 className="text-2xl font-semibold">CodeFlex AI</h2>
                    <p className="text-gray-400 mt-1">Fitness & Diet Coach</p>

                    <div className="mt-6 bg-[#111827] px-4 py-2 rounded-full text-gray-300 text-sm">
                        ● Waiting...
                    </div>
                </div>

                {/* User Card */}
                <div className="bg-[#0b1020] rounded-2xl p-10 flex flex-col items-center shadow-lg">
                    <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-cyan-400 mb-4">
                        <img src="/portrait-smiling-man.jpg" alt="User" className="h-full w-full object-cover" />
                    </div>

                    <h2 className="text-2xl font-semibold">You</h2>
                    <p className="text-gray-400 mt-1">User</p>

                    <div className="mt-6 bg-[#111827] px-4 py-2 rounded-full text-gray-300 text-sm">
                        ● Ready
                    </div>
                </div>
            </div>

            {/* Start Call Button */}
            <div className="flex justify-center mt-10">
                <button disabled={connecting} onClick={startCall} className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-10 py-3 rounded-full text-lg shadow-md">
                    {connecting ? "Connecting..." : "Start Call"}
                </button>
            </div>
        </div>
    );
}
