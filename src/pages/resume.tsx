import { GithubOutlined, LinkedinOutlined, PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import React from 'react'
import Resume from '~/components/resume/Resume';
const resumeData = {
    name: "John Doe",
    image: "/assets/image/resume-img.jpg",
    social: [
      {
        href: "https://linkedin.com/johndoe",
        label: "LinkedIn",
        icon: <LinkedinOutlined />,
      },
      {
        href: "https://github.com/johndoe",
        label: "GitHub",
        icon: <GithubOutlined />,
      },
    ],
    phone: [
      {
        number: "+1 123-456-7890",
        icon: <WhatsAppOutlined />,
      },
      {
        number: "+44 987-654-3210",
        icon: <PhoneOutlined />,
      },
    ],
    objective: "Highly motivated software engineer seeking challenging opportunities in the tech industry.",
    qualifications: [
      {
        program: "Bachelor of Science",
        stream: "Computer Science",
        school: "University of XYZ",
        year: "2018-2022",
        cgpa: "3.8",
      },
      {
        program: "High School Diploma",
        stream: "Science",
        school: "ABC School",
        year: "2018",
        cgpa: "4.0",
      },
    ],
    skills: [
      {
        title: "JavaScript",
      },
      {
        title: "React",
      },
      {
        title: "TypeScript",
      },
      {
        title: "HTML",
      },
      {
        title: "CSS",
      },
    ],
  };
  
  

const ResumePage = () => {
  return (
    <Resume resume={resumeData}/>
  )
}

export default ResumePage