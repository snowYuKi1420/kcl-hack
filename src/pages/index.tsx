"use client";
import Form from "../components/Form"
import Title from "../components/Title";

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <Title/>
                <Form/>
            </div>
        </main>
    )
}