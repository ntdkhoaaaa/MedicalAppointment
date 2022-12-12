export const data = [
    {
        id: 5,
        statusId: 'S2',
        bookingDate: '9:00 - 10:00 - Thứ bảy - 10/12/2022',
        forWho: 'Khoa Nguyễn Trần(Em gái)',
        prognostic: 'Đau lưng',
        doctorInfor: {
            firstName: 'Khoa Nguy',
            lastName: 'Trần',
            specialty: 'Tim mạch',
            addressClinic: '45 Thanh Thai, Ward 14, District 10, Ho Chi Minh City',
            nameClinic: 'Phòng khám Đa khoa Saigon Healthcare'
        }
    },
    {
        id: 5,
        statusId: 'S2',
        bookingDate: '9:00 - 10:00 - Thứ bảy - 10/12/2022',
        forWho: 'Khoa Nguyễn Trần(Em gái)',
        prognostic: 'Đau lưng',
        doctorInfor: {
            firstName: 'Khoa Nguy',
            lastName: 'Trần',
            specialty: 'Tim mạch',
            addressClinic: '45 Thanh Thai, Ward 14, District 10, Ho Chi Minh City',
            nameClinic: 'Phòng khám Đa khoa Saigon Healthcare'
        }
    },
    {
        id: 5,
        statusId: 'S3',
        bookingDate: '9:00 - 10:00 - Thứ bảy - 10/12/2022',
        forWho: 'Khoa Nguyễn Trần(Em gái)',
        prognostic: 'Đau lưng',
        doctorInfor: {
            firstName: 'Khoa Nguy',
            lastName: 'Trần',
            specialty: 'Tim mạch',
            addressClinic: '45 Thanh Thai, Ward 14, District 10, Ho Chi Minh City',
            nameClinic: 'Phòng khám Đa khoa Saigon Healthcare'
        }
    },
    {
        id: 5,
        statusId: 'S2',
        bookingDate: '9:00 - 10:00 - Thứ bảy - 10/12/2022',
        forWho: 'Khoa Nguyễn Trần(Em gái)',
        prognostic: 'Đau lưng',
        doctorInfor: {
            firstName: 'Khoa Nguy',
            lastName: 'Trần',
            specialty: 'Tim mạch',
            addressClinic: '45 Thanh Thai, Ward 14, District 10, Ho Chi Minh City',
            nameClinic: 'Phòng khám Đa khoa Saigon Healthcare'
        }
    },


]
export const order = { //post
    bookingId: 1,
    benhan: '',
    songaycap: 3,
    donthuocs: [
        {
            tenthuoc: '',
            donvitinh: 2,
            soluong: '',
        },
        {
            tenthuoc: '',
            donvitinh: 2,
            soluong: '',
        },
        {
            tenthuoc: '',
            donvitinh: 2,
            soluong: '',
        }
    ]
}
//get Order input: bookingId
export const getOrder = { //getOrder 
    benhan: '',
    songaycap: 3,
    donthuocs: [
        {
            tenthuoc: '',
            donvitinh: 2,
            soluong: '',
        },
        {
            tenthuoc: '',
            donvitinh: 2,
            soluong: '',
        },
        {
            tenthuoc: '',
            donvitinh: 2,
            soluong: '',
        }
    ],
    doctorInfor: {
        image: '',
        firstName: '',
        lastName: '',
        specialtyName: '',
        positionName: '',
        clinicAddress: '',
    },
}
//get rate input: doctorId
export const rate = [   //get
    {
        patientInfor: {
            firstName: '',
            lastName: '',
            image: '',
            gender: '',
            postDate: ''
        },
        rate: 5,
        comment: 'muoi diem',
    },
    {
        patientInfor: {
            firstName: '',
            lastName: '',
            image: '',
            gender: '',
            postDate: ''
        },
        rate: 5,
        comment: 'muoi diem',
    }
]
export const postRate = {   //post
    patientId: 2,
    doctorId: 1,
    rate: 5,
    comment: 'muoi diem',
}
export const selecteRate = { //làm hàm post cho t dễ làm
    doctorId: 1,
    selectedRate: 5
}