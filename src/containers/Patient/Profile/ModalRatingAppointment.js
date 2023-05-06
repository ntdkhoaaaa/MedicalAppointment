import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from 'react-intl';
import "./ModalRatingAppointment.scss";
import { Modal } from "reactstrap";
// import DatePicker from '../../../components/Input/DatePicker';
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { Rating } from "react-simple-star-rating";
import { postRating,getProfileDoctorById ,getAllUsers} from "../../../services/userServices";
import { toast } from "react-toastify";
import DoctorInformation from "./DoctorInformation";
class ModalRatingAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      disableMove: false,
      comment: "",
    //   dataProfile:{}
    };
  }
  componentDidMount() {
    // console.log("modal check")
    // if(this.props.RatingInfor.doctorId)
    // {
    //     console.log("modal check inside",this.props.RatingInfor.doctorId)
    //     let res = await getAllUsers(this.props.RatingInfor.doctorId);
    //     if(res && res.errCode ===0)
    //     {
    //         this.setState({ dataProfile: res.users });
    //     }
    // }

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("modal",prevProps.RatingInfor,this.props.RatingInfor)
    // if(this.props.RatingInfor!==prevProps.RatingInfor)
    // {
    //     console.log("modal check inside",this.props.RatingInfor.doctorId)
    //     // let res = await getAllUsers(this.props.RatingInfor.doctorId);
    //     // if(res && res.errCode ===0)
    //     // {
    //     //     this.setState({ dataProfile: res.users });
    //     // }
    // }
  }
  async handleConfirmrating(doctorId, patientId, closeRatingModal, bookingId) {
    let data = {
      patientId: patientId,
      doctorId: doctorId,
      rate: this.state.rating,
      comment: this.state.comment,
      bookingId: bookingId,
    };

    let res = await postRating(data);
    if (res.errCode === 0) {
      this.setState({
        rating: 0,
        comment: "",
      });
      closeRatingModal();
      toast.success("Đánh giá buổi khám bệnh thành công");
    }
  }
  onChange = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    // let { isOpenModalRating, closeRatingModal, id, bookingId, RatingInfor } =
    //   this.props;
    const { rating, disableMove, comment } = this.state;
    const handleRating = (rate: number) => {
      this.setState({
        rating: rate,
        disableMove: true,
      });
    };
    const onPointerMove = (value: number, index: number) => {
      this.state.disableMove === false && this.setState({ rating: value });
    };
    const onPointerEnter = () => console.log("Enter", rating);
    const onPointerLeave = () => console.log("Leave", rating);
    return (
      <Modal
        isOpen={this.props.isOpenModalRating}
        size="sm"
        toggle={this.props.closeRatingModal}
        centered={true}
        backdrop={true}
        className="rating-modal-container"
      >
        <div className="rating-modal-content">
          <div className="rating-modal-header">
            <span className="left">Đánh giá bác sĩ</span>
            <span className="right" onClick={this.props.closeRatingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="rating-modal-body">
            <div className="doctor-infor">
              <DoctorInformation
              showDescription={false}
              doctorId={this.props.RatingInfor.doctorId} />
            </div>
            <div className="rating">
              <span className="title-rating">
                {rating === 0 && "Vui lòng đánh giá"}
                {rating === 1 && (
                  <img
                    src="https://i.pinimg.com/564x/37/28/23/372823883a153a5268c87e2a5616a5be.jpg"
                    alt="Rate status"
                  />
                )}
                {rating === 2 && (
                  <img
                    src="https://i.pinimg.com/474x/da/66/70/da667011741cc504c274f96791f27f43.jpg"
                    alt="Rate status"
                  />
                )}
                {rating === 3 && (
                  <img
                    src="https://i.pinimg.com/474x/c5/e0/25/c5e0255b377201ccebe1c987cc7ab492.jpg"
                    alt="Rate status"
                  />
                )}
                {rating === 4 && (
                  <img
                    src="https://i.pinimg.com/474x/e0/44/09/e0440944dfaa00da9c9ce2c724c72337.jpg"
                    alt="Rate status"
                  />
                )}
                {rating === 5 && (
                  <img
                    src="https://i.pinimg.com/474x/42/1c/dc/421cdcb451843c7fb6b5909003a4ef60.jpg"
                    alt="Rate status"
                  />
                )}
              </span>
              <div className="comment-rate">
                <Rating
                  ratingValue={rating}
                  size={30}
                  label
                  transition
                  fillColor="orange"
                  emptyColor="gray"
                  className="foo"
                  onClick={handleRating}
                  onPointerEnter={disableMove === false && onPointerEnter}
                  onPointerLeave={disableMove === false && onPointerLeave}
                  onPointerMove={disableMove === false && onPointerMove}
                />
              </div>
            </div>
            <div className="input-common">
              <textarea
                className="comment-content"
                type="text"
                onChange={(event) => this.onChange(event, "comment")}
                value={comment}
                placeholder="Hãy chia sẽ cảm nhận của bạn về buổi khám bệnh với bác sĩ nhé"
              ></textarea>
            </div>
          </div>

          <div className="rating-modal-footer">
            <button
              className="btn-rating-comfirm"
              onClick={() =>
                this.handleConfirmrating(
                    this.props.RatingInfor.doctorId,
                  this.props.id,
                  this.props.closeRatingModal,
                  this.props.bookingId
                )
              }
            >
              Xác nhận
            </button>
            <button className="btn-rating-cancel" onClick={this.props.closeRatingModal}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRatingAppointment);
