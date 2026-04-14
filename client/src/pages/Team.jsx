import { useEffect } from 'react';

const teamSections = [
  {
    title: "Graphic Team",
    members: [
      { name: "Vishwajeet Survase", initial: "V" },
      { name: "Vinay Kothari (C.F.O.)", initial: "V" },
      { name: "Divya Jain", initial: "D" },
      { name: "Somesh Ranjan Biswal", initial: "S" },
      { name: "Karan Jain (H.R.)", initial: "K" },
      { name: "Ayush Verma", initial: "A" },
      { name: "Ramdev", initial: "R" },
      { name: "Anjana Karthik", initial: "A" },
      { name: "Anugu Siddharth Reddy", initial: "A" },
      { name: "Ruthala Satish", initial: "R" },
      { name: "Paras Patil", initial: "P" }
    ]
  },
  {
    title: "Management Team",
    members: [
      { name: "Aryan", initial: "A" },
      { name: "Aryan Singh", initial: "A" },
      { name: "Istiyaq Ahmed", initial: "I" },
      { name: "Ankush Chopane", initial: "A" },
      { name: "Aditya Karankal", initial: "A" },
      { name: "Sameer", initial: "S" },
      { name: "Martin George", initial: "M" },
      { name: "Abhinav", initial: "A" },
      { name: "Utsav Singh", initial: "U" },
      { name: "Shivam Kumar Singh", initial: "S" },
      { name: "Sujal Patyal", initial: "S" },
      { name: "Sunpreet", initial: "S" },
      { name: "Gaurav Sharma", initial: "G" },
      { name: "Vishal Kumar", initial: "V" },
      { name: "Piyush Singh", initial: "P" }
    ]
  },
  {
    title: "Marketing Team",
    members: [
      { name: "Ansh Varshney", initial: "A" },
      { name: "Shivam Sharma", initial: "S" },
      { name: "Yashika Khurana", initial: "Y" },
      { name: "Kushagra Bajpai", initial: "K" },
      { name: "Pravalika", initial: "P" },
      { name: "Manasi Pandey", initial: "M" },
      { name: "Sharad Soni", initial: "S" },
      { name: "Jatin Kaushik", initial: "J" }
    ]
  },
  {
    title: "Media Team",
    members: [
      { name: "Akshpreet Singh", initial: "A" },
      { name: "Jatin Yadav", initial: "J" },
      { name: "Yashika Khurana", initial: "Y" },
      { name: "Riddhima", initial: "R" },
      { name: "Deepanjali", initial: "D" },
      { name: "Khushi Dwivedi", initial: "K" },
      { name: "Yuvika Patel", initial: "Y" },
      { name: "ila Seth", initial: "İ" }
    ]
  },
  {
    title: "External Affairs",
    members: [
      { name: "Ujjwal Pathak", initial: "U" },
      { name: "Krishna", initial: "K" },
      { name: "Yash Raj Singh", initial: "Y" },
      { name: "Shivanah Singh (C.E.O.)", initial: "S" },
      { name: "Ayush Gautam", initial: "A" }
    ]
  },
  {
    title: "Video Editor",
    members: [
      { name: "Kedarnath", initial: "K" }
    ]
  }
];

const Team = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const members = document.querySelectorAll('.member');
    members.forEach(member => {
      const mouseMove = (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const centerX = member.offsetWidth / 2;
        const centerY = member.offsetHeight / 2;
        member.style.transform = `perspective(1000px) rotateX(${(centerY - y) / 20}deg) rotateY(${(x - centerX) / 20}deg)`;
      };
      const mouseLeave = () => {
        member.style.transform = 'none';
      };
      member.addEventListener('mousemove', mouseMove);
      member.addEventListener('mouseleave', mouseLeave);
    });
  }, []);

  return (
    <section id="team" className="section team">
      <div className="section-header">
        <h2>Meet the <span>Team</span></h2>
        <div className="underline"></div>
      </div>
      
      <div className="floating-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>

      {teamSections.map((section, idx) => (
        <div key={idx} className="team-category">
          <h3>{section.title}</h3>
          <div className="team-members">
            {section.members.map((member, mIdx) => (
              <div key={mIdx} className="member">
                <div className="member-visual">
                  <div className="member-avatar">{member.initial}</div>
                </div>
                <h3>{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Team;
