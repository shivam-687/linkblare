import { GithubOutlined, LineOutlined, LinkedinOutlined, PhoneOutlined, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import React from 'react'
import Resume from '~/components/resume/Resume';
const resumeDataArray = [
  {
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
        icon: <PhoneOutlined />,
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
  },
  {
    name: "Jane Smith",
    image: "/assets/image/resume-img.jpg",
    social: [
      {
        href: "https://linkedin.com/janesmith",
        label: "LinkedIn",
        icon: <LineOutlined />,
      },
      {
        href: "https://twitter.com/janesmith",
        label: "Twitter",
        icon: <TwitterOutlined />,
      },
    ],
    phone: [
      {
        number: "+1 987-654-3210",
        icon: <PhoneOutlined />,
      },
    ],
    objective: "Experienced project manager seeking new opportunities in the IT industry.",
    qualifications: [
      {
        program: "Master of Business Administration",
        stream: "Management",
        school: "University of ABC",
        year: "2016-2018",
        cgpa: "3.9",
      },
      {
        program: "Bachelor of Engineering",
        stream: "Mechanical Engineering",
        school: "DEF University",
        year: "2012-2016",
        cgpa: "3.6",
      },
    ],
    skills: [
      {
        title: "Project Management",
      },
      {
        title: "Leadership",
      },
      {
        title: "Communication",
      },
      {
        title: "Problem Solving",
      },
    ],
  },
  // Add more fake resume data objects here...
];

  
  

const ResumePage = () => {
  return (
    <>
    {
      resumeDataArray.map(resume => {
        return <Resume key={nanoid()} resume={resume}/>
      })
    }
    </>
  )
}

export default ResumePage