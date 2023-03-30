export const adminMenu = [
    { //Quản lý user
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
            },
            {
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule',
            }

        ]
    },
    { //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            },
        ]
    },
    { //Quản lý chuyển khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },
        ]
    },
    // { //Quản lý cẩm nang
    //     name: 'menu.admin.handbook',
    //     menus: [
    //         {
    //             name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
    //         },
    //     ]
    // },
    // { //Quản lý kế hoạch khám bệnh
    //     name: 'menu.doctor.schedule',
    //     menus: [
    //         {
    //             name: 'menu.doctor.schedule', link: '/system/user-redux',
    //         }

    //     ]
    // }
];
export const doctorMenu = [
    {
        name: 'menu.doctor.general',
        menus: [
            { //Quản lý kế hoạch khám bệnh

                name: 'menu.doctor.schedule',
                link: '/doctor/manage-schedule',
            },
            { //Quản lý bệnh nhân khám bệnh

                name: 'menu.doctor.patient',
                link: '/doctor/manage-patient',
            },
            { //Quản lý thuốc
                name: 'menu.doctor.medicine',
                link: '/doctor/manage-medicine',
            }

        ]
    }
]
export const accountantMenu = [
    {
        name: 'menu.accountant.general',
        menus: [
            { //Quản lý thông tin phòng khám
                name: 'menu.accountant.manage-clinic',
                link: '/accountant/manage-clinic',
            },
            { //Quản lý chuyên khoa phòng khám
                name: 'menu.accountant.manage-clinic-specialties',
                link: '/accountant/manage-clinic-specialties',
            },
            { //Quản lý quản lý thông tin bác sĩ
                name: 'menu.accountant.manage-clinic-doctors',
                link: '/accountant/manage-clinic-doctors',
            },
            { //Quản lý kế hoạch khám bệnh của bác sĩ trong phòng khám
                name: 'menu.accountant.manage-doctors-schedule',
                link: '/accountant/manage-doctors-schedule',
            }
        ]
    }
]