export type Job = {
  id: number;
  slug: string;
  title: string;
  location: string;
  experience: string;
  type: string;
  roleOverview: string;
  keyResponsibilities: string[];
  requiredSkillsExperience: string[];
};

export const currentOpenings: Job[] = [
  {
    id: 1,
    slug: "senior-software-engineer",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    experience: "5-8 years",
    type: "Full-time",
    roleOverview:
      "As a Senior Software Engineer with 5-8 years of experience, you will lead the design, development, and optimization of scalable, high-performance applications while providing technical guidance to the engineering team.",
    keyResponsibilities: [
      "Design and develop high-quality, scalable applications",
      "Collaborate with cross-functional teams to define technical solutions",
      "Mentor junior engineers and conduct code reviews",
      "Ensure system performance, security, and reliability",
    ],
    requiredSkillsExperience: [
      "Strong experience with modern programming languages",
      "Expertise in system design and software architecture",
      "Hands-on experience with cloud platforms",
      "Excellent problem-solving and leadership skills",
    ],
  },
  {
    id: 2,
    slug: "product-manager",
    title: "Product Manager",
    location: "New York, NY",
    experience: "3-5 years",
    type: "Full-time",
    roleOverview:
      "As a Product Manager with 3-5 years of experience, you will own the product lifecycle, translate business goals into clear requirements, and work closely with engineering, design, and stakeholders to deliver impactful products.",
    keyResponsibilities: [
      "Define and manage the product roadmap",
      "Gather, analyze, and prioritize customer and business requirements",
      "Coordinate with engineering and design teams for execution",
      "Monitor product performance and key metrics",
    ],
    requiredSkillsExperience: [
      "Proven experience in product management roles",
      "Strong analytical, communication, and decision-making skills",
      "Ability to balance business, user, and technical needs",
      "Experience working in agile environments",
    ],
  },
  {
    id: 3,
    slug: "ux-ui-designer",
    title: "UX/UI Designer",
    location: "Remote",
    experience: "2-4 years",
    type: "Contract",
    roleOverview:
      "As a UX/UI Designer with 2-4 years of experience, you will design intuitive, user-centered interfaces and experiences, collaborating with product and engineering teams to create visually appealing and highly usable digital products.",
    keyResponsibilities: [
      "Create wireframes, prototypes, and high-fidelity UI designs",
      "Conduct user research and usability testing",
      "Collaborate with cross-functional teams to refine user experiences",
      "Maintain and evolve design systems and standards",
    ],
    requiredSkillsExperience: [
      "Proficiency in tools such as Figma, Sketch, or Adobe XD",
      "Strong understanding of UX research and UI design principles",
      "Experience designing responsive and accessible interfaces",
      "Creative mindset with strong attention to detail",
    ],
  },
];
