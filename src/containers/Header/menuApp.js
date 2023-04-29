export const adminMenu = [
    { //Quản lý user
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
                stt:1,
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
                stt:2,
            },

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
                stt:1,
            },
            { //Quản lý bệnh nhân khám bệnh

                name: 'menu.doctor.patient',
                link: '/doctor/manage-patient',
                stt:2,
            },
            { //Quản lý thuốc
                name: 'menu.doctor.medicine',
                link: '/doctor/manage-medicine',
                stt:3,
            }

        ]
    }
]
export const doctorHospitalMenu = [
    {
        name: 'menu.doctor.general',
        menus: [
            { //Quản lý kế hoạch khám bệnh

                name: 'menu.doctor.schedule',
                link: '/doctorHospital/manage-schedule',
                stt:1,
            },
            { //Quản lý bệnh nhân khám bệnh

                name: 'menu.doctor.patient',
                link: '/doctorHospital/manage-patient',
                stt:2,
            },
            { //Quản lý thuốc
                name: 'menu.doctor.medicine',
                link: '/doctorHospital/manage-medicine',
                stt:3,
            }
        ]
    }
]
export const accountantHospitalMenu = [
    {
        name: 'menu.accountantHospital.general',
        menus: [
            { //Quản lý thông tin phòng khám
                name: 'menu.accountantHospital.manage-hospital',
                link: '/accountantHospital/manage-hospital',
                stt:1
            },
            { //Quản lý chuyên khoa phòng khám
                name: 'menu.accountantHospital.manage-hospital-specialties',
                link: '/accountantHospital/manage-hospital-specialties',
                stt:2
            },
            { //Quản lý quản lý thông tin bác sĩ
                name: 'menu.accountantHospital.manage-hospital-doctors',
                link: '/accountantHospital/manage-hospital-doctors-account',
                stt:3
            },
            { //Quản lý kế hoạch khám bệnh của bác sĩ trong phòng khám
                name: 'menu.accountantHospital.manage-doctors-schedule',
                link: '/accountantHospital/manage-hospital-doctors-schedule',
                stt:4
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
                stt:1
            },
            { //Quản lý quản lý thông tin bác sĩ
                name: 'menu.accountant.manage-clinic-doctors',
                link: '/accountant/manage-clinic-doctors-account',
                stt:2
            },
            { //Quản lý kế hoạch khám bệnh của bác sĩ trong phòng khám
                name: 'menu.accountant.manage-doctors-schedule',
                link: '/accountant/manage-clinic-doctors-schedule',
                stt:3
            },
            { //Quản lý kế hoạch khám bệnh của bác sĩ trong phòng khám
                name: 'menu.accountant.manage-doctors-extra-infor',
                link: '/accountant/edit-clinic-doctor-extra-infor',
                stt:4
            }
        ]
    }
]
export const patientMenu=[
    {
        name:'Patient',
        menus:[
            { //Quản lý thông tin phòng khám
                name: 'menu.patient.patient-basic-information',
                link: '/patient/patient-basic-information',
                stt:1
            },
            { //Quản lý quản lý thông tin bác sĩ
                name: 'menu.patient.patient-booking-history',
                link: '/patient/patient-booking-history',
                stt:2
            },
        ]
    }
]