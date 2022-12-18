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
                        console.log('check image: ', item.Booking.patientData.image)
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
                                                {item?.Booking?.patientData?.firstName}
                                                {item?.Booking?.patientData?.lastName}
                                            </div>
                                            <div className='content-addition'>
                                                {item?.Booking?.patientData?.gender === 'O' ? 'Khác' :
                                                    item?.Booking?.patientData?.gender === 'F' ? 'Nữ' : 'Nam'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='infor-down'>
                                        <span> <i class="far fa-comment"></i>
                                            {item?.Booking?.patientData?.gender === 'O' ? 'Khác' :
                                                item?.Booking?.patientData?.gender === 'F' ? 'Nữ' : 'Nam'
                                            }
                                        </span>
                                    </div>

                                </div>
                                <div className='comment-container'>
                                    <div className='comment-container-up'>
                                        <Rating
                                            initialValue={item.rate}
                                            size={30}
                                            label
                                            readonly
                                            transition
                                            fillColor='orange'
                                            emptyColor='gray'
                                            className='foo'
                                        />
                                        <span className='title-rating'>
                                            {item.rate === 0 && 'Vui lòng đánh giá'}
                                            {item.rate === 1 && 'Rất không hài lòng'}
                                            {item.rate === 2 && 'Không hài lòng'}
                                            {item.rate === 3 && 'Bình thường'}
                                            {item.rate === 4 && 'Hài lòng'}
                                            {item.rate === 5 && 'Cực kỳ hài lòng'}
                                        </span>
                                    </div>

                                    <div className='comment-container-down'>
                                        <div className='confirmed'>
                                            <i class="fas fa-check-circle"></i>
                                            <span> Đã mua hàng</span>
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
