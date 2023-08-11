export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">User Profile <span className="p-2 rounded-lg bg-orange-500">{params.id}</span></h1>
        </div>
    )
}