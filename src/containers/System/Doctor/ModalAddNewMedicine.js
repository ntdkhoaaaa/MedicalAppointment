import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, TEMPLATE_EXCEL_FILE } from "../../../utils";
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
import FileSaver from "file-saver";
import "./Switch.css";
import Select from "react-select";

class ModalAddNewMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: [
        {
          nameMedicine: "",
          medicineCode: "",
          unit: "viên",
          price: "",
          isDuplicated: false,
        },
      ],
      submitFile: false,
      unitSelected: {
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
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);

  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Perform action on Enter key press inside the modal
      if(this.props.user?.clinicId)
      {
        this.handleAddNewMedicine(this.props.user?.clinicId)
      }
      else this.handleAddNewMedicine(this.props.user?.Doctor_Infor?.clinicId)
       
    }
  };
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
    let { clinicId } = this.props;
    console.log(temp);
    let checkDuplicated = await this.checkDuplicated(temp, clinicId);
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
    if (this.state.receipts.length > 1) {
      const receipts = [...this.state.receipts];
      receipts.splice(idx, 1);
      this.setState({ receipts });
    }
    if (this.state.receipts.length === 1) {
      if (this.state.receipts[idx].isDuplicated === true) {
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
      let { clinicId } = this.props;
      let data = {
        medicineArr: d,
        clinicId: clinicId,
      };
      let res = await warningDuplicateMedicine(data);
      console.log(res);
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
  async checkDuplicated(medicineArr, clinicId) {
    let data = {
      medicineArr: medicineArr,
      clinicId: clinicId,
    };
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
  submitFile = (checked) => {
    this.setState({
      submitFile: checked,
      receipts: [
        {
          nameMedicine: "",
          medicineCode: "",
          unit: "viên",
          price: "",
          isDuplicated: false,
        },
      ],
    });
  };
  handleAddNewMedicine = async (clinicId) => {
    console.log("this.state.receipts", this.state.receipts);
    let checkDuplicated = await this.checkDuplicated(
      this.state.receipts,
      clinicId
    );
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
  handleDownloadTemplateExcelFile = () => {
    let dataBlob = TEMPLATE_EXCEL_FILE.FILE;
    let sliceSize = 1024;
    let byteCharacters = atob(dataBlob);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex + sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    let blob = new Blob(byteArrays, { type: "application/vnd.ms-excel" });
    FileSaver.saveAs(
      new Blob([blob], {}),
      "templateFileForImportMedicines.xlxs"
    );
  };
  handleChangeSelectInfor = (selectedInfor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedInfor;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let { receipts, submitFile, unitSelected ,units} = this.state;

    let { clinicId } = this.props;
    return (
      <Modal
        isOpen={this.props.openModalAddNewMedicine}
        // onKeyDown={this.handleKeyDown}
        toggle={() => {
          this.toggle();
        }}
      >
        <ModalHeader className="title">Thêm thông tin thuốc mới</ModalHeader>
        <ModalBody>
          <div className="top">
            <div className="excel-container">
              <div className="excel-top">
                <label className="add-excel-title">
                  Thêm thuốc với file excel
                </label>
                <Switch
                  onColor={"#75b2eb"}
                  onChange={this.submitFile}
                  checked={submitFile}
                />
              </div>
              {submitFile && (
                <div className="excel-bot">
                  <span>
                    {" "}
                    <label className="template-excel-title">
                      Tải file excel mẫu
                    </label>
                    <button
                      className="btn-download-template-file"
                      onClick={() => {
                        this.handleDownloadTemplateExcelFile();
                      }}
                    >
                      <i class="fas fa-download"></i>
                    </button>
                  </span>

                  <input
                    type="file"
                    onChange={(event) =>
                      this.readExcelFile(event.target.files[0])
                    }
                  />
                </div>
              )}
            </div>

            <div className="btn-group">
              <button
                className="btn-add-new-medicine"
                onClick={() => {
                  this.handleAddNewMedicine(clinicId);
                }}
              onKeyDown={this.handleKeyDown}

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
          </div>
          <div className="bottom">
            {submitFile === false ? (
              <table className="medicine-table" id="tableMedicineAdding">
                <thead>
                  <tr>
                    <th width="2%">#</th>
                    <th width="20%">Tên thuốc</th>
                    <th width="20%">Mã thuốc</th>
                    <th width="20%">Đơn vị tính</th>
                    <th width="20%">Đơn giá</th>
                    <th width="18%">Hành động</th>
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
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          {idx}
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <input
                            type="text"
                            name="nameMedicine"
                            value={receipts[idx].nameMedicine}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <input
                            type="text"
                            name="medicineCode"
                            value={receipts[idx].medicineCode}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <Select
                            name="unitSelected"
                            value={unitSelected}
                            onChange={this.handleChangeSelectInfor}
                            options={units}
                          ></Select>
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <input
                            type="number"
                            name="price"
                            min="1"
                            value={receipts[idx].price}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <button
                            className={
                              item.isDuplicated === true
                                ? "btn danger duplicated"
                                : "btn btn-outline-danger"
                            }
                            onClick={this.handleRemoveSprcificRow(idx)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                          <button
                            className={
                              item.isDuplicated === true
                                ? "btn  success duplicated"
                                : "btn  btn-outline-success"
                            }
                            onClick={this.handleAddRow}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="medicine-table" id="tableMedicineAdding">
                <thead>
                  <tr>
                    <th width="2%">#</th>
                    <th width="20%">Tên thuốc</th>
                    <th width="20%">Mã thuốc</th>
                    <th width="20%">Đơn vị tính</th>
                    <th width="20%">Đơn giá</th>
                    <th width="18%">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((item, idx) => {
                    return (
                      <tr>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          {idx}
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <input
                            type="text"
                            name="nameMedicine"
                            value={receipts[idx].nameMedicine}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <input
                            type="text"
                            name="medicineCode"
                            value={receipts[idx].medicineCode}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          {/* <input
                            type="text"
                            name="unit"
                            value={receipts[idx].unit}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          /> */}
                          <Select
                            name="unitSelected"
                            value={unitSelected}
                            // onChange={this.handleChangeSelectInfor}
                            options={units}
                          ></Select>
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <input
                            type="number"
                            name="price"
                            min="1"
                            value={receipts[idx].price}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td
                          style={
                            item.isDuplicated === true
                              ? { backgroundColor: "red" }
                              : {}
                          }
                        >
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={this.handleRemoveSprcificRow(idx)}
                            style={
                              item.isDuplicated === true
                                ? { backgroundColor: "white" }
                                : {}
                            }
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={this.handleAddRow}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
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
