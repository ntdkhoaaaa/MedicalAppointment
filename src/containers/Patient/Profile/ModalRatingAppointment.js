import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ModalRatingAppointment.scss';
import Lightbox from 'react-image-lightbox';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import DatePicker from '../../../components/Input/DatePicker';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { Rating } from 'react-simple-star-rating'
import { postRating } from '../../../services/userServices';

class ModalRatingAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            disableMove: false,
            comment: '',
            doctorId: ''
        }
    }
    componentDidMount() {
        this.setState({
            doctorId: this.props.doctorId
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.bookingId !== prevProps.bookingId) {
            this.setState({
                doctorId: this.props.doctorId
            })
        }
    }
    async handleConfirmrating(doctorId, patientId, closeRatingModal, bookingId) {
        let data = {
            patientId: patientId,
            doctorId: doctorId,
            rate: this.state.rating,
            comment: this.state.comment,
            bookingId: bookingId
        }

        let res = await postRating(data)
        if (res.errCode === 0) {
            closeRatingModal()
        }
    }
    onChange = (event, id) => {
        let stateCopy = { ... this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        })
    }
    render() {
        let { isOpenModalRating, closeRatingModal, RatingInfor, id, bookingId } = this.props;
        let { rating, disableMove, comment, doctorId } = this.state
        const handleRating = (rate: number) => {
            this.setState({
                rating: rate,
                disableMove: true
            })
        }
        const onPointerMove = (value: number, index: number) => {
            { this.state.disableMove === false && this.setState({ rating: value }) }
            console.log(value, index)
        }
        const onPointerEnter = () => console.log('Enter', rating)
        const onPointerLeave = () => console.log('Leave', rating)

        return (
            <Modal
                isOpen={isOpenModalRating}
                size='sm'
                toggle={closeRatingModal}
                centered={true}
                fade={true}
                backdrop={true}
                backdropClassName='modal-backdrop'
                className='rating-modal-container'>
                <div className='rating-modal-content'>
                    <div className='rating-modal-header'>
                        <span className='left'>Đánh giá bác sĩ</span>
                        <span className='right' onClick={closeRatingModal}><i className='fas fa-times'></i></span>
                    </div>

                    <div className='rating-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                isShowPrice={true}
                                isShowDetail={false}
                            />
                        </div>
                        <div className='rating'>
                            <span className='title-rating'>
                                {rating === 0 && 'Vui lòng đánh giá'}
                                {rating === 1 && <img src='https://i.pinimg.com/564x/37/28/23/372823883a153a5268c87e2a5616a5be.jpg' />}
                                {rating === 2 && <img src='https://i.pinimg.com/474x/da/66/70/da667011741cc504c274f96791f27f43.jpg' />}
                                {rating === 3 && <img src='https://i.pinimg.com/474x/c5/e0/25/c5e0255b377201ccebe1c987cc7ab492.jpg' />}
                                {rating === 4 && <img src='https://i.pinimg.com/474x/e0/44/09/e0440944dfaa00da9c9ce2c724c72337.jpg' />}
                                {rating === 5 && <img src='https://i.pinimg.com/474x/42/1c/dc/421cdcb451843c7fb6b5909003a4ef60.jpg' />}
                            </span>
                            <div className="comment-rate">
                                <Rating
                                    ratingValue={rating}
                                    size={30}
                                    label
                                    transition
                                    fillColor='orange'
                                    emptyColor='gray'
                                    className='foo'
                                    onClick={handleRating}
                                    onPointerEnter={disableMove === false && onPointerEnter}
                                    onPointerLeave={disableMove === false && onPointerLeave}
                                    onPointerMove={disableMove === false && onPointerMove}
                                />
                            </div>

                        </div>
                        <div className='input-common'>
                            <textarea className='comment-content'
                                type="text"
                                onChange={(event) => this.onChange(event, 'comment')}
                                value={comment}
                                placeholder='Hãy chia sẽ cảm nhận của bạn về buổi khám bệnh với bác sĩ nhé'
                            ></textarea>
                        </div>

                    </div>

                    <div className='rating-modal-footer'>
                        <button className='btn-rating-comfirm' onClick={() => this.handleConfirmrating(doctorId, id, closeRatingModal, bookingId)}>Xác nhận</button>
                        <button className='btn-rating-cancel' onClick={closeRatingModal}>Hủy</button>
                    </div>
                </div>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRatingAppointment);
