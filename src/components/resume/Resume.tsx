import { Card, Divider, Table } from "antd"
import { nanoid } from "nanoid"
import Image from "next/image"
import { PropsWithChildren, ReactNode } from "react"


export type ResumeType = {
    name: string,
    image: string,
    social: {
        href: string,
        label: string,
        icon: ReactNode
    }[],
    phone: {
        number: string,
        icon: ReactNode
    }[],
    objective?: string,
    qualifications: {
        program: string,
        stream: string,
        school: string,
        year: string,
        cgpa: string
    }[],
    skills: {
        title: string
    }[]
}

const ResumeTitle = ({ children }: PropsWithChildren) => {
    return (
        <h1 className="text-xl text-black font-bold">{children}</h1>
    )
}

const ResumeSocial = ({ label, icon }: { label: string, icon: ReactNode }) => {
    return (
        <div className="flex gap-3 items-center capitalize">
            <span className="text-gray-600">{icon}</span>
            <span>{label}</span>
        </div>
    )
}

const ResumeSection = ({ sectionTitle, children }: PropsWithChildren<{ sectionTitle: string }>) => {
    return (
        <div className="px-4 space-y-4">
            <h2 className="text-lg font-medium">{sectionTitle}</h2>
            <div>
                {children}
            </div>
        </div>
    )
}

const ResumeTable = ({
    data
}: {
    data: {
        program: string,
        stream: string,
        school: string,
        year: string,
        cgpa: string
    }[]
}) => {
    return (
        <Table  pagination={false} dataSource={data} columns={[
            {
                title: 'Programe',
                dataIndex: 'program',
                key: 'program',
            },
            {
                title: 'Stream',
                dataIndex: 'stream',
                key: 'stream',
            },
            {
                title: 'School',
                dataIndex: 'school',
                key: 'school',
            },
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year',
            },
            {
                title: 'CGPA',
                dataIndex: 'cgpa',
                key: 'cgpa',
            },
        ]}  />
    )
}


const ResumeList = ({list}: {list: {title: string}[]}) => {
    return (
        <div className="px-4 space-y-2">
            {
                list.map(l => {
                    return <div key={nanoid()} className="font-medium">- {l.title}</div>
                })
            }
        </div>
    )
}

const Resume = ({
    resume
}: {
    resume: ResumeType
}) => {

    return (
        <section className=" py-40 text-gray-600 bg-slate-50">
            <div className="rounded-xl border-2 border-gray-400 shadow-md p-4 mx-auto max-w-4xl overflow-hidden bg-white">
                <div className="grid grid-cols-2 justify-items-center items-center">
                    <div>
                        <div className="mx-auto max-w-lg">
                            <ResumeTitle>{resume.name}</ResumeTitle>

                            <div className="mt-5 space-y-3">
                                {
                                    resume.social.map(social => {
                                        return <ResumeSocial key={nanoid()} {...social} />
                                    })
                                }
                                {
                                    resume.phone.map(phon => {
                                        return <ResumeSocial key={nanoid()} label={phon.number} icon={phon.icon} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mx-auto relative aspect-square object-cover max-w-xs h-48 overflow-hidden rounded-xl shadow-xl">
                            <Image alt="" src={resume.image} fill className="object-cover" />
                        </div>
                    </div>
                </div>

                <Divider />
                <ResumeSection sectionTitle={'Objective'}>
                    <p>{resume.objective}</p>
                </ResumeSection>

                <Divider />
                <ResumeSection sectionTitle="Qualifications">
                    <ResumeTable data={resume.qualifications}/>
                </ResumeSection>

                <Divider/>
                <ResumeSection sectionTitle="Skills">
                    <ResumeList list={resume.skills} />
                </ResumeSection>
            </div>
        </section>
    );
}


export default Resume;



