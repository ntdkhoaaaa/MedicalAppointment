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

class ManageMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalAddNewMedicine: false,
      openModalEditMedicine: false,
      medicine: [],
      medicineNameFilter: [],
      search: "",
      tableFilter: "",
      EditedMedicineId: "",
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    this.getMedicineByClinicId(user.Doctor_Infor.clinicId);
  }
  async getMedicineByClinicId(id) {
    let medicine = await getMedicineByClinicId(id);
    this.setState({ medicine: medicine.data });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (
      this.state.openModalAddNewMedicine !== prevState.openModalAddNewMedicine
    ) {
      let { user } = this.props;
      let medicine = await getMedicineByClinicId(user.Doctor_Infor.clinicId);
      if(medicine && medicine.data.length > 0) {
        this.setState({ medicine: medicine.data });
      }
    }
    if (this.state.openModalEditMedicine !== prevState.openModalEditMedicine) {
      let { user } = this.props;
      let medicine = await getMedicineByClinicId(user.Doctor_Infor.clinicId);
      if(medicine && medicine.data.length > 0) {
        this.setState({ medicine: medicine.data });
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
      this.getMedicineByClinicId(user.Doctor_Infor.clinicId);
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
  render() {
    let {
      openModalAddNewMedicine,
      medicine,
      tableFilter,
      search,
      openModalEditMedicine,
      EditedMedicineId,
    } = this.state;
    let { user } = this.props;

    return (
      <div className="manage-medicine">
        <div className="manage-medicine-title">DANH SÁCH THUỐC</div>
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input
            className="search-medicine"
            type="text"
            id="myInput"
            onChange={(event) => this.searchMedicine(event)}
            title="Type in a name"
          />
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
                  <th>Thao tác</th>
                </tr>
                {medicine && search.length > 0
                  ? tableFilter.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item?.nameMedicine}</td>
                          <td>{item?.medicineCode}</td>
                          <td>{item?.unit}</td>
                          <td>{item?.price}</td>
                          <td>{item?.createdAt}</td>
                          <td>
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
                          <td>{item?.nameMedicine}</td>
                          <td>{item?.medicineCode}</td>
                          <td>{item?.unit}</td>
                          <td>{item?.price}</td>
                          <td>{item?.createdAt}</td>
                          <td>
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
          <div className="add-new-medicine">
            <div
              className="icon-container"
              onClick={() => this.handleAddNewMedicine()}
            >
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>
        <ModalAddNewMedicine
          openModalAddNewMedicine={openModalAddNewMedicine}
          clinicId={user.Doctor_Infor.clinicId}

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
