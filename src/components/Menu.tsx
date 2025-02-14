import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'
import { BsPeople } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { CiCalendar, CiHome, CiSettings } from 'react-icons/ci';
import { IoMdLogOut } from 'react-icons/io';
import { PiChalkboardTeacherThin, PiNoteLight } from 'react-icons/pi';
import { RiMessage3Line, RiParentLine } from 'react-icons/ri';
import { SiGoogleclassroom } from 'react-icons/si';
import { SlNotebook } from 'react-icons/sl';
import { TfiAnnouncement, TfiWrite } from 'react-icons/tfi';
const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: <CiHome />,
                label: "Home",
                href: "/",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <PiChalkboardTeacherThin />,
                label: "Teachers",
                href: "/list/teachers",
                visible: ["admin", "teacher"],
            },
            {
                icon: <BsPeople />,
                label: "Students",
                href: "/list/students",
                visible: ["admin", "teacher"],
            },
            {
                icon: <RiParentLine />,
                label: "Parents",
                href: "/list/parents",
                visible: ["admin", "teacher"],
            },
            {
                icon: <SlNotebook />,
                label: "Subjects",
                href: "/list/subjects",
                visible: ["admin"],
            },
            {
                icon: <SiGoogleclassroom />,
                label: "Classes",
                href: "/list/classes",
                visible: ["admin", "teacher"],
            },
            {
                icon: <TfiWrite />,
                label: "Lessons",
                href: "/list/lessons",
                visible: ["admin", "teacher"],
            },
            {
                icon: <PiNoteLight />,
                label: "Exams",
                href: "/list/exams",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <PiNoteLight />,
                label: "Assignments",
                href: "/list/assignments",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <PiNoteLight />,
                label: "Results",
                href: "/list/results",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <BsPeople />,
                label: "Attendance",
                href: "/list/attendance",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <CiCalendar />,
                label: "Events",
                href: "/list/events",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <RiMessage3Line />,
                label: "Messages",
                href: "/list/messages",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <TfiAnnouncement />,
                label: "Announcements",
                href: "/list/announcements",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: <CgProfile />,
                label: "Profile",
                href: "/profile",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <CiSettings />,
                label: "Settings",
                href: "/settings",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: <IoMdLogOut />,
                label: "Logout",
                href: "/logout",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
];
const Menu = async () => {
    const user = await currentUser();
    const role = user?.publicMetadata.role as string;
    return (
        <div className='mt-4 text-sm'>
            {menuItems.map((group, index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <span className='hidden lg:block text-gray-400 font-light my-4'>{group.title}</span>
                    {group.items.map((item, index) => {
                        if (item.visible.includes(role)) {
                            return (
                                <Link key={index} href={item.href} className='flex items-center justify-center lg:justify-start gap-4 text-gray-400 mb-2 rounded-md hover:bg-SkyLight md:px-2'>
                                    {item.icon}
                                    <span className='hidden lg:block'> {item.label}</span>
                                </Link>
                            )
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

export default Menu