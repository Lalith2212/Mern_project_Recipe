import React from "react"; // Import for animations // Import styled components
import lalithImg from "../assets/lalith.jpg";
import saethuSaiImg from "../assets/saethusai.jpg";
import anilImg from "../assets/anil.jpg";
import profileImg from "../assets/profile.png";
import ANJALIImg from "../assets/ANJALI.jpg"; // Ensure the correct extension
 // Default profile image for Anjali

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Lalith Krishna",
      role: "Backend Developer",
      batch: "3rd Year CSE",
      img: lalithImg,
    },
    {
      name: "Saethu Sai",
      role: "Frontend Developer",
      batch: "3rd Year CSE",
      img: saethuSaiImg,
    },
    {
      name: "Anil Kumar",
      role: "UI/UX Designer",
      batch: "3rd Year CSE",
      img: anilImg,
    },
    {
      name: "Anjali",
      role: "Recipe Data Analyst",
      batch: "3rd Year CSE",
      img: ANJALIImg, // Default image
    },
  ];

  return (
    <Container>
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Hungry Hive</strong>, a platform designed to bring food lovers together!
      </p>
      <p>
        Our mission is to <strong>help people explore, share, and learn new food recipes</strong> from around the world.
        Whether you're a home cook or a professional chef, we provide a <strong>simple and engaging way</strong> to discover exciting dishes.
      </p>
      <p>
        Our agenda is to create a <strong>community-driven recipe hub</strong> where users can <strong>add, edit, and save their favorite recipes</strong>.
        We aim to <strong>simplify cooking</strong> by providing <strong>detailed recipe instructions</strong> and <strong>step-by-step guidance</strong>.
      </p>

      <h2>Meet Our Team</h2>
      <TeamContainer>
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <ProfileImage src={member.img} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.batch}</p>
          </Card>
        ))}
      </TeamContainer>

      {/* Moving Text Animation */}
      <MarqueeText>
        <strong>Hungry Hive:</strong> Your go-to hub for discovering, sharing, and mastering delicious recipes from all around the world.
      </MarqueeText>
    </Container>
  );
};

/* Styled Components */
const Container = styled.div`
  padding: 60px 20px;
  text-align: center;
  font-family: "Arial", sans-serif;
  background-color:rgb(3, 43, 20);
  min-height: 100vh;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const Card = styled.div`
  width: 200px;
  padding: 15px;
  border-radius: 10px;
  background-color:rgb(0, 0, 0);
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Hover Effect */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(5deg) scale(1.2); /* Additional Effect */
  }
`;

/* Keyframe animation for moving text */
const moveText = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const MarqueeText = styled.p`
  font-size: 16px;
  color:rgb(126, 25, 25);
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  margin-top: 40px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  animation: ${moveText} 10s linear infinite;
`;

export default AboutUs;
