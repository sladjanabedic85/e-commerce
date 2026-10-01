import Employee from "./Employee";

const teamMembers = [
  {
    id: 1,
    name: "Emily Johnson",
    position: "Chief Executive Officer (CEO)",
    description: "Emily leads our team with vision and a passion for innovation. With over 10 years of experience in the e-commerce industry, her mission is to ensure every customer has the best possible experience.",
    image: "/images/team/emily-johnson.png",
  },
  {
    id: 2,
    name: "Sarah Smith",
    position: "Head of Product Development",
    description: "Sarah oversees product development and selection. Her expertise in market trends and product quality ensures that our offerings meet the highest standards.",
    image: "/images/team/sarah-smith.png",
  },
  {
    id: 3,
    name: "Michael Smith",
    position: "Marketing & Community Manager",
    description: "Michael manages all marketing campaigns and community engagement. He ensures that every customer receives clear information and feels connected to our brand.",
    image: "/images/team/michael-smith.png",
  },
];

function Team() {
  return (
    <section className="mt-5 mb-5">
      <h2 className="mb-8 text-2xl font-semibold">Meet the Team</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Employee
            key={member.id}
            name={member.name}
            position={member.position}
            description={member.description}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
}

export default Team;
