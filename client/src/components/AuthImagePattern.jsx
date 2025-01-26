const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
            <div className="max-w-md text-center relative">
                {/* Grid with Bee Image */}
                <div className="grid grid-cols-3 gap-3 mb-8 relative">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-2xl bg-primary/10 ${
                                i % 2 === 0 ? "animate-pulse" : ""
                            }`}
                        />
                    ))}

                    {/* Bee Image in the Center */}
                    <img
                        src="/bee.webp" // Update with actual image path
                        alt="Bee illustration"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-110 h-110 rounded-md shadow-lg border-4 border-primary"
                    />
                </div>
                {/* Text Section */}
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    );
};

export default AuthImagePattern;
