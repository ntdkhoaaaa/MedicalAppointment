import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./ManageMedicine.scss";
import ModalAddNewMedicine from "./ModalAddNewMedicine";
import ModalEditMedicine from "./ModalEditMedicine";
import {
  getMedicineByClinicId,
  deleteMedicineById,
} from "../../../services/userServices";
import { toast } from "react-toastify";
import _, { upperCase } from "lodash";
import Select from "react-select";

class ManageMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalAddNewMedicine: false,
      openModalEditMedicine: false,
      medicine: [],
      search: "",
      tableFilter: "",
      EditedMedicineId: "",
      tubeCount:'',
      pillCount: '',
      unitFilter: {
        value: "All",
        label: "Tất cả",
      },

      // tubeFilter: [],
      // pillFilter: [],
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    if (user.Doctor_Infor?.clinicId) {
      this.getMedicineByClinicId(user.Doctor_Infor?.clinicId);
    } else {
      this.getMedicineByClinicId(user?.clinicId);
    }
  }
  async getMedicineByClinicId(id) {
    let medicine = await getMedicineByClinicId(id);
    let pill=medicine.data.filter(item => item.unit==='viên')
    let tube=medicine.data.filter(item => item.unit==='tuýp')
    this.setState({ 
      medicine: medicine.data,
      tubeCount:tube.length,
      pillCount:pill.length
     });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (
      this.state.openModalAddNewMedicine !== prevState.openModalAddNewMedicine
    ) {
      let { user } = this.props;
      if (user.Doctor_Infor?.clinicId) {
        let medicine = await getMedicineByClinicId(user.Doctor_Infor.clinicId);
        if (medicine && medicine.data.length > 0) {
          let pill=medicine.data.filter(item => item.unit==='viên')
          let tube=medicine.data.filter(item => item.unit==='tuýp')
          this.setState({ 
            medicine: medicine.data,
            tubeCount:tube.length,
            pillCount:pill.length
           });
        }
      } else {
        let medicine = await getMedicineByClinicId(user.clinicId);
        if (medicine && medicine.data.length > 0) {
          let pill=medicine.data.filter(item => item.unit==='viên')
          let tube=medicine.data.filter(item => item.unit==='tuýp')
          console.log(medicine,tube,pill)
          this.setState({ 
            medicine: medicine.data,
            tubeCount:tube.length,
            pillCount:pill.length
           });
        }
      }
    }
    if (this.state.openModalEditMedicine !== prevState.openModalEditMedicine) {
      let { user } = this.props;
      if (user.Doctor_Infor?.clinicId) {
        let medicine = await getMedicineByClinicId(user.Doctor_Infor.clinicId);
        if (medicine && medicine.data.length > 0) {
          let pill=medicine.data.filter(item => item.unit==='viên')
          let tube=medicine.data.filter(item => item.unit==='tuýp')
          console.log(medicine,tube,pill)
          this.setState({ 
            medicine: medicine.data,
            tubeCount:tube.length,
            pillCount:pill.length
           });
        }
      } else {
        let medicine = await getMedicineByClinicId(user.clinicId);
        if (medicine && medicine.data.length > 0) {
          let pill=medicine.data.filter(item => item.unit==='viên')
          let tube=medicine.data.filter(item => item.unit==='tuýp')
          this.setState({ 
            medicine: medicine.data,
            tubeCount:tube.length,
            pillCount:pill.length
           });
        }
      }
    }
  }
  handleAddNewMedicine = () => {
    this.setState({ openModalAddNewMedicine: true });
  };
  toggleCloseModalAddNewMedicine = () => {
    this.setState({
      openModalAddNewMedicine: !this.state.openModalAddNewMedicine,
    });
  };
  toggleCloseModalEditMedicine = () => {
    this.setState({
      openModalEditMedicine: !this.state.openModalEditMedicine,
    });
  };
  async handleDeleteMedicine(data) {
    let { user } = this.props;
    console.log(data);
    let res = await deleteMedicineById(data.id);
    if (res && res.errCode === 0) {
      toast.success("Medicine Deleted Successfully");
      if (user.Doctor_Infor.clinicId) {
        this.getMedicineByClinicId(user.Doctor_Infor.clinicId);
      } else {
        this.getMedicineByClinicId(user.clinicId);
      }
    }
  }
  searchMedicine = (event) => {
    let keyword = event.target.value;
    let { medicine } = this.state;

    if (!_.isEmpty(keyword)) {
      this.setState({ search: keyword });
      let filterTable = medicine.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      this.setState({ tableFilter: filterTable });
    } else {
      this.setState({
        search: keyword,
        medicine: this.state.medicine,
      });
    }
  };
  handleEditMedicine(id) {
    this.setState({
      EditedMedicineId: id,
      openModalEditMedicine: true,
    });
  }
  handleChangeSelectInfor = async (selectedInfor, name) => {
    console.log("cos vo day k ?", selectedInfor, name);
    let {medicine,tableFilter}=this.state
    let {user}=this.props
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    console.log("cos vo day k ?");
    console.log(selectedInfor);
    this.setState({
      ...stateCopy,
    });
    let filter=[]
    if(name.name==='unitFilter')
    {
      if(selectedInfor.value==='T')
      {
        filter=medicine.filter(item =>item.unit==='tuýp')
      }
      if(selectedInfor.value==='V')
      {
        filter=medicine.filter(item =>item.unit==='viên')
      }
      if(selectedInfor.value==='All')
      {
        filter=medicine
      }
      this.setState({
        tableFilter:filter
      })
    }
  };
  render() {
    let {
      openModalAddNewMedicine,
      medicine,
      tableFilter,
      search,
      openModalEditMedicine,
      EditedMedicineId,
      unitFilter,
      tubeCount,
      pillCount,
    } = this.state;
    let { user } = this.props;
    let unitType = [
      {
        value: "All",
        label: "Tất cả",
      },
      {
        label: "Tuýp",
        value: "T",
      },
      {
        label: "Viên",
        value: "V",
      },
    ];
    return (
      <div className="manage-medicine">
        <div className="container-medicine">
          <div className="left-container">
            <div className="filter-container">
              <div className="type-search">
                <label>Đơn vị tính</label>
                <Select
                  className="type-select"
                  name="unitFilter"
                  value={this.state.unitFilter}
                  onChange={this.handleChangeSelectInfor}
                  options={unitType}
                />
              </div>
              <div className="search-container">
                <label>Thuốc</label>
                <div className="search">
                  <input
                    className="search-medicine"
                    type="text"
                    id="myInput"
                    onChange={(event) => this.searchMedicine(event)}
                    title="Type in a name"
                  />
                  <div className="icon-container">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistical-container">
              <div className="total total-medicine ">
                <label>Tổng số thuốc</label>
                <span>{tubeCount+pillCount}</span>
              </div>
              <div className="total total-tupe ">
                <label>Tổng loại tuýp</label>
                <span>{tubeCount}</span>
              </div>
              <div className="total total-pill ">
                <label>Tổng loại viên</label>
                <span>{pillCount}</span>
              </div>
              <div className="add-new-medicine">
                <div
                  className="icon-container"
                  onClick={() => this.handleAddNewMedicine()}
                >
                  <span>Thêm thuốc</span>
                </div>
              </div>
            </div>
          </div>

          <div className="involve-table-button">
            <div className="manage-medicine-table">
              <table id="TableManageMedicine">
                <tbody>
                  <tr>
                    <th>Tên thuốc</th>
                    <th>Mã thuốc</th>
                    <th>Đơn vị tính</th>
                    <th>Đơn giá</th>
                    <th>Ngày tạo</th>
                    <th>Ngày sửa</th>
                    <th>Thao tác</th>
                  </tr>
                  {medicine && search.length > 0 || unitFilter.value!=='All'
                    ? tableFilter.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td width='15%'>{item?.nameMedicine}</td>
                            <td width='10%'>{item?.medicineCode}</td>
                            <td width='10%'>{item?.unit}</td>
                            <td width='0%'>{item?.price}</td>
                            <td width='20%'>                        {new Date(item?.createdAt).toLocaleDateString()}{" "}
                              {new Date(item?.createdAt).toLocaleTimeString()}</td>
                            <td width='20%'>{new Date(item?.updatedAt).toLocaleDateString()}{" "}
                              {new Date(item?.updatedAt).toLocaleTimeString()}</td>
                            <td width='15%'>
                              <button
                                onClick={() => this.handleEditMedicine(item.id)}
                                className="btn-edit"
                              >
                                <i className="fas fa-pencil-alt"></i>
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => this.handleDeleteMedicine(item)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : medicine.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td  width='15%'>{item?.nameMedicine}</td>
                            <td  width='10%'>{item?.medicineCode}</td>
                            <td  width='10%'>{item?.unit}</td>
                            <td  width='10%'>{item?.price}</td>
                            <td  width='20%'>
                              {new Date(item?.createdAt).toLocaleDateString()}{" "}
                              {new Date(item?.createdAt).toLocaleTimeString()}
                            </td>
                            <td width='20%'>
                            {new Date(item?.updatedAt).toLocaleDateString()}{" "}
                              {new Date(item?.updatedAt).toLocaleTimeString()}</td>

                            <td  width='15%'>
                              <button
                                onClick={() => this.handleEditMedicine(item.id)}
                                className="btn-edit"
                              >
                                <i className="fas fa-pencil-alt"></i>
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => this.handleDeleteMedicine(item)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ModalAddNewMedicine
          openModalAddNewMedicine={openModalAddNewMedicine}
          clinicId={
            user.Doctor_Infor?.clinicId
              ? user.Doctor_Infor?.clinicId
              : user?.clinicId
          }
          toggleCloseModalAddNewMedicine={this.toggleCloseModalAddNewMedicine}
        />
        <ModalEditMedicine
          openModalEditMedicine={openModalEditMedicine}
          toggleCloseModalEditMedicine={this.toggleCloseModalEditMedicine}
          EditedMedicineId={EditedMedicineId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMedicine);
