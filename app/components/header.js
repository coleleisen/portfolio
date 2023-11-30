export default function Header() {
    const personalInfo = {
        name: "Cole Leisen",
        role: "Software Engineer",
        location: "Toronto, ON",
        email: "coleleisen@gmail.com",
        phone : "416-994-3250",
        website: "https://github.com/coleleisen",
        linkedIn: "https://www.linkedin.com/in/cole-leisen",
      };
    return (
      <header  className=" bg-opacity-0 text-white py-6 px-8" style={{zIndex : 10}}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
            <p className="text-xl">{personalInfo.role}</p>
            <p>{personalInfo.location}</p>
          </div>
          <div>
            {/* Placeholder for your picture. Make sure to replace with your actual image URL */}
            <img className="h-32 w-32 rounded-full border-4 border-white" src="ratty.jpg" alt="Cole Leisen" />
          </div>
        </div>
  
        <div className="mt-4" style={{zIndex : 10}}>
        <p>Phone: {personalInfo.phone}</p>
          <p>Email: <a href={`mailto:${personalInfo.email}`} className="underline">{personalInfo.email}</a></p>
         
        </div>
      </header>
    );
  }