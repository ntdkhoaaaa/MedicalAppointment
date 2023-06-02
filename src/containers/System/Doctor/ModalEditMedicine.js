import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./ModalEditMedicine.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  editMedicineInfor,
  getMedicineById,
  warningDuplicateMedicine,
} from "../../../services/userServices";
import { toast } from "react-toastify";
import Select from "react-select";
class ModalEditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: {},
      unit: {
        value: "viên",
        label: "viên",
      },
      units: [
        {
          value: "viên",
          label: "viên",
        },
        {
          value: "tuýp",
          label: "tuýp",
        },
      ],
    };
  }
  async componentDidMount() {
    let { EditedMedicineId } = this.props;
    console.log(EditedMedicineId);
    let res = await getMedicineById(EditedMedicineId);
    if (res && res.errCode === 0) {
      this.setState({
        receipts: res.data,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.EditedMedicineId !== prevProps.EditedMedicineId) {
      let { EditedMedicineId } = this.props;
      let res = await getMedicineById(EditedMedicineId);
      if (res && res.errCode === 0) {
        this.setState({
          receipts: res.data,
        });
      }
    }
  }
  toggle = () => {
    this.props.toggleCloseModalEditMedicine();
  };

  handleChange = () => (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    let temp = { ...this.state.receipts };
    temp = {
      ...temp,
      [name]: value,
    };
    this.setState({
      receipts: temp,
    });
  };
  async checkDuplicated(medicineArr, clinicId) {
    let data = {
      medicineArr: medicineArr,
      clinicId: clinicId,
    };
    console.log(data);
    let res = await warningDuplicateMedicine(data);
    console.log(res);

    if (res.data?.result === true) {
      let dulicatedArr = res.data.warningDuplicateMedicine;
      medicineArr.map((item) => {
        if (dulicatedArr.includes(item.medicineCode)) {
          item.isDuplicated = true;
        }
      });
      console.log(medicineArr);
      this.setState({
        receipts: medicineArr,
      });
      return {
        result: true,
      };
    } else {
      return {
        result: false,
      };
    }
  }
  async handleEditMedicineInfor() {
    let res = await editMedicineInfor(this.state.receipts);
    console.log(res);
    if (res && res.errCode === 0) {
      this.toggle();
    }
  }
  handleChangeSelectInfor = (selectedInfor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
    let temp = { ...this.state.receipts };
    temp = {
      ...temp,
      [stateName]: selectedInfor.value,
    };
    this.setState({
      receipts: temp,
    });
  };
  render() {
    let { openModalEditMedicine, editedMedicineId } = this.props;

    let { receipts, unit, units } = this.state;
    return (
      <Modal
        isOpen={openModalEditMedicine}
        toggle={() => {
          this.toggle();
        }}
      >
        <ModalHeader className="title">Sửa thông tin thuốc</ModalHeader>
        <ModalBody>
          <div className="modal-edit-medicine">
            <div>
              <table className="medicine-table">
                <thead>
                  <tr>
                    <th width="25%">Tên thuốc</th>
                    <th width="25%">Mã thuốc</th>
                    <th width="25%">Đơn vị tính</th>
                    <th width="25%">Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name="nameMedicine"
                        disabled={true}
                        value={receipts.nameMedicine}
                        // onChange={this.handleChange()}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="medicineCode"
                        value={receipts.medicineCode}
                        disabled={true}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Select
                        name="unit"
                        value={unit}
                        onChange={this.handleChangeSelectInfor}
                        options={units}
                      ></Select>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        min="1"
                        value={receipts.price}
                        onChange={this.handleChange()}
                        className="form-control"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="btn-group">
            <button
              className="btn-add-new-medicine"
              onClick={() => {
                this.handleEditMedicineInfor();
              }}
            >
              <i className="fas fa-save"></i> Save
            </button>{" "}
            <button
              className="btn-cancel-medicine"
              onClick={() => {
                this.toggle();
              }}
            >
              <i className="fas fa-window-close"></i> Close
            </button>
          </div>
        </ModalBody>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditMedicine);
