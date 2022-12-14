import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { getListPatientCommentByDoctorId } from '../../../services/userServices'
import { Rating } from 'react-simple-star-rating'
import './CommentDoctor.scss'
class CommentDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listComment: []
        }
    }
    async componentDidMount() {
        let { doctorIdFromParent } = this.props
        if (doctorIdFromParent) {
            let res = await getListPatientCommentByDoctorId(doctorIdFromParent)
            this.setState({
                listComment: res.ratingInfo
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let { doctorIdFromParent } = this.props

            if (doctorIdFromParent) {
                let res = await getListPatientCommentByDoctorId(doctorIdFromParent)
                this.setState({
                    listComment: res.ratingInfo
                })
            }
        }
    }
    render() {
        let { listComment } = this.state
        console.log(listComment)
        return (
            <div className='comment-container'>
                {
                    listComment && listComment.length > 0 &&
                    listComment.map(item => {

                        return (
                            <div className='comment-item'>
                                <div className='comment-user-infor'>
                                    <div className='infor-up'>
                                        <div className='image'
                                            style={{ backgroundImage: `url(${item.Booking.patientData.image})` }}
                                        >
                                        </div>
                                        <div className='user-detail'>
                                            <div className='comment-username'>
                                                <span>       {item?.Booking?.patientData?.firstName} {item?.Booking?.patientData?.lastName}</span>

                                            </div>
                                            <div className='content-addition'>
                                                {item?.Booking?.patientData?.gender === 'O' ? 'Kh??c' :
                                                    item?.Booking?.patientData?.gender === 'F' ? 'N???' : 'Nam'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='infor-down'>
                                        <span> <i class="far fa-comment"></i>

                                            {item.sothang === 0 && item.songay > 0 && `???? ????nh gi?? v??o ${item.songay} ng??y tr?????c`}
                                            {item.sothang === 0 && item.songay === 0 && '???? ????nh gi?? g???n ????y'}
                                            {item.sothang > 0 && `???? ????nh gi?? v??o ${item.sothang} tr?????c`}
                                            {/* ???? b??nh lu???n ???????c ???????c {item.sothang} th??ng {item.songay} ng??y */}
                                        </span>
                                    </div>

                                </div>
                                <div className='comment-content'>
                                    <div className='comment-container-up'>
                                        <Rating
                                            initialValue={item.rate}
                                            size={30}
                                            label
                                            readonly
                                            transition
                                            fillColor='#ffc10e'
                                            emptyColor='gray'
                                            className='foo'
                                        />
                                        <span className='title-rating'>
                                            {item.rate === 0 && 'Vui l??ng ????nh gi??'}
                                            {item.rate === 1 && 'R???t kh??ng h??i l??ng'}
                                            {item.rate === 2 && 'Kh??ng h??i l??ng'}
                                            {item.rate === 3 && 'B??nh th?????ng'}
                                            {item.rate === 4 && 'H??i l??ng'}
                                            {item.rate === 5 && 'C???c k??? h??i l??ng'}
                                        </span>
                                    </div>

                                    <div className='comment-container-down'>
                                        <div className='confirmed'>
                                            <i class="fas fa-check-circle"></i>
                                            <span> ???? kh??m b???nh</span>
                                        </div>
                                        <div className='comment-content'>
                                            {item.comment}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentDoctor);
