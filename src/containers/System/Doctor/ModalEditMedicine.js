import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./ModalEditMedicine.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { editMedicineInfor,getMedicineById } from "../../../services/userServices";

class ModalEditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: {},
    };
  }
  async componentDidMount() {
    let { EditedMedicineId } = this.props;
    console.log(EditedMedicineId);
    let res=await getMedicineById(EditedMedicineId);
    if(res && res.errCode ===0)
    {
        this.setState({
          receipts: res.data,
        });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if(this.props.EditedMedicineId!== prevProps.EditedMedicineId)
    {
        let { EditedMedicineId } = this.props;
        let res=await getMedicineById(EditedMedicineId);
        if(res && res.errCode ===0)
        {
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
    let temp = {...this.state.receipts};
    temp = {
      ...temp,
      [name]: value,
    };
    this.setState({
      receipts:temp,
    });
  };
  async handleEditMedicineInfor(){
    let res=await editMedicineInfor(this.state.receipts);
    if(res && res.errCode===0){
        this.toggle()
    }

  }
  render() {
    let {openModalEditMedicine,editedMedicineId}=this.props;
    
    let { receipts } = this.state;
    return (
      <Modal
        isOpen={openModalEditMedicine}
        toggle={() => {
          this.toggle();
        }}
      >
        <ModalHeader className="title">Sửa thông tin thuốc</ModalHeader>
        <ModalBody>
          <div className="modal-add-new-medicine">
            <div className="col-12 form-group">
              <div>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Tên thuốc</th>
                      <th scope="col">Mã thuốc</th>
                      <th scope="col">Đơn vị tính</th>
                      <th scope="col">Đơn giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="nameMedicine"
                          value={receipts.nameMedicine}
                          onChange={this.handleChange()}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="medicineCode"
                          value={receipts.medicineCode}
                          onChange={this.handleChange()}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="unit"
                          value={receipts.unit}
                          onChange={this.handleChange()}
                          className="form-control"
                        />
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
          </div>
          <div className="btn-group">
            <button
              className="btn-add-new-medicine"
              onClick={() => {
                this.handleEditMedicineInfor();
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditMedicine);
