import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { emitter } from "../../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  addNewMedicine,
  warningDuplicateMedicine,
} from "../../../services/userServices";
import * as XLSX from "xlsx";
import "./ModalAddNewMedicine.scss";
import Switch from "react-switch";
import { toast } from "react-toastify";

class ModalAddNewMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: [
        {
          nameMedicine: "",
          medicineCode: "",
          unit: "",
          price: "",
          isDuplicated: false,
        },
      ],
      submitFile: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    let { user } = this.props;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  toggle = () => {
    this.setState({
      receipts: [
        {
          nameMedicine: "",
          medicineCode: "",
          unit: "",
          price: "",
          isDuplicated: false,
        },
      ],
      submitFile: false,
    });
    this.props.toggleCloseModalAddNewMedicine();
  };
  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const receipts = [...this.state.receipts];
    receipts[idx] = {
      ...receipts[idx],
      [name]: value,
    };
    this.setState({
      receipts,
    });
  };
  handleAddRow = async () => {
    let temp = [...this.state.receipts];

    let checkDuplicated = await this.checkDuplicated(temp);
    if (checkDuplicated.result === true) {
      toast.error(
        "Thông tin thuốc bạn thêm vào bị trùng với danh thuốc đã thêm trước đó"
      );
    } else {
      const item = {
        nameMedicine: "",
        medicineCode: "",
        unit: "",
        price: "",
      };
      this.setState({
        receipts: [...this.state.receipts, item],
      });
    }
  };

  handleRemoveSprcificRow = (idx) => () => {
    if(this.state.receipts.length > 1)
    {
      const receipts = [...this.state.receipts];
      receipts.splice(idx, 1);
      this.setState({ receipts });
    }
    if(this.state.receipts.length===1){
      if(this.state.receipts[idx].isDuplicated===true){
        console.log('check duplicate');
        this.setState({
          receipts: [
            {
              nameMedicine: "",
              medicineCode: "",
              unit: "",
              price: "",
              isDuplicated: false,
            },
          ]})
      }
    }
  };
  handleOnChangeInput = (event, id) => {
    let inputValue = event.target.value;
    let copyState = { ...this.state };
    copyState[id] = inputValue;
    this.setState({
      ...copyState,
    });
  };

  readExcelFile = async (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then(async (d) => {
      let res = await warningDuplicateMedicine(d);
      if (res.data.result === true) {
        let dulicatedArr = res.data.warningDuplicateMedicine;
        let receiptArr = d;
        receiptArr.map((item) => {
          if (dulicatedArr.includes(item.medicineCode)) {
            item.isDuplicated = true;
          }
        });
        console.log(receiptArr);
        this.setState({
          receipts: receiptArr,
        });
      } else {
        this.setState({
          receipts: d,
        });
      }
    });
    console.log(this.state.receipts);
  };
  async checkDuplicated(medicineArr) {
    let res = await warningDuplicateMedicine(medicineArr);
    let dulicatedArr = res.data.warningDuplicateMedicine;

    if (res.data.result === true) {
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
  submitFile = (checked) => {
    this.setState({
      submitFile: checked,
      receipts: [
        {
          nameMedicine: "",
          medicineCode: "",
          unit: "",
          price: "",
          isDuplicated: false,
        },
      ],
    });
  };
  handleAddNewMedicine = async (clinicId) => {
    let checkDuplicated = await this.checkDuplicated(this.state.receipts);
    if (checkDuplicated.result === true) {
      toast.error(
        "Thông tin thuốc bạn thêm vào bị trùng với danh thuốc đã thêm trước đó"
      );
    } else {
      let data = {
        clinicId: clinicId,
        arrMedicine: this.state.receipts,
      };
      let res = await addNewMedicine(data);
      if (res && res.errCode === 0) {
        this.setState({
          receipts: [
            {
              nameMedicine: "",
              medicineCode: "",
              unit: "",
              price: "",
              isDuplicated: false,
            },
          ],
        });
        toast.success("Thêm thông tin thuốc thành công");
      }
    }
  };
  render() {
    let { receipts, submitFile } = this.state;
    let { clinicId } = this.props;
    return (
      <Modal
        isOpen={this.props.openModalAddNewMedicine}
        toggle={() => {
          this.toggle();
        }}
      >
        <ModalHeader className="title">Thêm thông tin thuốc mới</ModalHeader>
        <ModalBody>
          <div>
            <label className="title-excel-container">
              <span className="add-excel-title">Thêm thuốc với file excel</span>
              <Switch onChange={this.submitFile} checked={submitFile} />
            </label>
          </div>

          <div className="modal-add-new-medicine">
            <div className="col-12 form-group">
              {submitFile === false ? (
                <div>
                  <table className="medicine-table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên thuốc</th>
                        <th scope="col">Mã thuốc</th>
                        <th scope="col">Đơn vị tính</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {receipts.map((item, idx) => {
                        return (
                          <tr
                            style={
                              item.isDuplicated === true
                                ? { backgroundColor: "red" }
                                : {}
                            }
                          >
                            <td>{idx}</td>
                            <td>
                              <input
                                type="text"
                                name="nameMedicine"
                                value={receipts[idx].nameMedicine}
                                onChange={this.handleChange(idx)}
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="medicineCode"
                                value={receipts[idx].medicineCode}
                                onChange={this.handleChange(idx)}
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="unit"
                                value={receipts[idx].unit}
                                onChange={this.handleChange(idx)}
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                name="price"
                                min="1"
                                value={receipts[idx].price}
                                onChange={this.handleChange(idx)}
                                className="form-control"
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={this.handleRemoveSprcificRow(idx)}
                              >
                                <i class="fas fa-trash-alt"></i>
                              </button>
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={this.handleAddRow}
                              >
                                <i class="fas fa-plus"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    onChange={(event) =>
                      this.readExcelFile(event.target.files[0])
                    }
                  />
                  <div>
                    <tbody>
                      <table className="medicine-table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên thuốc</th>
                            <th scope="col">Mã thuốc</th>
                            <th scope="col">Đơn vị tính</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {receipts.map((item, idx) => {
                            return (
                              <tr
                                style={
                                  item.isDuplicated === true
                                    ? { backgroundColor: "red" }
                                    : {}
                                }
                              >
                                <td>{idx}</td>
                                <td>
                                  <input
                                    type="text"
                                    name="nameMedicine"
                                    value={receipts[idx].nameMedicine}
                                    onChange={this.handleChange(idx)}
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="medicineCode"
                                    value={receipts[idx].medicineCode}
                                    onChange={this.handleChange(idx)}
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="unit"
                                    value={receipts[idx].unit}
                                    onChange={this.handleChange(idx)}
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="price"
                                    min="1"
                                    value={receipts[idx].price}
                                    onChange={this.handleChange(idx)}
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={this.handleRemoveSprcificRow(idx)}
                                    style={
                                      item.isDuplicated === true
                                        ? { backgroundColor: "white" }
                                        : {}
                                    }
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </button>
                                  <button
                                    className="btn btn-outline-success btn-sm"
                                    onClick={this.handleAddRow}
                                  >
                                    <i class="fas fa-plus"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </tbody>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="btn-group">
            <button
              className="btn-add-new-medicine"
              onClick={() => {
                this.handleAddNewMedicine(clinicId);
              }}
            >
              Yes
            </button>{" "}
            <button
              className="btn-cancel-medicine"
              onClick={() => {
                this.toggle();
              }}
            >
              Close
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddNewMedicine);
